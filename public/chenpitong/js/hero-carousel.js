/* ============================================
   Hero Carousel - Dual-Slide with Auto-play
   ============================================ */
(function () {
  'use strict';

  var hero = document.querySelector('.hero');
  if (!hero) return;

  var slides = hero.querySelectorAll('.hero__slide');
  var arrowLeft = hero.querySelector('.hero__arrow--left');
  var arrowRight = hero.querySelector('.hero__arrow--right');

  if (slides.length === 0) return;

  var totalSlides = slides.length;
  var currentIndex = 0;
  var autoPlayInterval = null;
  var AUTO_PLAY_DELAY = 5000;
  var isPaused = false;

  function showSlide(index) {
    // Remove active class from all slides
    for (var i = 0; i < slides.length; i++) {
      slides[i].classList.remove('hero__slide--active');
    }

    // Wrap around for circular navigation
    if (index >= totalSlides) {
      index = 0;
    } else if (index < 0) {
      index = totalSlides - 1;
    }

    currentIndex = index;

    // Add active class to the target slide
    slides[currentIndex].classList.add('hero__slide--active');
  }

  function nextSlide() {
    showSlide(currentIndex + 1);
  }

  function prevSlide() {
    showSlide(currentIndex - 1);
  }

  function startAutoPlay() {
    if (autoPlayInterval) return;
    autoPlayInterval = setInterval(function () {
      if (!isPaused) {
        nextSlide();
      }
    }, AUTO_PLAY_DELAY);
  }

  function stopAutoPlay() {
    if (autoPlayInterval) {
      clearInterval(autoPlayInterval);
      autoPlayInterval = null;
    }
  }

  function pauseAutoPlay() {
    isPaused = true;
  }

  function resumeAutoPlay() {
    isPaused = false;
  }

  // Arrow button event listeners
  if (arrowRight) {
    arrowRight.addEventListener('click', function () {
      nextSlide();
      stopAutoPlay();
      startAutoPlay();
    });
  }

  if (arrowLeft) {
    arrowLeft.addEventListener('click', function () {
      prevSlide();
      stopAutoPlay();
      startAutoPlay();
    });
  }

  // Pause on hover
  hero.addEventListener('mouseenter', pauseAutoPlay);
  hero.addEventListener('mouseleave', resumeAutoPlay);

  // Keyboard navigation
  document.addEventListener('keydown', function (e) {
    if (!hero.contains(document.activeElement) && document.activeElement !== document.body) return;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      nextSlide();
      stopAutoPlay();
      startAutoPlay();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      prevSlide();
      stopAutoPlay();
      startAutoPlay();
    }
  });

  // Start auto-play
  startAutoPlay();
})();

/* ============================================
   Header Scroll State
   Continuous gradient transition:
   - Background: transparent → white (alpha 0 → 0.95)
   - Text: white → dark brown
   - Logo/icons: invert(1) → invert(0) for smooth SVG color blend
   Trigger range: page top → hero text area (~50% hero height)
   ============================================ */
(function () {
  'use strict';

  var header = document.querySelector('.header');
  var hero = document.querySelector('.hero');

  if (!header || !hero) return;

  // Color endpoints for text interpolation
  var R_WHITE = 255, G_WHITE = 255, B_WHITE = 255;
  var R_DARK = 38,  G_DARK = 23,  B_DARK = 11; // #26170B

  // Cache DOM elements
  var logoLight = header.querySelector('.header__logo-light');
  var navLinks = header.querySelectorAll('.header__nav-link');
  var langBtn = header.querySelector('.lang-selector');
  var langLightImgs = header.querySelectorAll('.lang-icon-light');

  function updateHeader() {
    var scrollY = window.pageYOffset || document.documentElement.scrollTop;
    var heroHeight = hero.getBoundingClientRect().height || window.innerHeight;
    var triggerEnd = heroHeight * 0.5;

    // Progress: 0 at page top, 1 at hero text area
    var progress = Math.min(1, Math.max(0, scrollY / triggerEnd));

    // 1. Header background: transparent → white
    header.style.backgroundColor = 'rgba(255,255,255,' + (progress * 0.95) + ')';

    // 2. Text color: white → dark brown
    var r = Math.round(R_WHITE + (R_DARK - R_WHITE) * progress);
    var g = Math.round(G_WHITE + (G_DARK - G_WHITE) * progress);
    var b = Math.round(B_WHITE + (B_DARK - B_WHITE) * progress);
    var textColor = 'rgb(' + r + ',' + g + ',' + b + ')';

    for (var i = 0; i < navLinks.length; i++) {
      navLinks[i].style.color = textColor;
    }

    if (langBtn) {
      langBtn.style.color = textColor;
      // Border: white transparent → dark transparent
      var br = Math.round(255 + (38 - 255) * progress);
      var bg = Math.round(255 + (23 - 255) * progress);
      var bb = Math.round(255 + (11 - 255) * progress);
      langBtn.style.borderColor = 'rgba(' + br + ',' + bg + ',' + bb + ',0.3)';
    }

    // 3. Logo light layer: opacity 1 at top → 0 when scrolled
    if (logoLight) {
      logoLight.style.opacity = 1 - progress;
    }

    // 4. Lang icon light layers: fade out on scroll
    for (var j = 0; j < langLightImgs.length; j++) {
      langLightImgs[j].style.opacity = 1 - progress;
    }

    // Class for backdrop blur (only when fully transitioned)
    if (progress >= 0.95) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
  }

  window.addEventListener('scroll', updateHeader, { passive: true });
  // Also update on resize (hero height may change)
  window.addEventListener('resize', updateHeader, { passive: true });
  updateHeader();
})();
