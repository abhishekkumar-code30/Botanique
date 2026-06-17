document.addEventListener("DOMContentLoaded", () => {
  initAnnouncementSlider();
  initNavbar();
  initHeroSlider();
  initNavScrollShadow();
  initScienceSection();
  initCatalogPagination();
  initTestimonialSlider();
  // Auto-update footer year
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});

/* ======================
   Utility Bar Vertical Loop
====================== */
function initAnnouncementSlider() {
  const slider = document.getElementById("slider");
  if (!slider) return;

  // Clone first element for seamless loop
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
        // Instant reset to first slide (real one, not clone)
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

  // Pause on hover
  slider.addEventListener("mouseenter", () => {
    isPaused = true;
    stopLoop();
  });
  slider.addEventListener("mouseleave", () => {
    isPaused = false;
    startLoop();
  });

  // Handle resize
  window.addEventListener("resize", () => {
    measureSlideHeight();
    // Ensure position is correct after resize
    goToSlide(currentSlide, false);
  });

  measureSlideHeight();
  startLoop();
}

/* ======================
   Search + Mobile Menu
====================== */
function initNavbar() {
  const searchBtn = document.getElementById("searchBtn");
  const searchInput = document.getElementById("searchInput");
  const searchContainer = document.getElementById("searchContainer");
  const clearBtn = document.getElementById("clearBtn");

  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.getElementById("navLinks");

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
    if (e.key === "Enter") {
      const query = searchInput.value.trim();
      if (query) {
        console.log("Searching:", query);
        // window.location.href = `/search?q=${encodeURIComponent(query)}`;
      }
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
    const isOpen = navLinks.classList.contains("active");
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        closeMenu();
      }
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      closeMenu();
    }
  });
}

/*=====================
   Hero Slider
=====================*/
function initHeroSlider() {
  const slider = document.getElementById("heroSlider");
  if (!slider) return;

  const slides = slider.querySelectorAll(".hero-slide");
  const dots = slider.querySelectorAll(".dot");
  const prevBtn = document.getElementById("prevHero");
  const nextBtn = document.getElementById("nextHero");

  let current = 0;
  const total = slides.length;
  let interval;

  function showSlide(index) {
    slides.forEach((s) => s.classList.remove("active"));
    dots.forEach((d) => d.classList.remove("active"));
    slides[index].classList.add("active");
    dots[index].classList.add("active");
  }

  function next() {
    current = (current + 1) % total;
    showSlide(current);
  }

  function prev() {
    current = (current - 1 + total) % total;
    showSlide(current);
  }

  function startAuto() {
    clearInterval(interval);
    interval = setInterval(next, 5000);
  }

  function stopAuto() {
    clearInterval(interval);
  }

  // Dots navigation
  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const idx = parseInt(dot.getAttribute("data-index"));
      if (idx !== current) {
        current = idx;
        showSlide(current);
        stopAuto();
        startAuto();
      }
    });
  });

  // Arrow buttons
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      prev();
      stopAuto();
      startAuto();
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      next();
      stopAuto();
      startAuto();
    });
  }

  // Keyboard navigation
  slider.setAttribute("tabindex", "0");
  slider.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
      stopAuto();
      startAuto();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
      stopAuto();
      startAuto();
    }
  });

  // Pause on hover
  slider.addEventListener("mouseenter", stopAuto);
  slider.addEventListener("mouseleave", startAuto);

  // Touch swipe support (basic)
  let touchStartX = 0;
  slider.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
    },
    { passive: true },
  );
  slider.addEventListener("touchend", (e) => {
    const diff = e.changedTouches[0].screenX - touchStartX;
    if (Math.abs(diff) > 40) {
      if (diff < 0) {
        next();
      } else {
        prev();
      }
      stopAuto();
      startAuto();
    }
  });

  // Initialize
  showSlide(0);
  startAuto();
}

/*=====================
   Navbar shadow on scroll
=====================*/
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
  toggleShadow(); // initial state
}

/*=====================
   Science Section
=====================*/
function initScienceSection() {
  const researchBtn = document.getElementById("researchBtn");
  const researchPanel = document.getElementById("researchPanel");
  const scienceSection = document.getElementById("science");
  const mediaCards = document.querySelectorAll(".media-card");
  const scienceContent = document.querySelector(".science-content");

  // Exit function if elements don't exist on the current page
  if (!scienceSection || !researchBtn) return;

  // Accordion Toggle
  researchBtn.addEventListener("click", () => {
    const isOpen = researchPanel.classList.contains("open");
    researchPanel.classList.toggle("open");
    researchBtn.setAttribute("aria-expanded", !isOpen);
  });

  // Scroll Intercept Animation
  const scienceObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Stagger media cards
          mediaCards.forEach((card, index) => {
            setTimeout(() => card.classList.add("show"), index * 200);
          });

          // Show content block
          scienceContent.classList.add("show");

          // Stop observing once animated
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: "0px 0px -50px 0px", // Triggers slightly before hitting the exact bottom
    },
  );

  scienceObserver.observe(scienceSection);
}

/*=====================
   Paginated Product Catalog
=====================*/
function initCatalogPagination() {
  const grid = document.getElementById("paginatedGrid");
  const controls = document.getElementById("paginationControls");
  if (!grid || !controls) return;

  // 1. Data Source (Added Prices & Badges)
  const productsData = [
    {
      name: "Botanique Purifying Neem & Aloe Face Wash",
      image: "./assets/AllProducts/PurifyingFaceWash.png",
      price: 281.0,
      badge: "New",
    },
    {
      name: "Botanique Refreshing Neem & Aloe Body Wash",
      image: "./assets/AllProducts/RefreshingBodyWash.png",
      price: 450.0,
      oldPrice: 560.0,
      badge: "-20%",
    },
    {
      name: "Botanique Pure Aloe Vera Gel",
      image: "./assets/AllProducts/PureAloGel.png",
      price: 90.0,
    },
    {
      name: "Botanique Scalp Defense Anti-Dandruff Shampoo",
      image: "./assets/AllProducts/ScalpShampoo.png",
      price: 350.0,
    },
    {
      name: "Botanique Nourishing Herbal Conditioner",
      image: "./assets/AllProducts/HerbalConditioner.png",
      price: 320.0,
      badge: "New",
    },
    {
      name: "Botanique Revive Hair Growth Serum",
      image: "./assets/AllProducts/RHairGrowthSerum.png",
      price: 499.0,
    },
    {
      name: "Botanique Neem & Coconut Hair Oil",
      image: "./assets/AllProducts/N&CHairOil.png",
      price: 210.0,
    },
    {
      name: "Botanique Daily Hydration Face Cream",
      image: "./assets/AllProducts/DHFaceCream.png",
      price: 340.0,
      oldPrice: 425.0,
      badge: "-20%",
    },
    {
      name: "Botanique Skin Quench Moisturizing Lotion",
      image: "./assets/AllProducts/SQMoisturizingLotion.png",
      price: 290.0,
    },
    {
      name: "Botanique Sun Shield Herbal Sunscreen SPF 50",
      image: "./assets/AllProducts/SunScreen.png",
      price: 410.0,
    },
    {
      name: "Botanique Gentle Exfoliating Face Scrub",
      image: "./assets/AllProducts/FaceScrub.png",
      price: 260.0,
    },
    {
      name: "Botanique Detox Clay Face Mask",
      image: "./assets/AllProducts/FaceMask.png",
      price: 380.0,
      badge: "Bestseller",
    },
    {
      name: "Botanique Pore Balance Herbal Toner",
      image: "./assets/AllProducts/HerbalToner.png",
      price: 199.0,
    },
    {
      name: "Botanique Dew Mist Facial Spray",
      image: "./assets/AllProducts/DMFacialSpray.png",
      price: 250.0,
    },
    {
      name: "Botanique Eye Refresh Cooling Gel",
      image: "./assets/AllProducts/ERCoolingGel.png",
      price: 310.0,
      badge: "New",
    },
    {
      name: "Botanique Soft Kiss Lip Balm",
      image: "./assets/AllProducts/LipBalm.png",
      price: 120.0,
    },
    {
      name: "Botanique Overnight Repair Night Cream",
      image: "./assets/AllProducts/OverNightRepairCream.png",
      price: 460.0,
    },
    {
      name: "Botanique Beard Care Nourishing Oil",
      image: "./assets/AllProducts/BeardCareNourishingOil.png",
      price: 330.0,
    },
    {
      name: "Botanique Hand Restore Moisturizing Cream",
      image: "./assets/AllProducts/HandMoisturizingCream.png",
      price: 180.0,
      oldPrice: 200.0,
      badge: "-10%",
    },
    {
      name: "Botanique Heel Repair Foot Cream",
      image: "./assets/AllProducts/HeelReapairFootCream.png",
      price: 190.0,
    },
  ];

  let currentPage = 1;
  const itemsPerPage = 10;
  const totalPages = Math.ceil(productsData.length / itemsPerPage);

  function renderGrid(page) {
    grid.innerHTML = "";
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageItems = productsData.slice(startIndex, endIndex);

    pageItems.forEach((product) => {
      const card = document.createElement("a");
      card.className = "catalog-card";
      card.href = "#";

      // Handle optional badges and strikethrough prices
      let badgeHTML = "";
      if (product.badge) {
        const badgeClass = product.badge.includes("%") ? "sale" : "new";
        badgeHTML = `<span class="product-badge ${badgeClass}">${product.badge}</span>`;
      }

      let priceHTML = `<span class="catalog-price">₹${product.price.toFixed(2)}</span>`;
      if (product.oldPrice) {
        priceHTML =
          `<span class="catalog-price-old">₹${product.oldPrice.toFixed(2)}</span>` +
          priceHTML;
      }

      card.innerHTML = `
                <div class="card-img-wrapper">
                    ${badgeHTML}
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                </div>
                <div class="card-meta-area">
                    <h3>${product.name}</h3>
                    <div class="price-row">${priceHTML}</div>
                </div>
            `;
      grid.appendChild(card);
    });
  }

  function renderControls() {
    controls.innerHTML = "";

    // Prev Arrow
    const prevBtn = document.createElement("button");
    prevBtn.className = "page-arrow";
    prevBtn.innerHTML = '<i class="fa-solid fa-angle-left"></i>';
    prevBtn.disabled = currentPage === 1;
    prevBtn.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        updateView();
      }
    });
    controls.appendChild(prevBtn);

    // Page Numbers
    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement("button");
      btn.className = `page-btn ${i === currentPage ? "active" : ""}`;
      btn.textContent = i;

      btn.addEventListener("click", () => {
        currentPage = i;
        updateView();
      });
      controls.appendChild(btn);
    }

    // Next Arrow
    const nextBtn = document.createElement("button");
    nextBtn.className = "page-arrow";
    nextBtn.innerHTML = '<i class="fa-solid fa-angle-right"></i>';
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.addEventListener("click", () => {
      if (currentPage < totalPages) {
        currentPage++;
        updateView();
      }
    });
    controls.appendChild(nextBtn);
  }

  function updateView() {
    renderGrid(currentPage);
    renderControls();
    document
      .getElementById("catalogSection")
      .scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // Initialize
  updateView();
}

/*=====================
   Testimonial Slider
=====================*/
/*=====================
   Testimonial Slider (Cover Flow)
=====================*/
function initTestimonialSlider() {
    const slides = document.querySelectorAll(".testimonial-slide");
    const nextBtn = document.getElementById("nextTesti");
    const prevBtn = document.getElementById("prevTesti");
    const dotsContainer = document.getElementById("testiDots");

    if (!slides.length || !nextBtn || !prevBtn || !dotsContainer) return;

    let currentIndex = 0;
    const totalSlides = slides.length;
    let autoplayInterval;

    // Dynamically create the correct number of dots
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
        // Clear all states
        slides.forEach(slide => {
            slide.classList.remove("active", "prev", "next");
        });
        dots.forEach(dot => dot.classList.remove("active"));

        // Set new current index
        currentIndex = index;

        // Calculate surrounding indices (looping around the array)
        let prevIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        let nextIndex = (currentIndex + 1) % totalSlides;

        // Apply new classes
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

    // Event Listeners for arrows
    nextBtn.addEventListener("click", () => {
        nextSlide();
        resetAutoplay();
    });

    prevBtn.addEventListener("click", () => {
        prevSlide();
        resetAutoplay();
    });

    // Autoplay functionality
    function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, 5000); 
    }

    function resetAutoplay() {
        clearInterval(autoplayInterval);
        startAutoplay();
    }

    // Initialize the loop
    goToSlide(0);
    startAutoplay();
}