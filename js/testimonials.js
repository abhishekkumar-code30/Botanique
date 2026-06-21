function initTestimonialSlider() {
  const slides = document.querySelectorAll(".testimonial-slide");
  const nextBtn = document.getElementById("nextTesti");
  const prevBtn = document.getElementById("prevTesti");
  const dotsContainer = document.getElementById("testiDots");

  if (!slides.length || !nextBtn || !prevBtn || !dotsContainer) return;

  let currentIndex = 0;
  const totalSlides = slides.length;
  let autoplayInterval;

  slides.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.className = "testi-dot";
    dot.setAttribute("aria-label", `Go to slide ${index + 1}`);

    dot.addEventListener("click", () => {
      goToSlide(index);
      resetAutoplay();
    });

    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll(".testi-dot");

  function goToSlide(index) {
    slides.forEach((slide) => {
      slide.classList.remove("active", "prev", "next");
    });
    dots.forEach((dot) => dot.classList.remove("active"));

    currentIndex = index;

    let prevIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    let nextIndex = (currentIndex + 1) % totalSlides;

    slides[currentIndex].classList.add("active");
    slides[prevIndex].classList.add("prev");
    slides[nextIndex].classList.add("next");

    dots[currentIndex].classList.add("active");
  }

  function nextSlide() {
    goToSlide((currentIndex + 1) % totalSlides);
  }

  function prevSlide() {
    goToSlide((currentIndex - 1 + totalSlides) % totalSlides);
  }

  nextBtn.addEventListener("click", () => {
    nextSlide();
    resetAutoplay();
  });

  prevBtn.addEventListener("click", () => {
    prevSlide();
    resetAutoplay();
  });

  function startAutoplay() {
    autoplayInterval = setInterval(nextSlide, 5000);
  }

  function resetAutoplay() {
    clearInterval(autoplayInterval);
    startAutoplay();
  }

  goToSlide(0);
  startAutoplay();
}
