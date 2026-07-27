<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const currentLang = ref('en')
const isNavOpen = ref(false)
const isHeaderLangOpen = ref(false)
const isFooterLangOpen = ref(false)
const activeThumbIndex = ref(0)
const quantity = ref(1)
const isModalOpen = ref(false)

const products = {
  '10': {
    nameLarge: 'AAA',
    nameSmall: 'Vintage Chenpi',
    price: '$2,000.00',
    desc: 'A balanced, smooth introduction to aged citrus. Perfect for everyday wellness and gifting.',
    mainImg: '/chenpitong/assets/images/product-main-10year.webp',
    thumbs: [
      '/chenpitong/assets/images/product-main-10year.webp',
      '/chenpitong/assets/images/product-thumb-02.webp',
      '/chenpitong/assets/images/product-thumb-03.webp',
      '/chenpitong/assets/images/product-thumb-04.webp'
    ]
  },
  '20': {
    nameLarge: 'AAAA',
    nameSmall: 'Vintage Chenpi',
    price: '$3,000.00',
    desc: 'Richer, deeper flavor with woody notes. Ideal for serious tea lovers and culinary use.',
    mainImg: '/chenpitong/assets/images/product-main-20year.webp',
    thumbs: [
      '/chenpitong/assets/images/product-main-20year.webp',
      '/chenpitong/assets/images/product-thumb-02.webp',
      '/chenpitong/assets/images/product-thumb-03.webp',
      '/chenpitong/assets/images/product-thumb-04.webp'
    ]
  },
  '30': {
    nameLarge: 'AAAAA',
    nameSmall: 'Vintage Chenpi',
    price: '$5,000.00',
    desc: 'Rare, intense, and ultra-smooth. The ultimate "liquid gold" investment.',
    mainImg: '/chenpitong/assets/images/product-main-30year.webp',
    thumbs: [
      '/chenpitong/assets/images/product-main-30year.webp',
      '/chenpitong/assets/images/product-thumb-02.webp',
      '/chenpitong/assets/images/product-thumb-03.webp',
      '/chenpitong/assets/images/product-thumb-04.webp'
    ]
  }
}

const variant = computed(() => {
  const params = new URLSearchParams(window.location.search)
  return params.get('v') || '10'
})

const currentProduct = computed(() => {
  return products[variant.value] || products['10']
})

const productImages = computed(() => {
  return currentProduct.value.thumbs
})

const translations = {
  en: {
    'title-product': 'AAA Vintage Chenpi - ChenPi Tong',
    'nav-home': 'Home',
    'nav-products': 'Products',
    'nav-stories': 'Stories',
    'nav-about': 'About Us',
    'pd-name-lg': 'AAA',
    'pd-name-sm': 'Vintage Chenpi',
    'pd-subtitle': 'Naturally Aged Citrus Peel from Pubei, China',
    'pd-tag1': 'SPRING FRESH',
    'pd-tag2': 'CUT GRASS',
    'pd-tag3': 'EDAMAME',
    'pd-description': 'Bursting with sweet spring flavour, and selected for its succulent fresh taste, this is our introduction to exceptional green tea. A refreshing infusion with pleasant, sappy top notes and characterful umami depth.',
    'prod10-price-unit': '/kg',
    'btn-buy': 'Buy',
    'tn-title': 'TASTING NOTES',
    'tn-strength-title': 'Intensity',
    'tn-strength-low': 'Fresh',
    'tn-strength-medium': 'Mellow',
    'tn-strength-high': 'Aged',
    'tn-appearance-label': 'Appearance',
    'tn-appearance-desc': 'Golden brown peel with a naturally textured surface',
    'tn-aroma-label': 'Aroma',
    'tn-aroma-desc': 'Warm citrus zest with gentle woody and herbal notes',
    'tn-taste-label': 'Taste',
    'tn-taste-desc': 'Smooth, mellow, and pleasantly lingering with balanced sweetness.',
    'htp-title': 'How to Prepare',
    'htp-amount-title': 'Amount',
    'htp-amount-desc': '3–5 g Chenpi',
    'htp-water-title': 'Water',
    'htp-water-desc': '95–100°C',
    'htp-infuse-title': 'Infuse',
    'htp-infuse-desc': '3–5 minutes',
    'htp-rebrew-title': 'Rebrew',
    'htp-rebrew-desc': 'Suitable for multiple infusions',
    'ps-question': 'Where does this cup come from?',
    'ps-title': 'From the Heart of Pubei',
    'ps-desc': 'Located in Guangxi, Pubei is one of China\'s renowned Chenpi-producing regions. Abundant sunshine, seasonal humidity, and patient natural aging create the distinctive aroma and character that define authentic Pubei Chenpi.',
    'ps-info1': 'Cultivar - Chachi',
    'ps-info2': 'Picked - April 2024',
    'ps-info3': 'Nobile Aging Year - 10 Years',
    'footer-home': 'Home',
    'footer-products': 'Products',
    'footer-stories': 'Stories',
    'footer-about': 'About Us',
    'footer-copyright': '&copy; All Rights Reserved PuBei ChenPi'
  },
  zh: {
    'title-product': 'AAA陈皮 - 陈皮通',
    'nav-home': '首页',
    'nav-products': '产品',
    'nav-stories': '故事',
    'nav-about': '关于我们',
    'pd-name-lg': 'AAA',
    'pd-name-sm': '陈皮',
    'pd-subtitle': '来自中国浦北，自然陈化橘皮',
    'pd-tag1': '春日清香',
    'pd-tag2': '青草气息',
    'pd-tag3': '毛豆清香',
    'pd-description': '这款茶口感鲜甜，带有清新春日的气息，果肉饱满多汁。这是我们对优质绿茶的初次呈现，清新怡人，带有清新的青草香调和浓郁的鲜味深度。',
    'prod10-price-unit': '/公斤',
    'btn-buy': '购买',
    'tn-title': '品赏记录',
    'tn-strength-title': '强度',
    'tn-strength-low': '清新',
    'tn-strength-medium': '柔和',
    'tn-strength-high': '陈年',
    'tn-appearance-label': '外观',
    'tn-appearance-desc': '金黄色陈皮，天然纹理表面',
    'tn-aroma-label': '香气',
    'tn-aroma-desc': '温暖橘香，伴有淡淡的木质和草本气息',
    'tn-taste-label': '口感',
    'tn-taste-desc': '顺滑柔和，余味悠长，甜度均衡。',
    'htp-title': '冲泡指南',
    'htp-amount-title': '用量',
    'htp-amount-desc': '3-5 克陈皮',
    'htp-water-title': '水温',
    'htp-water-desc': '95-100°C',
    'htp-infuse-title': '浸泡',
    'htp-infuse-desc': '3-5 分钟',
    'htp-rebrew-title': '续泡',
    'htp-rebrew-desc': '适合多次冲泡',
    'ps-question': '这杯茶来自哪里？',
    'ps-title': '来自浦北之心',
    'ps-desc': '浦北位于广西，是中国著名的陈皮产区之一。充足的日照、季节性的湿度和耐心的自然陈化，创造了定义正宗浦北陈皮的独特香气和风味。',
    'ps-info1': '品种 - 茶枝柑',
    'ps-info2': '采摘 - 2024年4月',
    'ps-info3': '陈化年份 - 十年',
    'footer-home': '首页',
    'footer-products': '产品',
    'footer-stories': '故事',
    'footer-about': '关于我们',
    'footer-copyright': '&copy; 浦北陈皮 版权所有'
  }
}

const t = (key) => {
  return translations[currentLang.value][key] || key
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

const selectThumb = (index) => {
  activeThumbIndex.value = index
}

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}

const increaseQuantity = () => {
  quantity.value++
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

const handleOutsideClick = (e) => {
  const target = e.target
  if (!target.closest('.lang-selector')) {
    isHeaderLangOpen.value = false
    isFooterLangOpen.value = false
  }
}

onMounted(() => {
  const saved = localStorage.getItem('chenpitong-lang')
  if (saved === 'zh' || saved === 'en') {
    currentLang.value = saved
  }
  document.addEventListener('click', handleOutsideClick)
})

onUnmounted(() => {
  document.removeEventListener('click', handleOutsideClick)
})
</script>

<template>
  <div class="chenpi-tong-wrapper">
    <header class="header header--solid" :class="{ 'header--nav-open': isNavOpen }">
      <div class="header__inner">
        <a href="/chenpitong" class="header__logo">
          <img src="/chenpitong/assets/icons/logo.svg" alt="ChenPi Tong Logo" width="192" height="60">
        </a>

        <nav class="header__nav">
          <a href="/chenpitong" class="header__nav-link" @click="closeNav">{{ t('nav-home') }}</a>
          <a href="/chenpitong#products" class="header__nav-link active" @click="closeNav">{{ t('nav-products') }}</a>
          <a href="#stories" class="header__nav-link" @click="closeNav">{{ t('nav-stories') }}</a>
          <a href="/chenpitong#about" class="header__nav-link" @click="closeNav">{{ t('nav-about') }}</a>
        </nav>

        <button class="header__hamburger" aria-label="Menu" @click="toggleNav">
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div class="header__right">
          <div class="lang-selector" :class="{ 'lang-selector--open': isHeaderLangOpen }">
            <button class="lang-selector__btn" @click.stop="toggleHeaderLang">
              <img src="/chenpitong/assets/icons/lang-icon-stroke.svg" alt="Language" width="13.33" height="13.33">
              <span class="lang-selector__current">{{ currentLangText }}</span>
              <img class="lang-selector__arrow" src="/chenpitong/assets/icons/lang-dropdown-arrow.svg" alt="Dropdown" width="9" height="5">
            </button>
            <div class="lang-selector__dropdown">
              <div class="lang-selector__option" :class="{ 'lang-selector__option--active': currentLang === 'en' }" @click="switchLang('en')">English</div>
              <div class="lang-selector__option" :class="{ 'lang-selector__option--active': currentLang === 'zh' }" @click="switchLang('zh')">中文</div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <div class="page-wrapper">
      <div class="breadcrumb">
        <div class="breadcrumb__inner">
          <a href="/chenpitong" class="breadcrumb__back" aria-label="Back to Home">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 9L13 20L24 31L26 29L17 20L26 11L24 9Z" fill="white"/>
            </svg>
          </a>
          <div class="breadcrumb__nav">
            <a href="/chenpitong" class="breadcrumb__link breadcrumb__link--home">Home</a>
            <svg class="breadcrumb__arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 4L10 8L6 12" stroke="#161821" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span class="breadcrumb__link breadcrumb__link--current">Products</span>
          </div>
        </div>
      </div>

      <section class="product-detail">
        <div class="product-detail__inner">
          <div class="product-detail__images">
            <div class="product-detail__main-image">
              <img :src="productImages[activeThumbIndex]" :alt="currentProduct.nameLarge + ' ' + currentProduct.nameSmall" class="product-detail__main-img">
            </div>
            <div class="product-detail__thumbs" id="productThumbs">
              <div 
                v-for="(img, index) in productImages" 
                :key="index"
                class="product-detail__thumb"
                :class="{ 'product-detail__thumb--active': activeThumbIndex === index }"
                @click="selectThumb(index)"
              >
                <img :src="img" :alt="'Thumb ' + (index + 1)">
              </div>
            </div>
            <div class="product-detail__dots" id="productDots">
              <button 
                v-for="(img, index) in productImages" 
                :key="index"
                class="product-detail__dot"
                :class="{ 'product-detail__dot--active': activeThumbIndex === index }"
                @click="selectThumb(index)"
                :aria-label="'Go to image ' + (index + 1)"
              ></button>
            </div>
          </div>

          <div class="product-detail__info">
            <div class="product-detail__title-area">
              <h1 class="product-detail__name">
                <span class="product-detail__name--large">{{ currentProduct.nameLarge }}</span>
                <span class="product-detail__name--spacer"> </span>
                <span class="product-detail__name--small">{{ currentProduct.nameSmall }}</span>
              </h1>
              <p class="product-detail__subtitle">{{ t('pd-subtitle') }}</p>
            </div>

            <div class="product-detail__tags">
              <span class="product-detail__tag">{{ t('pd-tag1') }}</span>
              <span class="product-detail__tag-dot"></span>
              <span class="product-detail__tag">{{ t('pd-tag2') }}</span>
              <span class="product-detail__tag-dot"></span>
              <span class="product-detail__tag">{{ t('pd-tag3') }}</span>
            </div>

            <p class="product-detail__description">{{ currentProduct.desc }}</p>

            <div class="product-detail__price-row">
              <div class="product-detail__price">
                <span class="product-detail__price-value">{{ currentProduct.price }}</span>
                <span class="product-detail__price-unit">{{ t('prod10-price-unit') }}</span>
              </div>
              <div class="product-detail__quantity">
                <button 
                  class="product-detail__qty-btn product-detail__qty-minus" 
                  :style="{ opacity: quantity <= 1 ? '0.4' : '1' }"
                  @click="decreaseQuantity"
                >
                  <img src="/chenpitong/assets/icons/icon-minus.svg" alt="Minus" width="20" height="20">
                </button>
                <div class="product-detail__qty-value">
                  <div class="product-detail__qty-text-wrap">
                    <span>{{ quantity }}</span>
                  </div>
                </div>
                <button class="product-detail__qty-btn product-detail__qty-plus" @click="increaseQuantity">
                  <img src="/chenpitong/assets/icons/icon-plus.svg" alt="Plus" width="20" height="20">
                </button>
              </div>
            </div>

            <button class="product-detail__buy-btn" @click="openModal">{{ t('btn-buy') }}</button>
          </div>
        </div>
      </section>

      <section class="tasting-notes">
        <div class="tasting-notes__inner">
          <div class="tasting-notes__left">
            <h2 class="tasting-notes__title">{{ t('tn-title') }}</h2>

            <div class="tasting-notes__strength">
              <div class="tasting-notes__strength-heading">
                <h3 class="tasting-notes__strength-title">{{ t('tn-strength-title') }}</h3>
              </div>
              <div class="tasting-notes__strength-bar">
                <div class="tasting-notes__strength-fill"></div>
              </div>
              <div class="tasting-notes__strength-labels">
                <div class="tasting-notes__strength-label">
                  <span>{{ t('tn-strength-low') }}</span>
                </div>
                <div class="tasting-notes__strength-label">
                  <span>{{ t('tn-strength-medium') }}</span>
                </div>
                <div class="tasting-notes__strength-label">
                  <span>{{ t('tn-strength-high') }}</span>
                </div>
              </div>
            </div>

            <div class="tasting-notes__list">
              <div class="tasting-notes__item">
                <div class="tasting-notes__item-img">
                  <img src="/chenpitong/assets/images/tasting-appearance-56586a.webp" alt="Appearance">
                </div>
                <h3 class="tasting-notes__item-label">{{ t('tn-appearance-label') }}</h3>
                <p class="tasting-notes__item-desc">{{ t('tn-appearance-desc') }}</p>
              </div>

              <div class="tasting-notes__item">
                <div class="tasting-notes__item-img">
                  <img src="/chenpitong/assets/images/tasting-aroma-56586a.webp" alt="Aroma">
                </div>
                <h3 class="tasting-notes__item-label">{{ t('tn-aroma-label') }}</h3>
                <p class="tasting-notes__item-desc">{{ t('tn-aroma-desc') }}</p>
              </div>

              <div class="tasting-notes__item">
                <div class="tasting-notes__item-img">
                  <img src="/chenpitong/assets/images/tasting-taste-56586a.webp" alt="Taste">
                </div>
                <h3 class="tasting-notes__item-label">{{ t('tn-taste-label') }}</h3>
                <p class="tasting-notes__item-desc">{{ t('tn-taste-desc') }}</p>
              </div>
            </div>
          </div>

          <div class="tasting-notes__right">
            <div class="tasting-notes__illustration">
              <img class="tasting-notes__illustration-bg" src="/chenpitong/assets/images/tasting-illustration-bg-56586a.webp" alt="Tasting Illustration Background">
              <img class="tasting-notes__illustration-fg" src="/chenpitong/assets/images/tasting-illustration-fg-15b631.webp" alt="Tasting Illustration">
            </div>
          </div>
        </div>
      </section>

      <section class="how-to-prepare">
        <div class="how-to-prepare__inner">
          <h2 class="how-to-prepare__title">{{ t('htp-title') }}</h2>

          <div class="how-to-prepare__steps">
            <div class="how-to-prepare__step">
              <div class="how-to-prepare__step-icon">
                <img src="/chenpitong/assets/icons/icon-amount.svg" alt="Amount" width="48" height="41">
              </div>
              <h3 class="how-to-prepare__step-title">{{ t('htp-amount-title') }}</h3>
              <p class="how-to-prepare__step-desc">{{ t('htp-amount-desc') }}</p>
            </div>

            <div class="how-to-prepare__step">
              <div class="how-to-prepare__step-icon">
                <img src="/chenpitong/assets/icons/icon-water.svg" alt="Water" width="56" height="53">
              </div>
              <h3 class="how-to-prepare__step-title">{{ t('htp-water-title') }}</h3>
              <p class="how-to-prepare__step-desc">{{ t('htp-water-desc') }}</p>
            </div>

            <div class="how-to-prepare__step">
              <div class="how-to-prepare__step-icon">
                <img src="/chenpitong/assets/icons/icon-infuse.svg" alt="Infuse" width="56" height="49">
              </div>
              <h3 class="how-to-prepare__step-title">{{ t('htp-infuse-title') }}</h3>
              <p class="how-to-prepare__step-desc">{{ t('htp-infuse-desc') }}</p>
            </div>

            <div class="how-to-prepare__step how-to-prepare__step--last">
              <div class="how-to-prepare__step-icon">
                <img src="/chenpitong/assets/icons/icon-rebrew.svg" alt="Rebrew" width="52" height="52">
              </div>
              <h3 class="how-to-prepare__step-title">{{ t('htp-rebrew-title') }}</h3>
              <p class="how-to-prepare__step-desc">{{ t('htp-rebrew-desc') }}</p>
            </div>
          </div>
        </div>
      </section>

      <section class="pubei-story">
        <div class="pubei-story__inner">
          <div class="pubei-story__text">
            <p class="pubei-story__question">{{ t('ps-question') }}</p>
            <h2 class="pubei-story__title">{{ t('ps-title') }}</h2>
            <p class="pubei-story__desc">{{ t('ps-desc') }}</p>

            <div class="pubei-story__map">
              <img src="/chenpitong/assets/images/pubei-map-bg.webp" alt="Pubei Map" class="pubei-story__map-img">
            </div>

            <div class="pubei-story__info">
              <div class="pubei-story__info-row">
                <div class="pubei-story__info-dot">
                  <div class="pubei-story__info-line"></div>
                </div>
                <div class="pubei-story__info-label">
                  <span>{{ t('ps-info1') }}</span>
                </div>
              </div>
              <div class="pubei-story__info-row">
                <div class="pubei-story__info-dot">
                  <div class="pubei-story__info-line"></div>
                </div>
                <div class="pubei-story__info-label">
                  <span>{{ t('ps-info2') }}</span>
                </div>
              </div>
              <div class="pubei-story__info-row">
                <div class="pubei-story__info-dot">
                  <div class="pubei-story__info-line"></div>
                </div>
                <div class="pubei-story__info-label">
                  <span>{{ t('ps-info3') }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="pubei-story__img">
            <img src="/chenpitong/assets/images/pubei-product-img.webp" alt="Pubei Chenpi Closeup" class="pubei-story__img-photo">
          </div>
        </div>
      </section>

      <footer class="footer">
        <div class="footer__card">
          <a href="/chenpitong" class="footer__logo">
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
              <a href="/chenpitong" @click="closeNav">{{ t('footer-home') }}</a>
              <a href="/chenpitong#products" @click="closeNav">{{ t('footer-products') }}</a>
              <a href="#stories" @click="closeNav">{{ t('footer-stories') }}</a>
              <a href="/chenpitong#about" @click="closeNav">{{ t('footer-about') }}</a>
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