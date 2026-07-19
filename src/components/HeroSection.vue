<script setup>
import Header from './Header.vue'

defineProps({
  activeTab: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['update:activeTab'])

const tabs = ['区域公用品牌', '农业企业品牌', '农产品品牌']

function selectTab(index) {
  emit('update:activeTab', index)
}
</script>

<template>
  <div class="hero-section">
    <Header :activeTab="activeTab" @tabChange="selectTab" />
    <div class="hero-main">
      <div class="hero-bg">
        <img src="/images/hero-bg-figma.png" class="hero-bg-image" alt="背景图">
        <div class="hero-gradient"></div>
      </div>
      <div class="inner">
        <div class="hero-content">
          <div class="hero-text">
            <h1 class="hero-title">汇聚八桂优品</h1>
            <p class="hero-subtitle">广西优质农产品品牌平台</p>
          </div>
        </div>
        <div class="hero-filter">
          <div class="hero-filter-tabs">
            <div v-for="(tab, i) in tabs" :key="i" :class="['hero-tab', { active: activeTab === i }]" @click="selectTab(i)">{{ tab }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>