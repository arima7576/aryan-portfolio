/**
 * Aryan Heidari — Portfolio
 * Minimal vanilla JS. No tracking, no analytics, no third-party requests.
 */
(function () {
  "use strict";

  // Mobile navigation toggle
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");

  if (toggle && links) {
    function closeMenu() {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }

    toggle.addEventListener("click", function () {
      var isOpen = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Close menu when a link is chosen (mobile)
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        closeMenu();
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && links.classList.contains("open")) {
        closeMenu();
        toggle.focus();
      }
    });

    document.addEventListener("click", function (event) {
      if (!links.contains(event.target) && !toggle.contains(event.target)) {
        closeMenu();
      }
    });
  }

  // Mark the current page in the nav for styling + a11y
  var here = (document.body.getAttribute("data-page") || "").toLowerCase();
  if (here) {
    document.querySelectorAll(".nav-links a[data-nav]").forEach(function (a) {
      if (a.getAttribute("data-nav") === here) {
        a.setAttribute("aria-current", "page");
      }
    });
  }

  // Current year in footer
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });
})();
