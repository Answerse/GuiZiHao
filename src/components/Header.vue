<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  alwaysWhite: {
    type: Boolean,
    default: false
  },
  activeTab: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['tabChange'])

const isScrolled = ref(false)
let scrollHandler = null

// Dropdown state
const showTypeMenu = ref(false)
const showRegionMenu = ref(false)
const selectedType = ref('区域公用品牌')
const selectedRegion = ref('全部')

const typeOptions = ['区域公用品牌', '农业企业品牌', '农产品品牌']
const regionOptions = ['全部', '自治区', '南宁市', '柳州市', '桂林市', '梧州市', '北海市', '防城港市', '钦州市', '贵港市', '玉林市', '百色市', '贺州市', '河池市', '来宾市', '崇左市']

// Scrolled nav tabs
const navTabs = ['区域公用品牌', '农业企业品牌', '农产品品牌']

function selectTab(index) {
  selectedType.value = navTabs[index]
  emit('tabChange', index)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function toggleTypeMenu() {
  showTypeMenu.value = !showTypeMenu.value
  showRegionMenu.value = false
}

function toggleRegionMenu() {
  showRegionMenu.value = !showRegionMenu.value
  showTypeMenu.value = false
}

function selectType(opt) {
  selectedType.value = opt
  showTypeMenu.value = false
}

function selectRegion(opt) {
  selectedRegion.value = opt
  showRegionMenu.value = false
}

function closeMenus() {
  showTypeMenu.value = false
  showRegionMenu.value = false
}

onMounted(() => {
  if (props.alwaysWhite) {
    isScrolled.value = true
    return
  }
  scrollHandler = () => {
    isScrolled.value = window.scrollY > 400
  }
  window.addEventListener('scroll', scrollHandler, { passive: true })
  document.addEventListener('click', closeMenus)
})

onUnmounted(() => {
  if (scrollHandler) {
    window.removeEventListener('scroll', scrollHandler)
  }
  document.removeEventListener('click', closeMenus)
})
</script>

<template>
  <header :class="['header', { 'header-scrolled': isScrolled }]">
    <div class="header-nav">
      <div class="header-logo">
        <img src="/icons/header-ribbon.svg" class="header-ribbon" alt="ribbon">
        <div class="header-logo-content">
          <img src="/icons/header-logo.svg" class="header-logo-icon" alt="logo">
          <span class="header-logo-text">桂字号</span>
        </div>
      </div>

      <!-- ===== 未滚动：透明状态（原样） ===== -->
      <template v-if="!isScrolled">
        <div class="header-search-bar">
          <div class="search-bar-row">
            <div class="search-bar-item search-bar-dropdown search-bar-type" @click.stop="toggleTypeMenu">
              <span class="dropdown-label">{{ selectedType }}</span>
              <svg class="dropdown-chevron" width="12" height="8" viewBox="0 0 12 8">
                <path d="M1 1.5L6 6.5L11 1.5" stroke="#101215" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="search-bar-item search-bar-dropdown search-bar-region" @click.stop="toggleRegionMenu">
              <span class="dropdown-label">{{ selectedRegion }}</span>
              <svg class="dropdown-chevron" width="12" height="8" viewBox="0 0 12 8">
                <path d="M1 1.5L6 6.5L11 1.5" stroke="#101215" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="search-bar-item search-bar-input-box">
              <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
                <path d="M14.5 24C19.7467 24 24 19.7467 24 14.5C24 9.25329 19.7467 5 14.5 5C9.25329 5 5 9.25329 5 14.5C5 19.7467 9.25329 24 14.5 24Z" stroke="rgba(16, 18, 21, 0.5)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M21 21L27 27" stroke="rgba(16, 18, 21, 0.5)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <input class="search-input" type="text" placeholder="请输入关键词搜索">
            </div>
          </div>
          <!-- 类型下拉菜单 -->
          <div v-if="showTypeMenu" class="dropdown-popup type-popup" @click.stop>
            <div class="dropdown-popup-inner">
              <button
                v-for="opt in typeOptions"
                :key="opt"
                :class="['dropdown-chip', { 'dropdown-chip-active': opt === selectedType }]"
                @click="selectType(opt)"
              >{{ opt }}</button>
            </div>
          </div>
          <!-- 地区下拉菜单 -->
          <div v-if="showRegionMenu" class="dropdown-popup region-popup" @click.stop>
            <div class="dropdown-popup-inner region-grid">
              <button
                v-for="opt in regionOptions"
                :key="opt"
                :class="['dropdown-chip', { 'dropdown-chip-active': opt === selectedRegion }]"
                @click="selectRegion(opt)"
              >{{ opt }}</button>
            </div>
          </div>
        </div>
      </template>

      <!-- ===== 滚动后：新设计 ===== -->
      <template v-else>
        <div class="scrolled-nav-section">
          <div class="scrolled-category-tabs">
            <button
              v-for="(tab, i) in navTabs"
              :key="tab"
              :class="['scrolled-category-tab', { 'scrolled-category-tab-active': i === props.activeTab }]"
              @click="selectTab(i)"
            >{{ tab }}</button>
          </div>
          <div class="scrolled-region-wrapper">
            <div class="scrolled-region-pill" @click.stop="toggleRegionMenu">
              <span class="scrolled-region-label">区域：</span>
              <span class="scrolled-region-value">{{ selectedRegion }}</span>
              <img src="/icons/chevron-down.svg" class="scrolled-region-chevron" alt="▾">
            </div>
            <!-- 地区下拉菜单 -->
            <div v-if="showRegionMenu" class="dropdown-popup region-popup" @click.stop>
              <div class="dropdown-popup-inner region-grid">
                <button
                  v-for="opt in regionOptions"
                  :key="opt"
                  :class="['dropdown-chip', { 'dropdown-chip-active': opt === selectedRegion }]"
                  @click="selectRegion(opt)"
                >{{ opt }}</button>
              </div>
            </div>
          </div>
          <div class="scrolled-search-btn">
            <img src="/icons/search-icon.svg" class="scrolled-search-icon" alt="搜索">
          </div>
        </div>
      </template>

      <div class="header-language">
        <div class="lang-switch">
          <div class="lang-content">
            <img :src="isScrolled ? '/icons/lang-icon-dark.svg' : '/icons/lang-icon.svg'" class="lang-icon" alt="icon">
            <span :class="['lang-text', { 'lang-text-dark': isScrolled }]">English</span>
          </div>
          <svg class="lang-arrow" width="9" height="5" viewBox="0 0 9 5">
            <polygon :fill="isScrolled ? '#101215' : 'white'" points="0,0 9,0 4.5,5"/>
          </svg>
        </div>
      </div>
    </div>
  </header>
</template>
