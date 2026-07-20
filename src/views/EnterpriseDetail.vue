<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Header from '@/components/Header.vue'
import FooterSection from '@/components/FooterSection.vue'
import { enterprises } from '@/data/enterprises'

const route = useRoute()
const enterprise = computed(() => {
  const id = Number(route.params.id)
  return enterprises.find(e => e.id === id) || enterprises[0]
})
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
          <router-link :to="{ name: 'Home', query: { tab: 1 } }" class="breadcrumb-item">农业企业品牌</router-link>
          <img src="/images/breadcrumb-chevron.svg" class="breadcrumb-chevron" alt=">">
          <span class="breadcrumb-item breadcrumb-current">{{ enterprise.name }}</span>
        </div>
      </div>

      <!-- 主图 + 信息 -->
      <div class="detail-hero">
        <div class="detail-hero-inner">
          <div class="detail-main-image enterprise-detail-image">
            <img :src="enterprise.logo" :alt="enterprise.name">
          </div>
          <div class="detail-info">
            <h1 class="detail-product-title">{{ enterprise.name }}</h1>
            <div class="detail-meta">
              <div class="detail-meta-row">
                <span class="meta-label">品牌类别：</span>
                <span class="meta-value">农业企业品牌</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 企业介绍 -->
      <div class="detail-description">
        <div class="detail-description-inner">
          <h2 class="description-title">企业介绍</h2>
          <p class="description-text">{{ enterprise.description }}</p>
        </div>
      </div>
    </div>

    <FooterSection />
  </div>
</template>