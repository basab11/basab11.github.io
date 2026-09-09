/* Bharat Tech-Shakti Mission
   The thumbs-up at the foot of a blog post.

   How it degrades. The button ships disabled and carries no number. If this
   file never loads, or the counting service is unreachable, the reader sees a
   quiet thumb that does nothing rather than a broken control or a zero. The
   post is unaffected either way.

   What a reader sees. Nothing, until they press it. Then the running total
   flashes beside the thumb for a moment and fades. A post with three votes
   never sits there looking unloved, and nobody is nudged by a number before
   they have decided for themselves.

   One vote per reader, remembered in this browser. Pressing again takes the
   vote back locally, but does not subtract from the total: the service holds a
   number, not a list of who voted, and it cannot tell whose vote to remove.
   That is a deliberate trade. Keeping a reader's identity in order to police
   their vote is the thing this whole arrangement exists to avoid.

   To point this at a different service, change ENDPOINT below. Nothing else
   depends on it. */

(function () {
  "use strict";

  /* The Worker that holds the counts. See btsm-worker/README.md. */
  var ENDPOINT = "https://frosty-night-f29f.dasgupta-basab.workers.dev";

  var box = document.querySelector(".kv__react");
  if (!box || typeof window.fetch !== "function") { return; }

  var slug = box.getAttribute("data-slug");
  var btn = box.querySelector(".kv__react-btn");
  var out = box.querySelector(".kv__react-count");
  if (!slug || !btn || !out) { return; }

  var storeKey = "btsm-react-" + slug;

  function remembered() {
    try { return window.localStorage.getItem(storeKey) === "1"; } catch (e) { return false; }
  }
  function remember(v) {
    try {
      if (v) { window.localStorage.setItem(storeKey, "1"); }
      else { window.localStorage.removeItem(storeKey); }
    } catch (e) {}
  }

  /* Show the number, then let it fade. Restarting the animation needs the
     class removed and the element reflowed, or a second press does nothing. */
  function flash(n) {
    out.textContent = n.toLocaleString("en-IN");
    out.classList.remove("is-flashing");
    void out.offsetWidth;
    out.classList.add("is-flashing");
  }

  function setPressed(v) {
    btn.setAttribute("aria-pressed", v ? "true" : "false");
    btn.classList.toggle("is-pressed", !!v);
  }

  setPressed(remembered());
  btn.disabled = false;

  var busy = false;

  btn.addEventListener("click", function () {
    if (busy) { return; }

    /* Taking the vote back. Local only, and no request: the service holds a
       total, not a register of voters. */
    if (remembered()) {
      remember(false);
      setPressed(false);
      out.classList.remove("is-flashing");
      out.textContent = "";
      return;
    }

    busy = true;
    setPressed(true);
    remember(true);

    window.fetch(ENDPOINT + "/react/" + encodeURIComponent(slug), {
      method: "POST",
      cache: "no-store"
    })
      .then(function (r) { return r.ok ? r.json() : Promise.reject(new Error("bad status")); })
      .then(function (data) {
        if (data && typeof data.up === "number") { flash(data.up); }
      })
      .catch(function () {
        /* The vote did not reach the service. Say so by quietly releasing the
           button, rather than leaving the reader believing it counted. */
        remember(false);
        setPressed(false);
      })
      .then(function () { busy = false; });
  });
})();
