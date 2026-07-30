<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const currentLang = ref('en')
const isNavOpen = ref(false)
const isHeaderLangOpen = ref(false)
const isFooterLangOpen = ref(false)
const isScrolled = ref(false)
const currentSlide = ref(0)
const isAutoPlayPaused = ref(false)
const isModalOpen = ref(false)
const showVideoModal = ref(false)

const translations = {
  en: {
    'title-index': 'ChenPi Tong - Aged by Time, Treasured by Nature',
    'nav-home': 'Home',
    'nav-products': 'Products',
    'nav-stories': 'Stories',
    'nav-about': 'About Us',
    'hero1-title': 'Aged by Time, Treasured by Nature',
    'hero1-subtitle': 'Naturally aged Chenpi from Pubei, crafted by time and perfected through patience',
    'hero1-cta': 'Explore Our Collection',
    'hero2-title': 'Born in Pubei, Crafted by Nature',
    'hero2-subtitle': 'From one of China\'s renowned Chenpi origins, where sunshine, climate, and time shape every peel',
    'hero2-cta': 'Discover Our Heritage',
    'about-subtitle': 'DISCOVER CHENPI',
    'about-title': 'What Is Chenpi?',
    'about-body': 'Chenpi is the dried peel of mature mandarins that has been carefully harvested, sun-dried, and naturally aged over time.\nAs it matures, its aroma, color, and flavor continue to evolve, making it a unique product shaped by the value of time.',
    'enjoy-subtitle': 'WAYS TO ENJOY',
    'enjoy-title': 'How to Enjoy Chenpi',
    'enjoy-card1-title': 'Brew as Tea',
    'enjoy-card1-desc': 'Steep aged Chenpi on its own or blend it with your favorite tea for a rich citrus aroma and smooth finish.',
    'enjoy-card2-title': 'Cook with Flavor',
    'enjoy-card2-desc': 'Add Chenpi to soups, stews, and braised dishes to enhance aroma and depth of flavor.',
    'enjoy-card3-title': 'Bake & Create',
    'enjoy-card3-desc': 'Use Chenpi in desserts, pastries, or creative recipes to add natural citrus notes.',
    'why-subtitle': 'WHY PU BEI',
    'why-title': 'Where Great Chenpi Begins',
    'why-stat1-label': 'Mu Core Plantation',
    'why-stat2-label': 'Tons Storage Capacity',
    'why-stat3-label': 'Traceability System',
    'products-subtitle': 'AGED COLLECTION',
    'products-title': 'Explore by Aging Years',
    'prod10-lg': 'AAA',
    'prod10-sm': 'Vintage Chenpi',
    'prod10-desc-head': 'The Daily Essential',
    'prod10-desc': 'A balanced, smooth introduction to aged citrus. Perfect for everyday wellness and gifting.',
    'prod10-price-unit': '/kg',
    'prod20-lg': 'AAAA',
    'prod20-sm': 'Vintage Chenpi',
    'prod20-desc-head': 'The Connoisseur\'s Choice',
    'prod20-desc': 'Richer, deeper flavor with woody notes. Ideal for serious tea lovers and culinary use.',
    'prod20-price-unit': '/kg',
    'prod30-lg': 'AAAAA',
    'prod30-sm': 'Vintage Chenpi',
    'prod30-desc-head': 'The Collector\'s Pinnacle',
    'prod30-desc': 'Rare, intense, and ultra-smooth. The ultimate "liquid gold" investment.',
    'prod30-price-unit': '/kg',
    'btn-buy': 'Learn More',
    'heritage-subtitle': 'OUR HERITAGE',
    'heritage-title': 'The Story Of Time',
    'heritage-text': 'True Chenpi cannot be made overnight.\nIt begins with carefully selected mandarins, continues through sunshine and changing seasons, and reaches its finest expression only after years of natural aging.\nEvery year adds depth.\nEvery season leaves its mark.\nThis is the story of time.',
    'footer-home': 'Home',
    'footer-products': 'Products',
    'footer-stories': 'Stories',
    'footer-about': 'About Us',
    'footer-copyright': '&copy; All Rights Reserved PuBei ChenPi'
  },
  zh: {
    'title-index': '陈皮通 - 岁月陈化，自然珍宝',
    'nav-home': '首页',
    'nav-products': '产品',
    'nav-stories': '故事',
    'nav-about': '关于我们',
    'hero1-title': '岁月陈化，自然珍宝',
    'hero1-subtitle': '来自浦北的自然陈化陈皮，时间雕琢，耐心成就',
    'hero1-cta': '探索我们的系列',
    'hero2-title': '源起浦北，天工造物',
    'hero2-subtitle': '来自中国著名的陈皮发源地之一，阳光、气候与时间共同铸造每一片陈皮',
    'hero2-cta': '了解我们的传承',
    'about-subtitle': '认识陈皮',
    'about-title': '什么是陈皮？',
    'about-body': '陈皮是成熟橘子的干果皮，经过精心采摘、自然晒干和多年陈化而成。\n随着时间推移，其香气、颜色和风味不断演变，成为独一无二的天然珍品。',
    'enjoy-subtitle': '品赏方式',
    'enjoy-title': '如何品赏陈皮',
    'enjoy-card1-title': '冲泡饮用',
    'enjoy-card1-desc': '单独冲泡陈皮或与您喜爱的茶叶混合，享受浓郁橘香与顺滑口感。',
    'enjoy-card2-title': '烹调增香',
    'enjoy-card2-desc': '将陈皮加入汤、炖菜和红烧菜肴中，提升香气和风味层次。',
    'enjoy-card3-title': '烘焙创作',
    'enjoy-card3-desc': '将陈皮用于甜点、糕点或创意料理中，增添天然橘香。',
    'why-subtitle': '为什么选择浦北',
    'why-title': '优质陈皮的发源地',
    'why-stat1-label': '亩核心种植园',
    'why-stat2-label': '吨储存容量',
    'why-stat3-label': '可追溯体系',
    'products-subtitle': '年份系列',
    'products-title': '按年份探索',
    'prod10-lg': 'AAA',
    'prod10-sm': '陈皮',
    'prod10-desc-head': '日常臻选',
    'prod10-desc': '口感均衡顺滑的陈皮茶，适合日常养生与送礼。',
    'prod10-price-unit': '/公斤',
    'prod20-lg': 'AAAA',
    'prod20-sm': '陈皮',
    'prod20-desc-head': '鉴赏家之选',
    'prod20-desc': '更为浓郁深沉，带木质香气，适合茶艺爱好者与烹调使用。',
    'prod20-price-unit': '/公斤',
    'prod30-lg': 'AAAAA',
    'prod30-sm': '陈皮',
    'prod30-desc-head': '收藏家巅峰之选',
    'prod30-desc': '稀有、浓郁、超级顺滑。极致的"液体黄金"收藏品。',
    'prod30-price-unit': '/公斤',
    'btn-buy': '了解更多',
    'heritage-subtitle': '我们的传承',
    'heritage-title': '时间的故事',
    'heritage-text': '真正的陈皮并非一朝一夕可以制成。\n它始于精心挑选的橘子，历经阳光与四季更迭，唯有经过多年自然陈化，方能达到最极致的表达。\n每一年都在增加深度。\n每一季都在留下印记。\n这就是时间的故事。',
    'footer-home': '首页',
    'footer-products': '产品',
    'footer-stories': '故事',
    'footer-about': '关于我们',
    'footer-copyright': '&copy; 浦北陈皮 版权所有'
  }
}

const t = (key) => {
  const value = translations[currentLang.value][key] || key
  return value.replace(/\n/g, '<br>')
}

const currentLangText = computed(() => {
  return currentLang.value === 'en' ? 'English' : '中文'
})

const toggleNav = () => {
  isNavOpen.value = !isNavOpen.value
}

const closeNav = () => {
  isNavOpen.value = false
}

const toggleHeaderLang = () => {
  isHeaderLangOpen.value = !isHeaderLangOpen.value
}

const toggleFooterLang = () => {
  isFooterLangOpen.value = !isFooterLangOpen.value
}

const switchLang = (lang) => {
  if (lang === currentLang.value) return
  currentLang.value = lang
  localStorage.setItem('chenpitong-lang', lang)
  isHeaderLangOpen.value = false
  isFooterLangOpen.value = false
}

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % 2
}

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + 2) % 2
}

const openModal = () => {
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

const handleModalClick = (e) => {
  if (e.target === e.currentTarget) {
    closeModal()
  }
}

let autoPlayInterval = null

const startAutoPlay = () => {
  if (autoPlayInterval) return
  autoPlayInterval = setInterval(() => {
    if (!isAutoPlayPaused.value) {
      nextSlide()
    }
  }, 5000)
}

const stopAutoPlay = () => {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval)
    autoPlayInterval = null
  }
}

const pauseAutoPlay = () => {
  isAutoPlayPaused.value = true
}

const resumeAutoPlay = () => {
  isAutoPlayPaused.value = false
}

const handleKeydown = (e) => {
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
    nextSlide()
    stopAutoPlay()
    startAutoPlay()
  } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
    prevSlide()
    stopAutoPlay()
    startAutoPlay()
  }
}

const handleOutsideClick = (e) => {
  const target = e.target
  if (!target.closest('.lang-selector')) {
    isHeaderLangOpen.value = false
    isFooterLangOpen.value = false
  }
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > window.innerHeight * 0.75
}

onMounted(() => {
  const saved = localStorage.getItem('chenpitong-lang')
  if (saved === 'zh' || saved === 'en') {
    currentLang.value = saved
  }
  startAutoPlay()
  window.addEventListener('keydown', handleKeydown)
  document.addEventListener('click', handleOutsideClick)
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onUnmounted(() => {
  stopAutoPlay()
  window.removeEventListener('keydown', handleKeydown)
  document.removeEventListener('click', handleOutsideClick)
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div class="chenpi-tong-wrapper">
    <header class="header header--transparent" :class="{ 'header--nav-open': isNavOpen, 'header--scrolled': isScrolled }">
      <div class="header__inner">
        <a href="#" class="header__logo">
          <img class="header__logo-dark" src="/chenpitong/assets/icons/logo.svg" alt="ChenPi Tong Logo" width="192" height="60">
          <img class="header__logo-light" src="/chenpitong/assets/icons/logo-light.svg" alt="ChenPi Tong Logo" width="192" height="60">
        </a>

        <nav class="header__nav">
          <a href="#" class="header__nav-link active" @click="closeNav">{{ t('nav-home') }}</a>
          <a href="#products" class="header__nav-link" @click="closeNav">{{ t('nav-products') }}</a>
          <a href="#stories" class="header__nav-link" @click="closeNav">{{ t('nav-stories') }}</a>
          <a href="#about" class="header__nav-link" @click="closeNav">{{ t('nav-about') }}</a>
        </nav>

        <button class="header__hamburger" aria-label="Menu" @click="toggleNav">
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div class="header__right">
          <div class="lang-selector" :class="{ 'lang-selector--open': isHeaderLangOpen }">
            <button class="lang-selector__btn" @click.stop="toggleHeaderLang">
              <span class="lang-icon-wrap">
                <img class="lang-icon-dark" src="/chenpitong/assets/icons/lang-icon-stroke.svg" alt="Language" width="13.33" height="13.33">
                <img class="lang-icon-light" src="/chenpitong/assets/icons/lang-icon-stroke-light.svg" alt="Language" width="13.33" height="13.33">
              </span>
              <span class="lang-selector__current">{{ currentLangText }}</span>
              <span class="lang-arrow-wrap">
                <img class="lang-icon-dark" src="/chenpitong/assets/icons/lang-dropdown-arrow.svg" alt="Dropdown" width="9" height="5">
                <img class="lang-icon-light" src="/chenpitong/assets/icons/lang-dropdown-arrow-light.svg" alt="Dropdown" width="9" height="5">
              </span>
            </button>
            <div class="lang-selector__dropdown">
              <div class="lang-selector__option" :class="{ 'lang-selector__option--active': currentLang === 'en' }" @click="switchLang('en')">English</div>
              <div class="lang-selector__option" :class="{ 'lang-selector__option--active': currentLang === 'zh' }" @click="switchLang('zh')">中文</div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <div class="page-wrapper page-wrapper--no-padding">
      <section class="hero" @mouseenter="pauseAutoPlay" @mouseleave="resumeAutoPlay">
        <div class="hero__slides">
          <div class="hero__slide" :class="{ 'hero__slide--active': currentSlide === 0 }">
            <img class="hero__slide-bg" src="/chenpitong/assets/images/hero-banner-01.webp" alt="Hero Banner 1">
            <div class="hero__slide-overlay hero__slide-overlay--1"></div>
            <div class="hero__slide-content">
              <h1 class="hero__title">{{ t('hero1-title') }}</h1>
              <p class="hero__subtitle">{{ t('hero1-subtitle') }}</p>
              <a href="#products" class="hero__cta">{{ t('hero1-cta') }}</a>
            </div>
          </div>
          <div class="hero__slide" :class="{ 'hero__slide--active': currentSlide === 1 }">
            <img class="hero__slide-bg" src="/chenpitong/assets/images/hero-banner-02.webp" alt="Hero Banner 2">
            <div class="hero__slide-overlay hero__slide-overlay--2"></div>
            <div class="hero__slide-content">
              <h1 class="hero__title">{{ t('hero2-title') }}</h1>
              <p class="hero__subtitle">{{ t('hero2-subtitle') }}</p>
              <a href="#products" class="hero__cta">{{ t('hero2-cta') }}</a>
            </div>
          </div>
        </div>
        <button class="hero__arrow hero__arrow--left" aria-label="Previous slide" @click="prevSlide(); stopAutoPlay(); startAutoPlay()">
          <img src="/chenpitong/assets/icons/arrow-left.svg" alt="Previous" width="32" height="32">
        </button>
        <button class="hero__arrow hero__arrow--right" aria-label="Next slide" @click="nextSlide(); stopAutoPlay(); startAutoPlay()">
          <img src="/chenpitong/assets/icons/arrow-right.svg" alt="Next" width="32" height="32">
        </button>
      </section>

      <section class="about" id="about">
        <div class="about__inner">
          <div class="about__text-area">
            <div class="about__title-group">
              <p class="about__subtitle">{{ t('about-subtitle') }}</p>
              <h2 class="about__title">{{ t('about-title') }}</h2>
            </div>
            <p class="about__body" v-html="t('about-body')"></p>
          </div>
          <div class="about__image-area">
            <img class="about__image" src="/chenpitong/assets/images/about-img.webp" alt="Chenpi">
          </div>
        </div>
      </section>

      <section class="enjoy">
        <div class="enjoy__inner">
          <div class="enjoy__header">
            <p class="enjoy__subtitle">{{ t('enjoy-subtitle') }}</p>
            <h2 class="enjoy__title">{{ t('enjoy-title') }}</h2>
          </div>

          <div class="enjoy__grid">
            <div class="enjoy__card">
              <div class="enjoy__card-img">
                <img src="/chenpitong/assets/images/enjoy-brew-crop-39e639.webp" alt="Brew as Tea">
                <div class="enjoy__card-overlay"></div>
              </div>
              <div class="enjoy__card-info">
                <h3 class="enjoy__card-title">{{ t('enjoy-card1-title') }}</h3>
                <p class="enjoy__card-desc">{{ t('enjoy-card1-desc') }}</p>
              </div>
            </div>

            <div class="enjoy__card">
              <div class="enjoy__card-img">
                <img src="/chenpitong/assets/images/enjoy-cook-crop-6e4b94.webp" alt="Cook with Flavor">
                <div class="enjoy__card-overlay"></div>
              </div>
              <div class="enjoy__card-info">
                <h3 class="enjoy__card-title">{{ t('enjoy-card2-title') }}</h3>
                <p class="enjoy__card-desc">{{ t('enjoy-card2-desc') }}</p>
              </div>
            </div>

            <div class="enjoy__card">
              <div class="enjoy__card-img">
                <img src="/chenpitong/assets/images/enjoy-bake-cover.webp" alt="Bake and Create">
                <div class="enjoy__card-overlay"></div>
              </div>
              <div class="enjoy__card-info">
                <h3 class="enjoy__card-title">{{ t('enjoy-card3-title') }}</h3>
                <p class="enjoy__card-desc">{{ t('enjoy-card3-desc') }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="why">
        <img class="why__bg" src="/chenpitong/assets/images/why-bg-header.webp" alt="Why Pu Bei Background">
        <div class="why__inner">
          <div class="why__title-group">
            <p class="why__subtitle">{{ t('why-subtitle') }}</p>
            <h2 class="why__title">{{ t('why-title') }}</h2>
          </div>

          <div class="why__stats">
            <div class="why__stat">
              <span class="why__stat-number">2000+</span>
              <span class="why__stat-label">{{ t('why-stat1-label') }}</span>
            </div>
            <div class="why__stat">
              <span class="why__stat-number">30,000</span>
              <span class="why__stat-label">{{ t('why-stat2-label') }}</span>
            </div>
            <div class="why__stat">
              <span class="why__stat-number">100%</span>
              <span class="why__stat-label">{{ t('why-stat3-label') }}</span>
            </div>
          </div>

          <!-- 视频播放区域 -->
          <div class="why__video" @click="showVideoModal = true">
            <div class="why__video-thumb">
              <div class="why__video-play">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <circle cx="24" cy="24" r="23" fill="white" fill-opacity="0.9"/>
                  <path d="M20 16v16l14-8-14-8z" fill="#26170B"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 视频弹窗遮罩层 -->
      <div v-if="showVideoModal" class="video-overlay" @click="showVideoModal = false"></div>

      <!-- 视频弹窗 -->
      <div v-if="showVideoModal" class="video-modal">
        <button class="video-modal-close" @click="showVideoModal = false" aria-label="关闭">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="white" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
        <div class="video-modal-player">
          <video
            src="/chenpitong/assets/videos/陈皮通介绍_2.mp4"
            controls
            autoplay
            playsinline
            style="width: 100%; height: 100%; object-fit: contain;"
          ></video>
        </div>
      </div>

      <section class="products" id="products">
        <div class="products__inner">
          <div class="products__header">
            <p class="products__subtitle">{{ t('products-subtitle') }}</p>
            <h2 class="products__title">{{ t('products-title') }}</h2>
          </div>

          <div class="products__list">
            <a href="/chenpitong/product?v=10" class="product-card">
              <div class="product-card__image-wrapper">
                <img class="product-card__image" src="/chenpitong/assets/images/product-10year-figma.webp" alt="AAA Vintage Chenpi">
              </div>
              <div class="product-card__info product-card__info--gold">
                <div class="product-card__info-row product-card__info-row--title">
                  <h3 class="product-card__name">
                    <span class="product-card__name--lg">{{ t('prod10-lg') }}</span>
                    <span class="product-card__name--spacer"> </span>
                    <span class="product-card__name--sm">{{ t('prod10-sm') }}</span>
                  </h3>
                </div>
                <div class="product-card__info-row product-card__info-row--desc">
                  <h4 class="product-card__desc-heading">{{ t('prod10-desc-head') }}</h4>
                  <p class="product-card__desc">{{ t('prod10-desc') }}</p>
                </div>
                <div class="product-card__info-row product-card__info-row--price">
                  <div class="product-card__price-row">
                    <div class="product-card__prices">
                      <span class="product-card__price">$2,000.00</span>
                      <span class="product-card__price-unit">{{ t('prod10-price-unit') }}</span>
                    </div>
                  </div>
                  <button class="product-card__buy">{{ t('btn-buy') }}</button>
                </div>
              </div>
            </a>

            <a href="/chenpitong/product?v=20" class="product-card product-card--reversed">
              <div class="product-card__image-wrapper">
                <img class="product-card__image" src="/chenpitong/assets/images/product-20year-figma.webp" alt="AAAA Vintage Chenpi">
              </div>
              <div class="product-card__info product-card__info--brown">
                <div class="product-card__info-row product-card__info-row--title">
                  <h3 class="product-card__name">
                    <span class="product-card__name--lg">{{ t('prod20-lg') }}</span>
                    <span class="product-card__name--spacer"> </span>
                    <span class="product-card__name--sm">{{ t('prod20-sm') }}</span>
                  </h3>
                </div>
                <div class="product-card__info-row product-card__info-row--desc">
                  <h4 class="product-card__desc-heading">{{ t('prod20-desc-head') }}</h4>
                  <p class="product-card__desc">{{ t('prod20-desc') }}</p>
                </div>
                <div class="product-card__info-row product-card__info-row--price">
                  <div class="product-card__price-row">
                    <div class="product-card__prices">
                      <span class="product-card__price">$3,000.00</span>
                      <span class="product-card__price-unit">{{ t('prod20-price-unit') }}</span>
                    </div>
                  </div>
                  <button class="product-card__buy">{{ t('btn-buy') }}</button>
                </div>
              </div>
            </a>

            <a href="/chenpitong/product?v=30" class="product-card">
              <div class="product-card__image-wrapper">
                <img class="product-card__image" src="/chenpitong/assets/images/product-30year-figma.webp" alt="AAAAA Vintage Chenpi">
              </div>
              <div class="product-card__info product-card__info--dark">
                <div class="product-card__info-row product-card__info-row--title">
                  <h3 class="product-card__name">
                    <span class="product-card__name--lg">{{ t('prod30-lg') }}</span>
                    <span class="product-card__name--spacer"> </span>
                    <span class="product-card__name--sm">{{ t('prod30-sm') }}</span>
                  </h3>
                </div>
                <div class="product-card__info-row product-card__info-row--desc">
                  <h4 class="product-card__desc-heading">{{ t('prod30-desc-head') }}</h4>
                  <p class="product-card__desc">{{ t('prod30-desc') }}</p>
                </div>
                <div class="product-card__info-row product-card__info-row--price">
                  <div class="product-card__price-row">
                    <div class="product-card__prices">
                      <span class="product-card__price">$5,000.00</span>
                      <span class="product-card__price-unit">{{ t('prod30-price-unit') }}</span>
                    </div>
                  </div>
                  <button class="product-card__buy">{{ t('btn-buy') }}</button>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>

      <section class="heritage" id="stories">
        <div class="heritage__inner">
          <div class="heritage__title-group">
            <p class="heritage__subtitle">{{ t('heritage-subtitle') }}</p>
            <h2 class="heritage__title">{{ t('heritage-title') }}</h2>
          </div>

          <div class="heritage__text-block">
            <p class="heritage__text" v-html="t('heritage-text')"></p>
          </div>
        </div>
      </section>

      <footer class="footer">
        <div class="footer__card">
          <a href="#" class="footer__logo">
            <img src="/chenpitong/assets/icons/logo-vertical.svg" alt="ChenPi Tong Logo" width="137" height="157">
          </a>

          <div class="footer__middle-row">
            <div class="footer__socials">
              <a href="#" aria-label="Facebook">
                <img src="/chenpitong/assets/icons/facebook.svg" alt="Facebook" width="32" height="32">
              </a>
              <a href="#" aria-label="Instagram">
                <img src="/chenpitong/assets/icons/instagram.svg" alt="Instagram" width="32" height="32">
              </a>
              <a href="#" aria-label="TikTok">
                <img src="/chenpitong/assets/icons/tiktok.svg" alt="TikTok" width="32" height="32">
              </a>
            </div>

            <nav class="footer__nav">
              <a href="#" @click="closeNav">{{ t('footer-home') }}</a>
              <a href="#products" @click="closeNav">{{ t('footer-products') }}</a>
              <a href="#stories" @click="closeNav">{{ t('footer-stories') }}</a>
              <a href="#about" @click="closeNav">{{ t('footer-about') }}</a>
            </nav>

            <div class="footer__lang-wrap lang-selector" :class="{ 'lang-selector--open': isFooterLangOpen }">
              <button class="lang-selector__btn" @click.stop="toggleFooterLang">
                <img src="/chenpitong/assets/icons/lang-icon-stroke.svg" alt="Language" width="13.33" height="13.33">
                <span class="lang-selector__current">{{ currentLangText }}</span>
                <img class="lang-selector__arrow" src="/chenpitong/assets/icons/lang-dropdown-arrow.svg" alt="Dropdown" width="9" height="5">
              </button>
              <div class="lang-selector__dropdown lang-selector__dropdown--up">
                <div class="lang-selector__option" :class="{ 'lang-selector__option--active': currentLang === 'en' }" @click="switchLang('en')">English</div>
                <div class="lang-selector__option" :class="{ 'lang-selector__option--active': currentLang === 'zh' }" @click="switchLang('zh')">中文</div>
              </div>
            </div>
          </div>
        </div>

        <p class="footer__copyright">{{ t('footer-copyright') }}</p>
      </footer>

    </div>

    <div class="modal-overlay" id="loginModal" :class="{ 'modal-overlay--open': isModalOpen }" @click="handleModalClick">
      <div class="modal">
        <button class="modal__close" @click="closeModal" aria-label="Close">
          <img src="/chenpitong/assets/icons/icon-close-v2.svg" alt="Close" width="28" height="28">
        </button>

        <div class="modal__decor">
          <img class="modal__decor-img" src="/chenpitong/assets/icons/modal-bg.webp" alt="">
        </div>

        <div class="modal__brand">
          <img class="modal__brand-logomark" src="/chenpitong/assets/icons/modal-logomark.svg" alt="ChenPi Tong">
          <img class="modal__brand-logotype" src="/chenpitong/assets/icons/modal-logotype.svg" alt="ChenPi Tong">
        </div>

        <div class="modal__card">
          <div class="modal__form">
            <div class="modal__field">
              <label class="modal__label">
                <img src="/chenpitong/assets/icons/icon-phone-v2.svg" alt="" width="24" height="24">
                <span>手机号</span>
              </label>
              <div class="modal__input">
                <input type="text" placeholder="请输入手机号" class="modal__input-field">
              </div>
            </div>

            <div class="modal__field">
              <label class="modal__label">
                <img src="/chenpitong/assets/icons/icon-shield-v2.svg" alt="" width="24" height="24">
                <span>验证码</span>
              </label>
              <div class="modal__input">
                <input type="text" placeholder="请输入验证码" class="modal__input-field">
                <span class="modal__input-divider"></span>
                <span class="modal__input-send">获取验证码</span>
              </div>
            </div>

            <label class="modal__checkbox">
              <span class="modal__checkbox-box"></span>
              <span class="modal__checkbox-text">我已阅读并同意《用户服务协议》《隐私协议》</span>
            </label>
          </div>

          <button class="modal__login-btn">
            <span>登录</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>