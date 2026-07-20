<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Header from './Header.vue'

defineProps({
  activeTab: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['update:activeTab'])

const tabs = ['区域公用品牌', '农产品品牌', '农业企业品牌']

function selectTab(index) {
  emit('update:activeTab', index)
}

// ========================================
// 背景图轮播 — JS 驱动，精确控制时序
// ========================================
const ENTER_MS = 3000   // 进场淡入 + 拉近（慢）
const HOLD_MS = 4000    // 停留 + 持续拉近
const EXIT_MS = 1000    // 出场淡出（舒缓）
const OVERLAP_MS = 2000 // 新图提前 2s 进入，再开始旧图退出
const INTERVAL = ENTER_MS + HOLD_MS // 7s — 每张图的入场间隔

const backgrounds = [
  '/images/hero-bg-figma.webp',
  '/images/hero-bg-2.webp',
  '/images/hero-bg-3.webp'
]

// 每张图的状态：hidden | entering | holding | exiting
const phases = ref(backgrounds.map(() => 'hidden'))
let currentIdx = 0
let timer = null
let phaseTimers = []

function clearPhaseTimers() {
  phaseTimers.forEach(t => clearTimeout(t))
  phaseTimers = []
}

function setPhase(idx, phase) {
  phases.value[idx] = phase
}

function enterImage(idx) {
  setPhase(idx, 'entering')
  const t = setTimeout(() => {
    setPhase(idx, 'holding')
  }, ENTER_MS)
  phaseTimers.push(t)
}

function exitImage(idx) {
  setPhase(idx, 'exiting')
  const t = setTimeout(() => {
    setPhase(idx, 'hidden')
  }, EXIT_MS)
  phaseTimers.push(t)
}

function cycle() {
  const prev = currentIdx
  currentIdx = (currentIdx + 1) % backgrounds.length

  // 新图立即进入（淡入 + 放大）
  enterImage(currentIdx)

  // 旧图延迟退出（新图进入 OVERLAP_MS 后才开始淡出）
  const t = setTimeout(() => {
    exitImage(prev)
  }, OVERLAP_MS)
  phaseTimers.push(t)
}

function startSlideShow() {
  // 初始化：第一张直接显示
  setPhase(0, 'holding')
  currentIdx = 0

  // 第一次切换在 HOLD_MS 后（第一张停留足够久）
  setTimeout(() => {
    cycle()
    // 后续每隔 INTERVAL 切换一次
    timer = setInterval(cycle, INTERVAL)
  }, HOLD_MS)
}

function stopSlideShow() {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
  clearPhaseTimers()
}

onMounted(() => {
  startSlideShow()
})

onUnmounted(() => {
  stopSlideShow()
})
</script>

<template>
  <div class="hero-section">
    <Header :activeTab="activeTab" @tabChange="selectTab" />
    <div class="hero-main">
      <div class="hero-bg">
        <div class="hero-bg-slides">
          <div
            v-for="(bg, i) in backgrounds"
            :key="i"
            :class="['hero-bg-slide', `phase-${phases[i]}`]"
          >
            <img :src="bg" :alt="'背景图' + (i + 1)" class="hero-bg-slide-img">
          </div>
        </div>
        <div class="hero-gradient"></div>
      </div>
      <div class="inner">
        <div class="hero-content">
          <div class="hero-text">
            <h1 class="hero-title">汇聚八桂优品</h1>
            <p class="hero-subtitle">广西优质农产品品牌平台</p>
          </div>
        </div>
        <div class="hero-filter">
          <div class="hero-filter-tabs">
            <div v-for="(tab, i) in tabs" :key="i" :class="['hero-tab', { active: activeTab === i }]" @click="selectTab(i)">{{ tab }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
