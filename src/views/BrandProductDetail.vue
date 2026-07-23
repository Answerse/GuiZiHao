<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Header from '@/components/Header.vue'
import FooterSection from '@/components/FooterSection.vue'
import { brandProducts } from '@/data/brand-products'

const route = useRoute()
const brandProduct = computed(() => {
  const id = Number(route.params.id)
  return brandProducts.find(p => p.id === id) || brandProducts[0]
})

function goToChenpiTong() {
  if (brandProduct.value.name === '陈皮通') {
    window.open('/chenpitong', '_blank')
  }
}
</script>

<template>
  <div class="detail-page">
    <Header alwaysWhite />
    <div class="detail-body">
      <!-- 面包屑导航 -->
      <div class="detail-breadcrumb">
        <div class="breadcrumb-content">
          <button class="back-btn" @click="$router.go(-1)" aria-label="后退">
            <img src="/icons/arrow-left.svg" class="back-btn-icon" alt="">
          </button>
          <router-link to="/" class="breadcrumb-item">首页</router-link>
          <img src="/images/breadcrumb-chevron.svg" class="breadcrumb-chevron" alt=">">
          <router-link :to="{ name: 'Home', query: { tab: 2 } }" class="breadcrumb-item">农产品品牌</router-link>
          <img src="/images/breadcrumb-chevron.svg" class="breadcrumb-chevron" alt=">">
          <span class="breadcrumb-item breadcrumb-current">{{ brandProduct.fullName }}</span>
        </div>
      </div>

      <!-- 主图 + 信息 -->
      <div class="detail-hero">
        <div class="detail-hero-inner">
          <div class="detail-main-image enterprise-detail-image">
            <img :src="brandProduct.logo" :alt="brandProduct.name">
          </div>
          <div class="detail-info">
            <h1 class="detail-product-title">{{ brandProduct.fullName }}</h1>
            <div class="detail-meta">
              <div class="detail-meta-row">
                <span class="meta-label">品牌类别：</span>
                <span class="meta-value">{{ brandProduct.category }}</span>
              </div>
              <div class="detail-meta-row">
                <span class="meta-label">所属地区：</span>
                <span class="meta-value">{{ brandProduct.region }}</span>
              </div>
              <div class="detail-meta-row">
                <span class="meta-label">主营产品：</span>
                <span class="meta-value">{{ brandProduct.mainProduct }}</span>
              </div>
              <div class="detail-meta-row">
                <span class="meta-label">生产企业：</span>
                <span class="meta-value">{{ brandProduct.company }}</span>
              </div>
              <div class="detail-meta-row">
                <span class="meta-label">更新日期：</span>
                <span class="meta-value">{{ brandProduct.updateDate }}</span>
              </div>
            </div>
            <div class="detail-purchase">
              <span class="purchase-section-title">购买方式</span>
              <button class="purchase-btn purchase-btn-primary">货源联系方式</button>
              <button class="purchase-btn purchase-btn-outline" @click="goToChenpiTong">去网点购买</button>
            </div>
          </div>
        </div>
      </div>

      <!-- 产品介绍 -->
      <div class="detail-description">
        <div class="detail-description-inner">
          <h2 class="description-title">产品介绍</h2>
          <p class="description-text">{{ brandProduct.description }}</p>
        </div>
      </div>

      <!-- 品牌背景 -->
      <div v-if="brandProduct.brandBackground" class="detail-description">
        <div class="detail-description-inner">
          <h2 class="description-title">品牌背景</h2>
          <p class="description-text">{{ brandProduct.brandBackground }}</p>
        </div>
      </div>

      <!-- 生长特性 -->
      <div v-if="brandProduct.growthCharacteristics" class="detail-description">
        <div class="detail-description-inner">
          <h2 class="description-title">生长特性</h2>
          <p class="description-text">{{ brandProduct.growthCharacteristics }}</p>
        </div>
      </div>

      <!-- 营养价值 -->
      <div v-if="brandProduct.nutritionalValue" class="detail-description">
        <div class="detail-description-inner">
          <h2 class="description-title">营养价值</h2>
          <p class="description-text">{{ brandProduct.nutritionalValue }}</p>
        </div>
      </div>

      <!-- 种植/加工技术 -->
      <div v-if="brandProduct.cultivationTech" class="detail-description">
        <div class="detail-description-inner">
          <h2 class="description-title">种植/加工技术</h2>
          <p class="description-text">{{ brandProduct.cultivationTech }}</p>
        </div>
      </div>

      <!-- 市场应用 -->
      <div v-if="brandProduct.marketApplication" class="detail-description">
        <div class="detail-description-inner">
          <h2 class="description-title">市场应用</h2>
          <p class="description-text">{{ brandProduct.marketApplication }}</p>
        </div>
      </div>

      <!-- 质量认证 -->
      <div v-if="brandProduct.qualityCertification" class="detail-description">
        <div class="detail-description-inner">
          <h2 class="description-title">质量认证</h2>
          <p class="description-text">{{ brandProduct.qualityCertification }}</p>
        </div>
      </div>

      <!-- 荣誉资质 -->
      <div v-if="brandProduct.honors" class="detail-description">
        <div class="detail-description-inner">
          <h2 class="description-title">荣誉资质</h2>
          <p class="description-text">{{ brandProduct.honors }}</p>
        </div>
      </div>

      <!-- 生产规模 -->
      <div v-if="brandProduct.productionScale" class="detail-description">
        <div class="detail-description-inner">
          <h2 class="description-title">生产规模</h2>
          <p class="description-text">{{ brandProduct.productionScale }}</p>
        </div>
      </div>

      <!-- 额外段落 -->
      <div v-for="(section, index) in brandProduct.extraSections" :key="'extra-' + index" class="detail-description">
        <div class="detail-description-inner">
          <h2 class="description-title">{{ section.title }}</h2>
          <p class="description-text">{{ section.content }}</p>
          <p v-if="section.source" class="description-source">来源：{{ section.source }}</p>
        </div>
      </div>
    </div>

    <FooterSection />
  </div>
</template>