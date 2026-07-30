<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Header from '@/components/Header.vue'
import FooterSection from '@/components/FooterSection.vue'
import { products } from '@/data/products'
import { brandProducts } from '@/data/brand-products'
import { enterprises } from '@/data/enterprises'

const route = useRoute()
const router = useRouter()

const searchText = ref('')
const activeFilter = ref('全部')

const filters = ['全部', '区域公用品牌', '农产品品牌', '农业企业品牌']

// 合并所有可搜索数据
interface SearchResult {
  id: string
  title: string
  description: string
  image: string
  type: string
  category: string
  region: string
  routeName: string
  routeParam: string
}

function buildResults(): SearchResult[] {
  const q = searchText.value.trim().toLowerCase()
  if (!q) return []

  const results: SearchResult[] = []

  // 区域公用品牌
  products.forEach(p => {
    const match = p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.mainProduct.toLowerCase().includes(q) ||
      p.region.includes(q)
    if (match) {
      results.push({
        id: String(p.id),
        title: p.title,
        description: p.description.slice(0, 120) + '...',
        image: p.image,
        type: '区域公用品牌',
        category: p.category,
        region: p.region,
        routeName: 'Detail',
        routeParam: String(p.id)
      })
    }
  })

  // 农产品品牌
  brandProducts.forEach(bp => {
    const match = bp.name.toLowerCase().includes(q) ||
      bp.company.toLowerCase().includes(q) ||
      bp.description.toLowerCase().includes(q) ||
      bp.mainProduct.toLowerCase().includes(q) ||
      bp.region.includes(q)
    if (match) {
      results.push({
        id: String(bp.id),
        title: bp.name,
        description: bp.description.slice(0, 120) + '...',
        image: bp.logo,
        type: '农产品品牌',
        category: bp.category,
        region: bp.region,
        routeName: 'BrandProductDetail',
        routeParam: String(bp.id)
      })
    }
  })

  // 农业企业品牌
  enterprises.forEach(e => {
    const match = e.name.toLowerCase().includes(q) ||
      e.description.toLowerCase().includes(q) ||
      e.mainProduct.toLowerCase().includes(q) ||
      e.region.includes(q)
    if (match) {
      results.push({
        id: String(e.id),
        title: e.name,
        description: e.description.slice(0, 120) + '...',
        image: e.logo,
        type: '农业企业品牌',
        category: e.category,
        region: e.region,
        routeName: 'EnterpriseDetail',
        routeParam: String(e.id)
      })
    }
  })

  return results
}

const allResults = computed(() => buildResults())

const filteredResults = computed(() => {
  if (activeFilter.value === '全部') return allResults.value
  return allResults.value.filter(r => r.type === activeFilter.value)
})

const resultCount = computed(() => filteredResults.value.length)

function goDetail(item: SearchResult) {
  router.push({ name: item.routeName, params: { [item.routeName === 'Detail' ? 'productId' : 'id']: item.routeParam } })
}

// 从 URL 参数读取初始搜索词
onMounted(() => {
  const q = route.query.q as string
  if (q) {
    searchText.value = q
  }
})
</script>

<template>
  <div class="search-page">
    <Header alwaysWhite :activeTab="0" />

    <div class="search-page-body">
      <div class="page-container">
        <!-- 面包屑导航 -->
        <div class="page-breadcrumb-content">
          <button class="page-back-btn" @click="router.go(-1)" aria-label="后退">
            <img src="/icons/arrow-left.svg" class="page-back-btn-icon" alt="">
          </button>
          <router-link to="/" class="page-breadcrumb-item">首页</router-link>
          <img src="/images/breadcrumb-chevron.svg" class="page-breadcrumb-chevron" alt=">">
          <span class="page-breadcrumb-item page-breadcrumb-current">搜索</span>
        </div>

        <!-- 搜索栏 -->
        <div class="search-page-bar">
          <div class="search-page-input-wrap">
            <svg class="search-page-input-icon" width="24" height="24" viewBox="0 0 32 32" fill="none">
              <path d="M14.5 24C19.7467 24 24 19.7467 24 14.5C24 9.25329 19.7467 5 14.5 5C9.25329 5 5 9.25329 5 14.5C5 19.7467 9.25329 24 14.5 24Z" stroke="rgba(16, 18, 21, 0.5)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M21 21L27 27" stroke="rgba(16, 18, 21, 0.5)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <input
              v-model="searchText"
              class="search-page-input"
              type="text"
              placeholder="搜索产品、品牌或企业..."
              @keydown.enter="buildResults"
            >
          </div>
          <button class="search-page-submit" @click="buildResults">搜索</button>
        </div>

        <!-- 筛选标签 -->
        <div class="search-page-filters">
          <button
            v-for="f in filters"
            :key="f"
            :class="['search-page-filter-chip', { 'search-page-filter-chip--active': f === activeFilter }]"
            @click="activeFilter = f"
          >{{ f }}</button>
        </div>

        <!-- 结果统计 -->
        <div class="search-page-stats" v-if="searchText.trim()">
          <span>共找到 <strong>{{ resultCount }}</strong> 条结果</span>
        </div>

        <!-- 空状态 -->
        <div class="search-page-empty" v-if="searchText.trim() && resultCount === 0">
          <p>未找到与"<strong>{{ searchText }}</strong>"相关的结果</p>
          <p class="search-page-empty-hint">试试更换关键词或调整筛选条件</p>
        </div>

        <!-- 初始提示 -->
        <div class="search-page-empty" v-if="!searchText.trim()">
          <p>输入关键词搜索产品、品牌或企业</p>
        </div>

        <!-- 结果列表 -->
        <div class="search-page-results" v-if="filteredResults.length > 0">
          <div
            v-for="item in filteredResults"
            :key="item.type + '-' + item.id"
            class="search-page-card"
            @click="goDetail(item)"
          >
            <div class="search-page-card-img">
              <img :src="item.image" :alt="item.title">
            </div>
            <div class="search-page-card-body">
              <div class="search-page-card-header">
                <h3 class="search-page-card-title">{{ item.title }}</h3>
                <span :class="['search-page-card-badge', 'search-page-card-badge--' + item.type]">{{ item.type }}</span>
              </div>
              <p class="search-page-card-desc">{{ item.description }}</p>
              <div class="search-page-card-meta">
                <span>{{ item.region }}</span>
                <span>{{ item.category }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <FooterSection />
  </div>
</template>
