// Listen for the custom event dispatched by loader.js
document.addEventListener("partialsLoaded", () => {
  // Initialize Navbar & Utility Bar
  if (typeof initAnnouncementSlider === "function") initAnnouncementSlider();
  if (typeof initNavbar === "function") initNavbar();
  if (typeof initNavScrollShadow === "function") initNavScrollShadow();

  // Initialize Hero Parallax
  if (typeof initParallax === "function") initParallax();

  // Initialize Sections
  if (typeof initScienceSection === "function") initScienceSection();
  if (typeof initCatalogPagination === "function") initCatalogPagination();
  if (typeof initTestimonialSlider === "function") initTestimonialSlider();

  // Auto-update Footer Year
  const yearSpan = document.getElementById("currentYear");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});
