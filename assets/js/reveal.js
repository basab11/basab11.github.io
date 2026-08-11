/* Bharat Tech-Shakti Mission
   Scroll reveal for section headings. A small fade and rise, once, as each
   heading enters view. Nothing here is required to read the page.

   How it degrades. Headings carry no "reveal" class in the HTML, so if this
   file never loads, or a visitor has asked for less motion, every heading is
   simply visible from the start. */

(function () {
  "use strict";

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { return; }
  if (!("IntersectionObserver" in window)) { return; }

  var headings = document.querySelectorAll("main h2");
  if (!headings.length) { return; }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) { return; }
      entry.target.classList.add("reveal-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -10% 0px" });

  headings.forEach(function (h) {
    h.classList.add("reveal");
    observer.observe(h);
  });
})();
