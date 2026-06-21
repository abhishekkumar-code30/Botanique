function initAnnouncementSlider() {
  const slider = document.getElementById("slider");
  if (!slider) return;

  slider.appendChild(slider.firstElementChild.cloneNode(true));

  const slides = slider.querySelectorAll("span");
  const totalRealSlides = slides.length - 1;

  let currentSlide = 0;
  let slideHeight = 0;
  const transitionDuration = 600;
  const slideInterval = 3000;
  let intervalId;
  let isPaused = false;

  function measureSlideHeight() {
    slideHeight = slider.firstElementChild.getBoundingClientRect().height;
  }

  function goToSlide(index, animate = true) {
    if (animate) {
      slider.style.transition = `transform ${transitionDuration}ms ease`;
    } else {
      slider.style.transition = "none";
    }
    slider.style.transform = `translateY(-${index * slideHeight}px)`;
  }

  function nextSlide() {
    currentSlide++;
    goToSlide(currentSlide, true);

    if (currentSlide === totalRealSlides) {
      setTimeout(() => {
        currentSlide = 0;
        goToSlide(0, false);
      }, transitionDuration);
    }
  }

  function startLoop() {
    clearInterval(intervalId);
    intervalId = setInterval(nextSlide, slideInterval);
  }

  function stopLoop() {
    clearInterval(intervalId);
  }

  slider.addEventListener("mouseenter", () => {
    isPaused = true;
    stopLoop();
  });

  slider.addEventListener("mouseleave", () => {
    isPaused = false;
    startLoop();
  });

  window.addEventListener("resize", () => {
    measureSlideHeight();
    goToSlide(currentSlide, false);
  });

  measureSlideHeight();
  startLoop();
}

function initNavbar() {
  const searchBtn = document.getElementById("searchBtn");
  const searchInput = document.getElementById("searchInput");
  const searchContainer = document.getElementById("searchContainer");
  const clearBtn = document.getElementById("clearBtn");
  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.getElementById("navLinks");

  if (!searchBtn || !menuBtn) return;

  function openSearch() {
    searchContainer.classList.add("active");
    searchBtn.setAttribute("aria-expanded", "true");
    searchInput.focus();
  }

  function closeSearch() {
    searchContainer.classList.remove("active");
    searchBtn.setAttribute("aria-expanded", "false");
  }

  function closeMenu() {
    navLinks.classList.remove("active");
    menuBtn.textContent = "☰";
    menuBtn.setAttribute("aria-expanded", "false");
  }

  function openMenu() {
    navLinks.classList.add("active");
    menuBtn.textContent = "✕";
    menuBtn.setAttribute("aria-expanded", "true");
    closeSearch();
  }

  searchBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (searchContainer.classList.contains("active")) {
      if (searchInput.value.trim() === "") {
        closeSearch();
        searchInput.blur();
      } else {
        searchInput.focus();
      }
    } else {
      openSearch();
    }
  });

  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && searchInput.value.trim()) {
      console.log("Searching:", searchInput.value.trim());
    }
  });

  searchInput.addEventListener("input", () => {
    if (searchInput.value.trim() !== "") {
      searchContainer.classList.add("active");
      searchBtn.setAttribute("aria-expanded", "true");
    }
  });

  clearBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    searchInput.value = "";
    searchInput.focus();
  });

  document.addEventListener("click", (e) => {
    const clickedOutsideSearch = !searchContainer.contains(e.target);
    if (clickedOutsideSearch && searchInput.value.trim() === "") {
      closeSearch();
    }
  });

  menuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    navLinks.classList.contains("active") ? closeMenu() : openMenu();
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768) closeMenu();
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) closeMenu();
  });
}

function initNavScrollShadow() {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  function toggleShadow() {
    if (window.scrollY > 10) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", toggleShadow, { passive: true });
  toggleShadow();
}
