<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Header from '@/components/Header.vue'
import FooterSection from '@/components/FooterSection.vue'
import { products } from '@/data/products'

const route = useRoute()
const router = useRouter()
const product = computed(() => {
  const id = Number(route.params.productId)
  return products.find(p => p.id === id) || products[0]
})

const categoryTabMap: Record<string, number> = {
  '区域公用品牌': 0,
  '农业企业品牌': 1,
  '农产品品牌': 2
}

const categoryTabIndex = computed(() => categoryTabMap[product.value.category] ?? 0)

// 弹窗状态
const showContactModal = ref(false)
const showPurchaseModal = ref(false)

// 根据产品生成拟真联系方式
const contactInfo = computed(() => {
  const p = product.value
  const region = p.region || '广西'
  const name = p.title.replace(/[区域公用品牌|农产品品牌|农业企业品牌]/g, '').trim()
  return {
    company: `${region}${name.slice(0, 2)}农业科技有限公司`,
    contact: '陈经理',
    phone: '0771-5812xxx',
    mobile: '139 7886 9xxx',
    address: `广西${region}${name}产业园区A区1号`,
    email: 'info@' + name.slice(0, 2) + 'agri.cn'
  }
})

function openContactModal() {
  showContactModal.value = true
}

function openPurchaseModal() {
  showPurchaseModal.value = true
}

// 是否有电商销售链接
const hasSalesLink = computed(() => !!product.value.salesLink)

// 电商网站完整 URL（补全协议和域名）
const salesUrl = computed(() => {
  const link = product.value.salesLink
  if (!link) return ''
  if (link.startsWith('http')) return link
  // 相对路径，补全当前域名
  return window.location.origin + link
})

function closeModals() {
  showContactModal.value = false
  showPurchaseModal.value = false
}

function goToStore() {
  const link = product.value.salesLink
  if (link) {
    window.open(link, '_blank')
  }
  closeModals()
}
</script>

<template>
  <div class="detail-page">
    <Header alwaysWhite />
    <div class="detail-body">
      <!-- 面包屑导航 -->
      <div class="detail-breadcrumb">
        <div class="breadcrumb-content">
          <button class="back-btn" @click="router.go(-1)" aria-label="后退">
            <img src="/icons/arrow-left.svg" class="back-btn-icon" alt="">
          </button>
          <router-link to="/" class="breadcrumb-item">首页</router-link>
          <img src="/images/breadcrumb-chevron.svg" class="breadcrumb-chevron" alt=">">
          <router-link :to="{ name: 'Home', query: { tab: categoryTabIndex } }" class="breadcrumb-item">{{ product.category }}</router-link>
          <img src="/images/breadcrumb-chevron.svg" class="breadcrumb-chevron" alt=">">
          <span class="breadcrumb-item breadcrumb-current">{{ product.title }}</span>
        </div>
      </div>

      <!-- 主图 + 购买信息 -->
      <div class="detail-hero">
        <div class="detail-hero-inner">
          <div class="detail-main-image">
            <img :src="product.image" :alt="product.title">
          </div>
          <div class="detail-info">
            <h1 class="detail-product-title">{{ product.title }}</h1>
            <div class="detail-meta">
              <div class="detail-meta-row">
                <span class="meta-label">品牌类别：</span>
                <span class="meta-value">{{ product.category }}</span>
              </div>
              <div class="detail-meta-row">
                <span class="meta-label">所属地区：</span>
                <span class="meta-value">{{ product.region }}</span>
              </div>
              <div class="detail-meta-row">
                <span class="meta-label">主营产品：</span>
                <span class="meta-value">{{ product.mainProduct }}</span>
              </div>
              <div class="detail-meta-row">
                <span class="meta-label">更新日期：</span>
                <span class="meta-value">{{ product.updateDate }}</span>
              </div>
            </div>
            <div class="detail-purchase">
              <span class="purchase-section-title">购买方式</span>
              <button class="purchase-btn purchase-btn-primary" @click="openContactModal">货源联系方式</button>
              <button class="purchase-btn purchase-btn-outline" @click="openPurchaseModal">浏览电商网站</button>
            </div>
          </div>
        </div>
      </div>

      <!-- 产品介绍 -->
      <div class="detail-description">
        <div class="detail-description-inner">
          <h2 class="description-title">产品介绍</h2>
          <p class="description-text">{{ product.description }}</p>
        </div>
      </div>

      <!-- 生长特性 -->
      <div v-if="product.growthCharacteristics" class="detail-description">
        <div class="detail-description-inner">
          <h2 class="description-title">生长特性</h2>
          <p class="description-text">{{ product.growthCharacteristics }}</p>
        </div>
      </div>

      <!-- 营养价值 -->
      <div v-if="product.nutritionalValue" class="detail-description">
        <div class="detail-description-inner">
          <h2 class="description-title">营养价值</h2>
          <p class="description-text">{{ product.nutritionalValue }}</p>
        </div>
      </div>

      <!-- 种植技术 -->
      <div v-if="product.cultivationTech" class="detail-description">
        <div class="detail-description-inner">
          <h2 class="description-title">种植技术</h2>
          <p class="description-text">{{ product.cultivationTech }}</p>
        </div>
      </div>

      <!-- 市场应用 -->
      <div v-if="product.marketApplication" class="detail-description">
        <div class="detail-description-inner">
          <h2 class="description-title">市场应用</h2>
          <p class="description-text">{{ product.marketApplication }}</p>
        </div>
      </div>

      <!-- 额外段落 -->
      <div v-for="(section, index) in product.extraSections" :key="'extra-' + index" class="detail-description">
        <div class="detail-description-inner">
          <h2 class="description-title">{{ section.title }}</h2>
          <p class="description-text">{{ section.content }}</p>
          <p v-if="section.source" class="description-source">来源：{{ section.source }}</p>
        </div>
      </div>
    </div>

    <!-- 弹窗遮罩层 -->
    <div v-if="showContactModal || showPurchaseModal" class="detail-overlay" @click="closeModals"></div>

    <!-- 货源联系方式弹窗 -->
    <div v-if="showContactModal" class="detail-modal">
      <div class="detail-modal-header">
        <div class="detail-modal-title">{{ product.title }}</div>
        <button class="detail-modal-close" @click="closeModals" aria-label="关闭">
          <img src="/icons/close-icon.svg" alt="关闭">
        </button>
      </div>
      <div class="detail-contact-card">
        <div class="detail-contact-row">
          <svg class="detail-contact-icon" width="32" height="32" viewBox="0 0 20 20" fill="none">
            <rect x="3" y="2" width="14" height="16" rx="2" stroke="currentColor" stroke-width="1.5"/>
            <path d="M3 6h14" stroke="currentColor" stroke-width="1.5"/>
            <path d="M7 10h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M7 13h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
          <div class="detail-contact-content">
            <span class="detail-contact-label">企业名称</span>
            <span class="detail-contact-value">{{ contactInfo.company }}</span>
          </div>
        </div>
        <div class="detail-contact-row">
          <svg class="detail-contact-icon" width="32" height="32" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="5.5" r="3.5" stroke="currentColor" stroke-width="1.5"/>
            <path d="M3 18c0-3.5 3.5-6 7-6s7 2.5 7 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
          <div class="detail-contact-content">
            <span class="detail-contact-label">联系人</span>
            <span class="detail-contact-value">{{ contactInfo.contact }}</span>
          </div>
        </div>
        <div class="detail-contact-row">
          <svg class="detail-contact-icon" width="32" height="32" viewBox="0 0 20 20" fill="none">
            <path d="M17.5 14.5v2a1.5 1.5 0 01-1.5 1.5A13 13 0 012 4a1.5 1.5 0 011.5-1.5h2A1.5 1.5 0 017 3.5c.12.93.4 1.83.82 2.68a1.5 1.5 0 01-.34 1.63l-.7.7a10.5 10.5 0 005 5l.7-.7a1.5 1.5 0 011.63-.34c.85.42 1.75.7 2.68.82A1.5 1.5 0 0117.5 14.5z" stroke="currentColor" stroke-width="1.5"/>
          </svg>
          <div class="detail-contact-content">
            <span class="detail-contact-label">联系电话</span>
            <span class="detail-contact-value">{{ contactInfo.phone }}</span>
          </div>
        </div>
        <div class="detail-contact-row">
          <svg class="detail-contact-icon" width="32" height="32" viewBox="0 0 20 20" fill="none">
            <path d="M17.5 14.5v2a1.5 1.5 0 01-1.5 1.5A13 13 0 012 4a1.5 1.5 0 011.5-1.5h2A1.5 1.5 0 017 3.5c.12.93.4 1.83.82 2.68a1.5 1.5 0 01-.34 1.63l-.7.7a10.5 10.5 0 005 5l.7-.7a1.5 1.5 0 011.63-.34c.85.42 1.75.7 2.68.82A1.5 1.5 0 0117.5 14.5z" stroke="currentColor" stroke-width="1.5"/>
            <path d="M14 2.5a4 4 0 014 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M14 5.5a1 1 0 011 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
          <div class="detail-contact-content">
            <span class="detail-contact-label">手机号码</span>
            <span class="detail-contact-value">{{ contactInfo.mobile }}</span>
          </div>
        </div>
        <div class="detail-contact-row">
          <svg class="detail-contact-icon" width="32" height="32" viewBox="0 0 20 20" fill="none">
            <rect x="2" y="3.5" width="16" height="13" rx="2" stroke="currentColor" stroke-width="1.5"/>
            <path d="M2 7l8 5 8-5" stroke="currentColor" stroke-width="1.5"/>
          </svg>
          <div class="detail-contact-content">
            <span class="detail-contact-label">电子邮箱</span>
            <span class="detail-contact-value">{{ contactInfo.email }}</span>
          </div>
        </div>
        <div class="detail-contact-row">
          <svg class="detail-contact-icon" width="32" height="32" viewBox="0 0 20 20" fill="none">
            <path d="M10 18s6-5.5 6-9.5a6 6 0 10-12 0c0 4 6 9.5 6 9.5z" stroke="currentColor" stroke-width="1.5"/>
            <circle cx="10" cy="8.5" r="2" stroke="currentColor" stroke-width="1.5"/>
          </svg>
          <div class="detail-contact-content">
            <span class="detail-contact-label">公司地址</span>
            <span class="detail-contact-value">{{ contactInfo.address }}</span>
          </div>
        </div>
      </div>
      <div class="detail-modal-footer">
        <button class="detail-modal-btn detail-modal-btn-outline" @click="closeModals">关闭</button>
        <button class="detail-modal-btn detail-modal-btn-primary">立刻联系</button>
      </div>
    </div>

    <!-- 浏览电商网站弹窗 -->
    <div v-if="showPurchaseModal" class="detail-modal">
      <div class="detail-modal-header">
        <div class="detail-modal-title">{{ product.title }}</div>
        <button class="detail-modal-close" @click="closeModals" aria-label="关闭">
          <img src="/icons/close-icon.svg" alt="关闭">
        </button>
      </div>
      <!-- 有电商链接：嵌入网站预览 -->
      <template v-if="hasSalesLink">
        <div class="detail-website-preview">
          <img
            class="detail-website-screenshot"
            src="/images/chenpitong-screenshot.png"
            alt="陈皮通电商网站截图"
          >
        </div>
        <a class="detail-website-url" :href="salesUrl" target="_blank">
          <span class="detail-url-label">网址：</span>
          <span class="detail-url-value">{{ salesUrl }}</span>
        </a>
      </template>

      <!-- 无电商链接：建设中空状态 -->
      <template v-else>
        <div class="detail-website-empty">
          <svg class="detail-empty-icon" width="64" height="64" viewBox="0 0 64 64" fill="none">
            <rect x="8" y="12" width="48" height="40" rx="4" stroke="currentColor" stroke-width="2" fill="none"/>
            <path d="M8 20h48" stroke="currentColor" stroke-width="2"/>
            <circle cx="14" cy="16.5" r="1.5" fill="currentColor"/>
            <circle cx="19" cy="16.5" r="1.5" fill="currentColor"/>
            <circle cx="24" cy="16.5" r="1.5" fill="currentColor"/>
            <path d="M26 36l6-6 6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M38 34l4-4 4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M26 42l6-6 6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <div class="detail-empty-title">电商网站正在建设中</div>
          <div class="detail-empty-desc">该品牌电商网站正在筹备中，敬请期待</div>
        </div>
      </template>

      <div class="detail-modal-footer">
        <button class="detail-modal-btn detail-modal-btn-outline" @click="closeModals">关闭</button>
        <button v-if="hasSalesLink" class="detail-modal-btn detail-modal-btn-primary" @click="goToStore">前往</button>
      </div>
    </div>

    <FooterSection />
  </div>
</template>
