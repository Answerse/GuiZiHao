<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Header from '@/components/Header.vue'
import FooterSection from '@/components/FooterSection.vue'
import { products } from '@/data/products'

const route = useRoute()
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
</script>

<template>
  <div class="detail-page">
    <Header alwaysWhite />
    <div class="detail-body">
      <!-- 面包屑导航 -->
      <div class="detail-breadcrumb">
        <div class="breadcrumb-content">
          <img src="/images/breadcrumb-home.svg" class="breadcrumb-home-icon" alt="首页">
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
              <button class="purchase-btn purchase-btn-primary">货源联系方式</button>
              <button class="purchase-btn purchase-btn-outline">去网点购买</button>
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
    </div>

    <FooterSection />
  </div>
</template>
