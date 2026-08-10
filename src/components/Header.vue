<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useLoginModal } from '../composables/useLoginModal'

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
const router = useRouter()
const route = useRoute()
const { openLoginModal } = useLoginModal()

const isScrolled = ref(false)
let scrollHandler = null

// Dropdown state
const showTypeMenu = ref(false)
const showCategoryMenu = ref(false)
const selectedType = ref('区域公用品牌')

const typeOptions = ['区域公用品牌', '农产品品牌', '农业企业品牌']

const searchQuery = ref('')

function goSearch() {
  const q = searchQuery.value.trim()
  if (q) {
    router.push({ name: 'Search', query: { q } })
  } else {
    router.push({ name: 'Search' })
  }
}

function goAccount() {
  openLoginModal()
}

// Scrolled nav tabs
const navTabs = ['区域公用品牌', '农产品品牌', '农业企业品牌']
const secondaryNavTabs = ['首页', ...navTabs]

function selectTab(index) {
  // 首页 → 跳转首页
  if (index === 0) {
    router.push('/')
    return
  }
  // 品牌标签 (1-3)
  const brandIndex = index - 1
  selectedType.value = navTabs[brandIndex]
  emit('tabChange', brandIndex)
  if (route.name !== 'Home') {
    router.push({ name: 'Home', query: { tab: brandIndex } })
    return
  }
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// 当前高亮标签在 4 项中的索引：首页永不激活，品牌标签 +1
const activeTabIndex = computed(() => {
  if (route.name === 'Home') {
    return props.activeTab + 1
  }
  return -1
})

function toggleTypeMenu() {
  showTypeMenu.value = !showTypeMenu.value
}

function toggleCategoryMenu() {
  showCategoryMenu.value = !showCategoryMenu.value
  showTypeMenu.value = false
}

function selectType(opt) {
  selectedType.value = opt
  showTypeMenu.value = false
}

function closeMenus() {
  showTypeMenu.value = false
  showCategoryMenu.value = false
}

onMounted(() => {
  if (props.alwaysWhite) {
    isScrolled.value = true
    document.addEventListener('click', closeMenus)
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
  <!-- ===== 二级页面：Figma 1:1 还原的白色顶栏 ===== -->
  <header v-if="alwaysWhite" class="header header--secondary">
    <div class="header-secondary-nav">
      <!-- Logo 绿底区域 -->
      <div class="header-secondary-logo">
        <div class="header-secondary-logo-row">
          <img src="/icons/header-secondary-logomark.svg" class="header-secondary-logo-mark" alt="logo">
          <img src="/icons/header-secondary-logotype.svg" class="header-secondary-logo-type" alt="桂字号">
        </div>
      </div>

      <!-- 导航标签（4 项：首页 + 3 品牌） -->
      <div class="header-secondary-tabs">
        <button
          v-for="(tab, i) in secondaryNavTabs"
          :key="tab"
          :class="['header-secondary-tab', { 'header-secondary-tab--active': i === activeTabIndex }]"
          @click="selectTab(i)"
        >{{ tab }}</button>
      </div>

      <!-- 账号操作区：搜索按钮 + 账号区（间隔由组内 gap 控制，不受 nav 48px gap 影响） -->
      <div class="header-actions">
        <div class="header-secondary-search" @click="goSearch">
          <img src="/icons/search-icon.svg" class="header-secondary-search-icon" alt="搜索">
        </div>
        <button class="header-account-btn" @click="goAccount">登录/注册</button>
      </div>
    </div>
  </header>

  <!-- ===== 首页：透明/滚动顶栏（原样不动） ===== -->
  <header v-else :class="['header', { 'header-scrolled': isScrolled }]">
    <div class="header-nav">
      <!-- ===== 未滚动：透明状态（原样保留） ===== -->
      <template v-if="!isScrolled">
        <div class="header-logo">
          <img src="/icons/header-logomark-white.svg" class="header-logo-mark" alt="logo">
          <img src="/icons/header-logotype-white.svg" class="header-logo-type" alt="桂字号">
        </div>
        <div class="header-search-bar">
          <div class="search-bar-row">
            <div class="search-bar-item search-bar-dropdown search-bar-type" @click.stop="toggleTypeMenu">
              <span class="dropdown-label">{{ selectedType }}</span>
              <svg class="dropdown-chevron" width="12" height="8" viewBox="0 0 12 8">
                <path d="M1 1.5L6 6.5L11 1.5" stroke="#101215" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="search-bar-item search-bar-input-box">
              <svg width="24" height="24" viewBox="0 0 32 32" fill="none" style="cursor:pointer" @click="goSearch">
                <path d="M14.5 24C19.7467 24 24 19.7467 24 14.5C24 9.25329 19.7467 5 14.5 5C9.25329 5 5 9.25329 5 14.5C5 19.7467 9.25329 24 14.5 24Z" stroke="rgba(16, 18, 21, 0.5)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M21 21L27 27" stroke="rgba(16, 18, 21, 0.5)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <input class="search-input" type="text" placeholder="请输入关键词搜索" v-model="searchQuery" @keydown.enter="goSearch">
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
        </div>

        <!-- 右上角操作区：搜索按钮 → 登录/注册（与设计稿顺序一致） -->
        <div class="header-banner-actions">
          <div class="header-banner-search" @click="goSearch">
            <img src="/icons/search-icon.svg" class="header-banner-search-icon" alt="搜索">
          </div>
          <button class="header-account-btn" @click="goAccount">登录/注册</button>
        </div>
      </template>

      <!-- ===== 滚动后：Figma 统一风格 ===== -->
      <template v-else>
        <!-- Figma 绿底 Logo -->
        <div class="header-secondary-logo">
          <div class="header-secondary-logo-row">
            <img src="/icons/header-secondary-logomark.svg" class="header-secondary-logo-mark" alt="logo">
            <img src="/icons/header-secondary-logotype.svg" class="header-secondary-logo-type" alt="桂字号">
          </div>
        </div>
        <!-- Figma 导航标签（4 项：首页 + 3 品牌） -->
        <div class="header-secondary-tabs">
          <button
            v-for="(tab, i) in secondaryNavTabs"
            :key="tab"
            :class="['header-secondary-tab', { 'header-secondary-tab--active': i === activeTabIndex }]"
            @click="selectTab(i)"
          >{{ tab }}</button>
        </div>
        <!-- 窄屏：分类下拉菜单 -->
        <div class="scrolled-category-wrapper">
          <div class="scrolled-category-dropdown" @click.stop="toggleCategoryMenu">
            <span class="scrolled-category-label">分类：</span>
            <span class="scrolled-category-value">{{ navTabs[props.activeTab] }}</span>
            <img src="/icons/chevron-down.svg" class="scrolled-category-chevron" alt="▾">
          </div>
          <div v-if="showCategoryMenu" class="dropdown-popup category-popup" @click.stop>
            <div class="dropdown-popup-inner">
              <button
                v-for="(tab, i) in navTabs"
                :key="tab"
                :class="['dropdown-chip', { 'dropdown-chip-active': i === props.activeTab }]"
                @click="selectTab(i); showCategoryMenu = false"
              >{{ tab }}</button>
            </div>
          </div>
        </div>
        <!-- 账号操作区：搜索按钮 + 账号区（间隔由组内 gap 控制，不受 nav 48px gap 影响） -->
        <div class="header-actions">
          <div class="header-secondary-search" @click="goSearch">
            <img src="/icons/search-icon.svg" class="header-secondary-search-icon" alt="搜索">
          </div>
          <button class="header-account-btn" @click="goAccount">登录/注册</button>
        </div>
      </template>

      <!-- 隐藏翻译按钮 -->

      <!-- end隐藏翻译按钮 -->
    </div>
  </header>
</template>
