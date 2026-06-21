function initCatalogPagination() {
  const grid = document.getElementById("paginatedGrid");
  const controls = document.getElementById("paginationControls");
  if (!grid || !controls) return;

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
    const section = document.getElementById("catalogSection");
    if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  updateView();
}
