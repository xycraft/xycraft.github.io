'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });


// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

/// --- helper: convert nav text/hash -> data-page key ---
function normalizePageKey(raw) {
  // Example:
  // "About" -> "about"
  // "CV/Resume" -> "cv/resume"
  // "#research" -> "research"
  return (raw || "")
    .toString()
    .trim()
    .replace(/^#/, "")
    .toLowerCase();
}

function setActivePage(pageKey) {
  for (let i = 0; i < pages.length; i++) {
    if (pageKey === pages[i].dataset.page) {
      pages[i].classList.add("active");
      navigationLinks[i].classList.add("active");
      window.scrollTo(0, 0);
    } else {
      pages[i].classList.remove("active");
      navigationLinks[i].classList.remove("active");
    }
  }
}

function loadFromHash() {
  const pageKey = normalizePageKey(decodeURIComponent(location.hash));
  if (!pageKey) return;

  // Only activate if this hash matches an existing page
  for (let i = 0; i < pages.length; i++) {
    if (pages[i].dataset.page === pageKey) {
      setActivePage(pageKey);
      return;
    }
  }
}

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    const pageKey = normalizePageKey(this.textContent);

    // update URL so you can share /#research
    location.hash = encodeURIComponent(pageKey);

    setActivePage(pageKey);
  });
}

// deep link on load + support back/forward
window.addEventListener("DOMContentLoaded", loadFromHash);
window.addEventListener("hashchange", loadFromHash);

loadFromHash();