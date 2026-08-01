/* Bharat Tech-Shakti Mission
   The navigation menu. This is the only JavaScript on the site.

   How it degrades. The page ships with the menu open and the toggle button
   hidden. If this file never loads, every link is still visible and usable.
   When it does load, the button appears on small screens and the menu starts
   closed, which keeps the top of a phone screen clear for the page itself. */

(function () {
  "use strict";

  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (!toggle || !nav) { return; }

  /* Matches the breakpoint in site.css where the menu lays out as a row. */
  var wide = window.matchMedia("(min-width: 52em)");

  function setOpen(open) {
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    nav.hidden = !open;
  }

  function apply() {
    if (wide.matches) {
      toggle.hidden = true;
      setOpen(true);
    } else {
      toggle.hidden = false;
      setOpen(false);
    }
  }

  toggle.addEventListener("click", function () {
    setOpen(toggle.getAttribute("aria-expanded") !== "true");
  });

  /* Escape closes the menu and puts focus back on the button. */
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape" || wide.matches) { return; }
    if (toggle.getAttribute("aria-expanded") === "true") {
      setOpen(false);
      toggle.focus();
    }
  });

  if (wide.addEventListener) {
    wide.addEventListener("change", apply);
  } else if (wide.addListener) {
    wide.addListener(apply);          /* older Safari */
  }

  apply();
})();
