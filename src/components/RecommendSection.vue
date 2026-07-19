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
// Coverflow（区域公用品牌 & 农产品品牌）
// ========================================
const totalSlides = 9
const slideInterval = 5000
const transitionDuration = 700

const slideOrder = [9, 1, 2, 3, 4, 5, 6, 7, 8]
const slides = slideOrder.map((n, i) => ({
  id: i + 1,
  image: `/images/coverflow-${n}.png`
}))
const activeIndex = ref(2)

const slideStyles = computed(() => {
  return slides.map((slide, index) => {
    let offset = index - activeIndex.value

    if (offset < -4) {
      offset += totalSlides
    } else if (offset > 4) {
      offset -= totalSlides
    }

    let translateX = 0
    let scale = 1
    let opacity = 1
    let zIndex = 10

    if (offset === -4) {
      translateX = -615
      scale = 0.85 ** 4
      opacity = 0.2
      zIndex = 1
    } else if (offset === -3) {
      translateX = -480
      scale = 0.85 ** 3
      opacity = 0.4
      zIndex = 2
    } else if (offset === -2) {
      translateX = -340
      scale = 0.85 ** 2
      opacity = 0.6
      zIndex = 3
    } else if (offset === -1) {
      translateX = -180
      scale = 0.85
      opacity = 0.8
      zIndex = 5
    } else if (offset === 0) {
      translateX = 0
      scale = 1
      opacity = 1
      zIndex = 999
    } else if (offset === 1) {
      translateX = 180
      scale = 0.85
      opacity = 0.8
      zIndex = 5
    } else if (offset === 2) {
      translateX = 340
      scale = 0.85 ** 2
      opacity = 0.6
      zIndex = 3
    } else if (offset === 3) {
      translateX = 480
      scale = 0.85 ** 3
      opacity = 0.4
      zIndex = 2
    } else if (offset === 4) {
      translateX = 615
      scale = 0.85 ** 4
      opacity = 0.2
      zIndex = 1
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

function nextSlide() {
  activeIndex.value = (activeIndex.value + 1) % totalSlides
}

function prevSlide() {
  activeIndex.value = (activeIndex.value - 1 + totalSlides) % totalSlides
}

function handleSlideClick(index) {
  if (slideOrder[index] === 2) {
    router.push('/chenpitong')
  } else {
    activeIndex.value = index
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
const GRID_WIDTH = 2936 // 一组10列的宽度 = 10×272 + 9×24
const GRID_GAP = 24
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
    class="recommend-section"
    @mouseenter="activeTab === 1 ? stopLogoWallAutoPlay() : stopCoverflowAutoPlay()"
    @mouseleave="activeTab === 1 ? startLogoWallAutoPlay() : startCoverflowAutoPlay()"
  >
    <div class="recommend-content">
      <!-- Coverflow（区域公用品牌 & 农产品品牌） -->
      <template v-if="activeTab !== 1">
        <button class="coverflow-arrow coverflow-arrow-left" @click="nextSlide">
          <svg class="coverflow-arrow-icon" viewBox="0 0 24 22" fill="none">
            <path d="M23.6805 10.1377C24.1065 10.5637 24.1065 11.2545 23.6805 11.6805L13.8623 21.4987C13.4363 21.9247 12.7455 21.9247 12.3195 21.4987C11.8935 21.0726 11.8935 20.3819 12.3195 19.9559L20.2754 12H1.09091C0.488417 12 -2.63358e-08 11.5116 0 10.9091C2.63358e-08 10.3066 0.488417 9.81818 1.09091 9.81818H20.2754L12.3195 1.8623C11.8935 1.43627 11.8935 0.745546 12.3195 0.31952C12.7455 -0.106507 13.4363 -0.106507 13.8623 0.31952L23.6805 10.1377Z" fill="currentColor"/>
          </svg>
        </button>

        <div class="recommend-coverflow">
          <div
            v-for="(slide, index) in slideStyles"
            :key="slide.id"
            :class="['recommend-slide', { active: slide.isActive }]"
            :style="{
              opacity: slide.opacity,
              zIndex: slide.zIndex,
              transform: `translateX(${slide.translateX}px) scale(${slide.scale})`,
              cursor: slideOrder[index] === 2 ? 'pointer' : 'default'
            }"
            @click="handleSlideClick(index)"
          >
            <img :src="slide.image" :alt="'推荐' + slide.id" class="recommend-slide-image">
          </div>
        </div>

        <button class="coverflow-arrow coverflow-arrow-right" @click="prevSlide">
          <svg class="coverflow-arrow-icon" viewBox="0 0 24 22" fill="none">
            <path d="M23.6805 10.1377C24.1065 10.5637 24.1065 11.2545 23.6805 11.6805L13.8623 21.4987C13.4363 21.9247 12.7455 21.9247 12.3195 21.4987C11.8935 21.0726 11.8935 20.3819 12.3195 19.9559L20.2754 12H1.09091C0.488417 12 -2.63358e-08 11.5116 0 10.9091C2.63358e-08 10.3066 0.488417 9.81818 1.09091 9.81818H20.2754L12.3195 1.8623C11.8935 1.43627 11.8935 0.745546 12.3195 0.31952C12.7455 -0.106507 13.4363 -0.106507 13.8623 0.31952L23.6805 10.1377Z" fill="currentColor"/>
          </svg>
        </button>
      </template>

      <!-- Logo 双排横向滚动（农业企业品牌）Figma #2153:1157 -->
      <template v-else>
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