<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { enterprises } from '@/data/enterprises'

const props = defineProps({
  activeTab: {
    type: Number,
    default: 0
  }
})

const router = useRouter()

// ========================================
// Coverflow（区域公用品牌）
// ========================================
const totalSlides = 9
const slideInterval = 5000
const transitionDuration = 700

// ===== 区域公用品牌卡片尺寸配置 =====
const REGION_CARD_CONFIG = {
  WIDTH: 320,
  HEIGHT_RATIO: 1.25,
  SCALE: 0.85
}

const regionSlideOrder = [9, 1, 2, 3, 4, 5, 6, 7, 8]
const regionSlides = regionSlideOrder.map((n, i) => ({
  id: i + 1,
  image: `/images/coverflow-${n}.webp`
}))

// ===== 农产品品牌卡片尺寸配置（320×320）=====
const BRAND_PRODUCT_CARD_CONFIG = {
  WIDTH: 320,
  HEIGHT_RATIO: 1,
  SCALE: 0.90,
  OFFSET_MULT: [0.475, 0.5, 0.425, 0.375],
  ROTATE_BASE: 35,
  ROTATE_MAX: 75
}

const brandProductSlideOrder = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const brandProductSlides = brandProductSlideOrder.map((n, i) => ({
  id: i + 1,
  image: `/images/coverflow-brand-${n}.webp`
}))
const activeIndex = ref(2)

const currentSlideOrder = computed(() => {
  return props.activeTab === 1 ? brandProductSlideOrder : regionSlideOrder
})

// ===== 区域公用品牌 Coverflow 样式（独立控制）=====
const regionSlideStyles = computed(() => {
  const slides = regionSlides
  return slides.map((slide, index) => {
    let offset = index - activeIndex.value

    if (offset < -4) {
      offset += totalSlides
    } else if (offset > 4) {
      offset -= totalSlides
    }

    const absOffset = Math.abs(offset)

    let translateX = 0
    let scale = 1
    let opacity = 1
    let zIndex = 10

    if (absOffset > 0 && absOffset <= 4) {
      const W = REGION_CARD_CONFIG.WIDTH
      const n = absOffset
      const sign = offset > 0 ? 1 : -1
      translateX = sign * W * n * (0.525 - 0.025 * n)
      scale = REGION_CARD_CONFIG.SCALE ** n
      opacity = 1 - n * 0.2
      zIndex = Math.max(1, 6 - n)
    } else if (absOffset === 0) {
      translateX = 0
      scale = 1
      opacity = 1
      zIndex = 999
    }

    return {
      ...slide,
      translateX,
      scale,
      opacity,
      zIndex,
      isActive: offset === 0
    }
  })
})

// ===== 农产品品牌 Coverflow 样式（独立控制）=====
const brandProductSlideStyles = computed(() => {
  const slides = brandProductSlides
  const config = BRAND_PRODUCT_CARD_CONFIG
  return slides.map((slide, index) => {
    let offset = index - activeIndex.value

    if (offset < -4) {
      offset += totalSlides
    } else if (offset > 4) {
      offset -= totalSlides
    }

    const absOffset = Math.abs(offset)

    let translateX = 0
    let scale = 1
    let opacity = 1
    let zIndex = 10

    if (absOffset > 0 && absOffset <= 4) {
      const W = config.WIDTH
      const n = absOffset
      const sign = offset > 0 ? 1 : -1
      translateX = sign * W * n * config.OFFSET_MULT[n - 1]
      scale = config.SCALE ** n
      opacity = 1 - n * 0.2
      zIndex = Math.max(1, 6 - n)
    } else if (absOffset === 0) {
      translateX = 0
      scale = 1
      opacity = 1
      zIndex = 999
    }

    return {
      ...slide,
      translateX,
      scale,
      opacity,
      zIndex,
      isActive: offset === 0,
      rotateY: offset === 0 ? 0 : (offset > 0 ? -1 : 1) * Math.min(Math.abs(offset) * config.ROTATE_BASE, config.ROTATE_MAX)
    }
  })
})

function nextSlide() {
  activeIndex.value = (activeIndex.value + 1) % totalSlides
}

function prevSlide() {
  activeIndex.value = (activeIndex.value - 1 + totalSlides) % totalSlides
}

function handleSlideClick(index) {
  // 非焦点卡片 → 直接切换到点击的卡片
  if (index !== activeIndex.value) {
    activeIndex.value = index
    return
  }

  // 焦点卡片 → 跳转详情页
  const productNumber = currentSlideOrder.value[index]
  if (props.activeTab === 1) {
    router.push({ name: 'BrandProductDetail', params: { id: productNumber } })
  } else {
    if (productNumber === 2) {
      router.push({ name: 'BrandProductDetail', params: { id: 21 } })
    } else {
      router.push({ name: 'Detail', params: { productId: productNumber } })
    }
  }
}

let coverflowTimer = null

function startCoverflowAutoPlay() {
  stopCoverflowAutoPlay()
  coverflowTimer = setInterval(() => {
    activeIndex.value = (activeIndex.value + 1) % totalSlides
  }, slideInterval)
}

function stopCoverflowAutoPlay() {
  if (coverflowTimer) {
    clearInterval(coverflowTimer)
    coverflowTimer = null
  }
}

// ========================================
// Logo 双排横向滚动（农业企业品牌）
// Figma #2153:1157: 10列×2行, 每列272px, 网格2936×424.59, mask两侧渐隐
// ========================================
const GRID_WIDTH = 2120 // 一组10列的宽度 (再缩小90%)
const GRID_GAP = 20
const SCROLL_STEP = 1
const SCROLL_INTERVAL = 50

const scrollOffset = ref(0)
let logoTimer = null

const logoGridStyle = computed(() => ({
  transform: `translateX(-${scrollOffset.value}px)`,
  transition: 'none'
}))

// 打平20个Logo为40个（2组无缝循环），用于 CSS Grid
const logoItems = computed(() => {
  const items = []
  for (let set = 0; set < 2; set++) {
    for (let i = 0; i < 20; i++) {
      items.push({
        logo: enterprises[i].logo,
        name: enterprises[i].name
      })
    }
  }
  return items
})

function scrollLogoWall() {
  const totalWidth = GRID_WIDTH + GRID_GAP
  scrollOffset.value = (scrollOffset.value + SCROLL_STEP) % totalWidth
}

function startLogoWallAutoPlay() {
  stopLogoWallAutoPlay()
  logoTimer = setInterval(scrollLogoWall, SCROLL_INTERVAL)
}

function stopLogoWallAutoPlay() {
  if (logoTimer) {
    clearInterval(logoTimer)
    logoTimer = null
  }
}

// ========================================
// Lifecycle
// ========================================
onMounted(() => {
  startCoverflowAutoPlay()
  startLogoWallAutoPlay()
})

onUnmounted(() => {
  stopCoverflowAutoPlay()
  stopLogoWallAutoPlay()
})
</script>

<template>
  <div
    :class="['recommend-section', {
      'tab-region': activeTab === 0,
      'tab-brand-product': activeTab === 1,
      'tab-enterprise': activeTab === 2
    }]"
    @mouseenter="activeTab === 2 ? stopLogoWallAutoPlay() : stopCoverflowAutoPlay()"
    @mouseleave="activeTab === 2 ? startLogoWallAutoPlay() : startCoverflowAutoPlay()"
  >
    <div class="recommend-content">
      <!-- Coverflow（区域公用品牌） -->
      <template v-if="activeTab === 0">
        <button class="region-coverflow-arrow region-coverflow-arrow-left" @click="nextSlide">
          <svg class="region-coverflow-arrow-icon" viewBox="0 0 24 22" fill="none">
            <path d="M23.6805 10.1377C24.1065 10.5637 24.1065 11.2545 23.6805 11.6805L13.8623 21.4987C13.4363 21.9247 12.7455 21.9247 12.3195 21.4987C11.8935 21.0726 11.8935 20.3819 12.3195 19.9559L20.2754 12H1.09091C0.488417 12 -2.63358e-08 11.5116 0 10.9091C2.63358e-08 10.3066 0.488417 9.81818 1.09091 9.81818H20.2754L12.3195 1.8623C11.8935 1.43627 11.8935 0.745546 12.3195 0.31952C12.7455 -0.106507 13.4363 -0.106507 13.8623 0.31952L23.6805 10.1377Z" fill="currentColor"/>
          </svg>
        </button>

        <div class="region-coverflow" :style="{ height: REGION_CARD_CONFIG.WIDTH * REGION_CARD_CONFIG.HEIGHT_RATIO + 'px' }">
          <div
            v-for="(slide, index) in regionSlideStyles"
            :key="slide.id"
            :class="['region-slide', { active: slide.isActive }]"
            :style="{
              width: REGION_CARD_CONFIG.WIDTH + 'px',
              height: REGION_CARD_CONFIG.WIDTH * REGION_CARD_CONFIG.HEIGHT_RATIO + 'px',
              opacity: slide.opacity,
              zIndex: slide.zIndex,
              transform: `translateX(${slide.translateX}px) scale(${slide.scale})`,
              cursor: 'pointer'
            }"
            @click="handleSlideClick(index)"
          >
            <img :src="slide.image" :alt="'推荐' + slide.id" class="region-slide-image">
          </div>
        </div>

        <button class="region-coverflow-arrow region-coverflow-arrow-right" @click="prevSlide">
          <svg class="region-coverflow-arrow-icon" viewBox="0 0 24 22" fill="none">
            <path d="M23.6805 10.1377C24.1065 10.5637 24.1065 11.2545 23.6805 11.6805L13.8623 21.4987C13.4363 21.9247 12.7455 21.9247 12.3195 21.4987C11.8935 21.0726 11.8935 20.3819 12.3195 19.9559L20.2754 12H1.09091C0.488417 12 -2.63358e-08 11.5116 0 10.9091C2.63358e-08 10.3066 0.488417 9.81818 1.09091 9.81818H20.2754L12.3195 1.8623C11.8935 1.43627 11.8935 0.745546 12.3195 0.31952C12.7455 -0.106507 13.4363 -0.106507 13.8623 0.31952L23.6805 10.1377Z" fill="currentColor"/>
          </svg>
        </button>
      </template>

      <!-- Coverflow（农产品品牌） -->
      <template v-if="activeTab === 1">
        <button class="brand-product-coverflow-arrow brand-product-coverflow-arrow-left" @click="nextSlide">
          <svg class="brand-product-coverflow-arrow-icon" viewBox="0 0 24 22" fill="none">
            <path d="M23.6805 10.1377C24.1065 10.5637 24.1065 11.2545 23.6805 11.6805L13.8623 21.4987C13.4363 21.9247 12.7455 21.9247 12.3195 21.4987C11.8935 21.0726 11.8935 20.3819 12.3195 19.9559L20.2754 12H1.09091C0.488417 12 -2.63358e-08 11.5116 0 10.9091C2.63358e-08 10.3066 0.488417 9.81818 1.09091 9.81818H20.2754L12.3195 1.8623C11.8935 1.43627 11.8935 0.745546 12.3195 0.31952C12.7455 -0.106507 13.4363 -0.106507 13.8623 0.31952L23.6805 10.1377Z" fill="currentColor"/>
          </svg>
        </button>

        <div class="brand-product-coverflow" :style="{ height: BRAND_PRODUCT_CARD_CONFIG.WIDTH * BRAND_PRODUCT_CARD_CONFIG.HEIGHT_RATIO + 'px' }">
          <div
            v-for="(slide, index) in brandProductSlideStyles"
            :key="slide.id"
            :class="['brand-product-slide', { active: slide.isActive }]"
            :style="{
              width: BRAND_PRODUCT_CARD_CONFIG.WIDTH + 'px',
              height: BRAND_PRODUCT_CARD_CONFIG.WIDTH * BRAND_PRODUCT_CARD_CONFIG.HEIGHT_RATIO + 'px',
              opacity: slide.opacity,
              zIndex: slide.zIndex,
              transform: `translateX(${slide.translateX}px) rotateY(${slide.rotateY}deg) scale(${slide.scale})`,
              cursor: 'pointer'
            }"
            @click="handleSlideClick(index)"
          >
            <img :src="slide.image" :alt="'推荐' + slide.id" class="brand-product-slide-image">
          </div>
        </div>

        <button class="brand-product-coverflow-arrow brand-product-coverflow-arrow-right" @click="prevSlide">
          <svg class="brand-product-coverflow-arrow-icon" viewBox="0 0 24 22" fill="none">
            <path d="M23.6805 10.1377C24.1065 10.5637 24.1065 11.2545 23.6805 11.6805L13.8623 21.4987C13.4363 21.9247 12.7455 21.9247 12.3195 21.4987C11.8935 21.0726 11.8935 20.3819 12.3195 19.9559L20.2754 12H1.09091C0.488417 12 -2.63358e-08 11.5116 0 10.9091C2.63358e-08 10.3066 0.488417 9.81818 1.09091 9.81818H20.2754L12.3195 1.8623C11.8935 1.43627 11.8935 0.745546 12.3195 0.31952C12.7455 -0.106507 13.4363 -0.106507 13.8623 0.31952L23.6805 10.1377Z" fill="currentColor"/>
          </svg>
        </button>
      </template>

      <!-- Logo 双排横向滚动（农业企业品牌）Figma #2153:1157 -->
      <template v-if="activeTab === 2">
        <div class="logo-scroll-wrap">
          <div class="logo-grid-strip" :style="logoGridStyle">
            <div
              v-for="set in 2"
              :key="'set-' + set"
              class="logo-grid-set"
            >
              <div
                v-for="(item, idx) in logoItems.slice((set - 1) * 20, set * 20)"
                :key="'logo-' + set + '-' + idx"
                class="logo-grid-card"
              >
                <img :src="item.logo" :alt="item.name" class="logo-grid-img">
                <div class="logo-grid-overlay">
                  <span class="logo-grid-name">{{ item.name }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>