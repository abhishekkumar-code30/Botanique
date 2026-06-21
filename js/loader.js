document.addEventListener("DOMContentLoaded", async () => {
  const root = document.getElementById("site-root");

  // Define the exact order the components should appear on the page
  const partials = [
    "./partials/utility-bar.html",
    "./partials/navbar.html",
    "./partials/hero-parallax.html",
    "./partials/ticker.html",
    "./partials/categories.html",
    "./partials/top-sellers.html",
    "./partials/science.html",
    "./partials/collection.html",
    "./partials/testimonials.html",
    "./partials/partners.html",
    "./partials/footer.html",
  ];

  // Fetch and inject sequentially to maintain correct DOM order
  for (const path of partials) {
    try {
      const response = await fetch(path);
      if (response.ok) {
        const html = await response.text();
        root.insertAdjacentHTML("beforeend", html);
      } else {
        console.error(`Failed to load partial: ${path}`);
      }
    } catch (error) {
      console.error(`Network error fetching ${path}:`, error);
    }
  }

  // Announce to the rest of the application that the DOM is fully constructed
  document.dispatchEvent(new Event("partialsLoaded"));
});
