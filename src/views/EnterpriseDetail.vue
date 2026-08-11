<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import Header from '@/components/Header.vue'
import FooterSection from '@/components/FooterSection.vue'
import Breadcrumb from '@/components/Breadcrumb.vue'
import ContactModal from '@/components/ContactModal.vue'
import WebsiteModal from '@/components/WebsiteModal.vue'
import { enterprises } from '@/data/enterprises'

const route = useRoute()
const enterprise = computed(() => {
  const id = Number(route.params.id)
  return enterprises.find(e => e.id === id) || enterprises[0]
})

// 弹窗状态
const showContactModal = ref(false)
const showPurchaseModal = ref(false)

// 拟真联系方式
const contactInfo = computed(() => {
  const e = enterprise.value
  const region = e.region || '广西'
  const name = e.name || ''
  return {
    company: e.name || `${region}农业科技有限公司`,
    contact: '陈经理',
    phone: '0771-5812xxx',
    mobile: '139 7886 9xxx',
    address: e.address || `广西${region}产业园区A区1号`,
    email: 'info@' + name.slice(0, 2) + 'agri.cn'
  }
})

function openContactModal() {
  showContactModal.value = true
}

function openPurchaseModal() {
  showPurchaseModal.value = true
}
</script>

<template>
  <div class="detail-page">
    <Header alwaysWhite />
    <div class="detail-body">
      <!-- 面包屑导航 -->
      <Breadcrumb :items="[
        { label: '首页', to: '/' },
        { label: '农业企业品牌', to: { name: 'Home', query: { tab: 1 } } },
        { label: enterprise.name }
      ]" />

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
            <div class="detail-purchase">
              <span class="purchase-section-title">购买方式</span>
              <button class="purchase-btn purchase-btn-primary" @click="openContactModal">货源联系方式</button>
              <button class="purchase-btn purchase-btn-outline" @click="openPurchaseModal">浏览电商网站</button>
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

    <ContactModal
      v-model="showContactModal"
      :title="enterprise.name"
      :contact-info="contactInfo"
    >
      <template #footer>
        <button class="detail-modal-btn detail-modal-btn-outline" type="button" @click="showContactModal = false">关闭</button>
        <button class="detail-modal-btn detail-modal-btn-primary" type="button">立刻联系</button>
      </template>
    </ContactModal>

    <WebsiteModal
      v-model="showPurchaseModal"
      :title="enterprise.name"
    />

    <FooterSection />
  </div>
</template>
