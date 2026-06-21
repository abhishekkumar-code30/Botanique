function initScienceSection() {
  const researchBtn = document.getElementById("researchBtn");
  const researchPanel = document.getElementById("researchPanel");
  const scienceSection = document.getElementById("science");
  const mediaCards = document.querySelectorAll(".media-card");
  const scienceContent = document.querySelector(".science-content");

  if (!scienceSection || !researchBtn) return;

  researchBtn.addEventListener("click", () => {
    const isOpen = researchPanel.classList.contains("open");
    researchPanel.classList.toggle("open");
    researchBtn.setAttribute("aria-expanded", !isOpen);
  });

  const scienceObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          mediaCards.forEach((card, index) => {
            setTimeout(() => card.classList.add("show"), index * 200);
          });
          scienceContent.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: "0px 0px -50px 0px",
    },
  );

  scienceObserver.observe(scienceSection);
}
