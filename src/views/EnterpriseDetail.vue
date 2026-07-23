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
                <span class="meta-value">{{ enterprise.category }}</span>
              </div>
              <div class="detail-meta-row" v-if="enterprise.region">
                <span class="meta-label">所属地区：</span>
                <span class="meta-value">{{ enterprise.region }}</span>
              </div>
              <div class="detail-meta-row" v-if="enterprise.mainProduct">
                <span class="meta-label">主营产品：</span>
                <span class="meta-value">{{ enterprise.mainProduct }}</span>
              </div>
              <div class="detail-meta-row" v-if="enterprise.contact">
                <span class="meta-label">联系方式：</span>
                <span class="meta-value">{{ enterprise.contact }}</span>
              </div>
              <div class="detail-meta-row" v-if="enterprise.address">
                <span class="meta-label">公司地址：</span>
                <span class="meta-value">{{ enterprise.address }}</span>
              </div>
              <div class="detail-meta-row" v-if="enterprise.updateDate">
                <span class="meta-label">更新日期：</span>
                <span class="meta-value">{{ enterprise.updateDate }}</span>
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

      <!-- 品牌背景 -->
      <div v-if="enterprise.brandBackground" class="detail-description">
        <div class="detail-description-inner">
          <h2 class="description-title">品牌背景</h2>
          <p class="description-text">{{ enterprise.brandBackground }}</p>
        </div>
      </div>

      <!-- 核心产品 -->
      <div v-if="enterprise.coreProducts" class="detail-description">
        <div class="detail-description-inner">
          <h2 class="description-title">核心产品</h2>
          <p class="description-text">{{ enterprise.coreProducts }}</p>
        </div>
      </div>

      <!-- 生产规模 -->
      <div v-if="enterprise.productionScale" class="detail-description">
        <div class="detail-description-inner">
          <h2 class="description-title">生产规模</h2>
          <p class="description-text">{{ enterprise.productionScale }}</p>
        </div>
      </div>

      <!-- 质量认证 -->
      <div v-if="enterprise.qualityCertification" class="detail-description">
        <div class="detail-description-inner">
          <h2 class="description-title">质量认证</h2>
          <p class="description-text">{{ enterprise.qualityCertification }}</p>
        </div>
      </div>

      <!-- 荣誉资质 -->
      <div v-if="enterprise.honors" class="detail-description">
        <div class="detail-description-inner">
          <h2 class="description-title">荣誉资质</h2>
          <p class="description-text">{{ enterprise.honors }}</p>
        </div>
      </div>

      <!-- 额外段落 -->
      <div v-for="(section, index) in enterprise.extraSections" :key="'extra-' + index" class="detail-description">
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
