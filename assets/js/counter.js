/* Bharat Tech-Shakti Mission
   Visit counter for the home page.

   A static site has no server of its own, so the count is kept by a small
   hosted counting service and this file only asks it for the number.

   Two things worth knowing.

   1. The block ships hidden. It is revealed only when a real number comes
      back. If the service is slow, blocked, or gone, the visitor sees nothing
      at all rather than a zero or a stale figure. Showing no number is better
      than showing a wrong one.

   2. It counts once per browsing session. Reloading the page or moving away
      and back does not push the number up again.

   The starting figure is set by data-offset on the element, so the displayed
   total begins at 1,129 and climbs from there.

   To point this at a different counting service, change COUNT_URL below and
   the line that reads the number out of the reply. Nothing else depends on it. */

(function () {
  "use strict";

  var box = document.getElementById("visit-counter");
  var out = document.getElementById("visit-count");
  if (!box || !out || typeof window.fetch !== "function") { return; }

  var ns     = box.getAttribute("data-namespace");
  var key    = box.getAttribute("data-key");
  var offset = parseInt(box.getAttribute("data-offset"), 10) || 0;
  if (!ns || !key) { return; }

  var base = "https://api.counterapi.dev/v1/" + encodeURIComponent(ns) + "/" + encodeURIComponent(key);

  /* Already counted this session, so read the value without adding to it. */
  var counted = false;
  try { counted = window.sessionStorage.getItem("btsm-counted") === "1"; } catch (e) {}

  var url = counted ? base + "/" : base + "/up";

  window.fetch(url, { cache: "no-store" })
    .then(function (r) { return r.ok ? r.json() : Promise.reject(new Error("bad status")); })
    .then(function (data) {
      var n = data && typeof data.count === "number" ? data.count : null;
      if (n === null) { throw new Error("no count in reply"); }

      try { window.sessionStorage.setItem("btsm-counted", "1"); } catch (e) {}

      var total = offset + n;
      out.textContent = total.toLocaleString("en-IN");
      box.hidden = false;
    })
    .catch(function () {
      /* Leave the block hidden. Nothing is better than a number that is wrong. */
    });
})();
