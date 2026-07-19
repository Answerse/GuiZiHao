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
</script>

<template>
  <div class="detail-page">
    <Header alwaysWhite />
    <!-- 面包屑导航 -->
    <div class="detail-breadcrumb">
      <div class="breadcrumb-content">
        <img src="/images/breadcrumb-home.svg" class="breadcrumb-home-icon" alt="首页">
        <router-link to="/" class="breadcrumb-item">首页</router-link>
        <img src="/images/breadcrumb-chevron.svg" class="breadcrumb-chevron" alt=">">
        <router-link to="/" class="breadcrumb-item">农产品品牌</router-link>
        <img src="/images/breadcrumb-chevron.svg" class="breadcrumb-chevron" alt=">">
        <span class="breadcrumb-item breadcrumb-current">{{ brandProduct.fullName }}</span>
      </div>
    </div>

    <!-- 主图 + 信息 -->
    <div class="detail-hero">
      <div class="detail-hero-inner">
        <div class="detail-main-image brand-product-detail-image">
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
          <div class="detail-purchase" v-if="brandProduct.contact">
            <span class="purchase-section-title">联系方式</span>
            <button class="purchase-btn purchase-btn-primary">{{ brandProduct.contact }}</button>
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

    <FooterSection />
  </div>
</template>