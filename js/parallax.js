function initParallax() {
  const canvas = document.getElementById("lasso-canvas");
  const scrollSpace = document.querySelector(".scroll-space");
  const slides = document.querySelectorAll(".slide");

  if (!canvas || !scrollSpace) return;

  const ctx = canvas.getContext("2d", { alpha: false });
  const FRAME_COUNT = 100;
  const images = new Array(FRAME_COUNT);

  let currentFrame = 0;
  let maxScroll = 0;
  let ticking = false;
  let currentProgress = 0;

  let viewportWidth = 0;
  let viewportHeight = 0;
  let drawMetrics = { width: 0, height: 0, offsetX: 0, offsetY: 0 };

  const ANIMATION_END = 0.88;
  const slideRanges = [0.0, 0.1, 0.27, 0.43, 0.58, 0.6];

  // Note: Ensure images are located in the assets folder correctly
  const getFramePath = (index) =>
    `./assets/ParallaxImages/Botanique_Parallax (${index + 1}).jpg`;

  function preloadImages() {
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      images[i] = img;
    }

    images[0].onload = () => {
      resizeCanvas();
      updateFrame();
    };
  }

  function calculateDrawMetrics(img) {
    if (!img || !img.width || !img.height) return;

    const canvasRatio = viewportWidth / viewportHeight;
    const imageRatio = img.width / img.height;

    if (imageRatio > canvasRatio) {
      drawMetrics.height = viewportHeight;
      drawMetrics.width = drawMetrics.height * imageRatio;
      drawMetrics.offsetX = (viewportWidth - drawMetrics.width) / 2;
      drawMetrics.offsetY = 0;
    } else {
      drawMetrics.width = viewportWidth;
      drawMetrics.height = drawMetrics.width / imageRatio;
      drawMetrics.offsetX = 0;
      drawMetrics.offsetY = (viewportHeight - drawMetrics.height) / 2;
    }
  }

  function drawFrame(index) {
    const img = images[index];
    if (!img || !img.complete || !img.width) return;

    if (drawMetrics.width === 0) calculateDrawMetrics(img);

    ctx.clearRect(0, 0, viewportWidth, viewportHeight);

    const zoom = 1 + currentProgress * 0.12;

    ctx.save();
    ctx.translate(viewportWidth / 2, viewportHeight / 2);
    ctx.scale(zoom, zoom);
    ctx.drawImage(
      img,
      drawMetrics.offsetX - viewportWidth / 2,
      drawMetrics.offsetY - viewportHeight / 2,
      drawMetrics.width,
      drawMetrics.height,
    );
    ctx.restore();
  }

  function getActiveSlideIndex(progress) {
    let activeIndex = 0;
    for (let i = slideRanges.length - 1; i >= 0; i--) {
      if (progress >= slideRanges[i]) {
        activeIndex = i;
        break;
      }
    }
    return activeIndex;
  }

  function updateSlides(activeSlideIndex) {
    slides.forEach((slide, index) => {
      const isActive = index === activeSlideIndex;
      slide.classList.toggle("active", isActive);
      slide.style.pointerEvents = isActive ? "auto" : "none";
    });
  }

  function resizeCanvas() {
    viewportWidth = window.innerWidth;
    viewportHeight = window.innerHeight;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.floor(viewportWidth * dpr);
    canvas.height = Math.floor(viewportHeight * dpr);
    canvas.style.width = `${viewportWidth}px`;
    canvas.style.height = `${viewportHeight}px`;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    maxScroll = Math.max(scrollSpace.scrollHeight - viewportHeight, 0);

    drawMetrics = { width: 0, height: 0, offsetX: 0, offsetY: 0 };

    if (images[currentFrame] && images[currentFrame].complete) {
      calculateDrawMetrics(images[currentFrame]);
    }

    drawFrame(currentFrame);
  }

  function updateFrame() {
    if (maxScroll === 0) {
      ticking = false;
      return;
    }

    const rawProgress = Math.min(window.scrollY / maxScroll, 1);
    currentProgress = Math.min(rawProgress / ANIMATION_END, 1);
    const targetFrame = Math.round(currentProgress * (FRAME_COUNT - 1));

    if (targetFrame !== currentFrame) {
      currentFrame = targetFrame;
    }

    drawFrame(currentFrame);
    updateSlides(getActiveSlideIndex(rawProgress));
    ticking = false;
  }

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(updateFrame);
        ticking = true;
      }
    },
    { passive: true },
  );

  window.addEventListener("resize", resizeCanvas);

  preloadImages();
}
