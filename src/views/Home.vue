<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import HeroSection from '@/components/HeroSection.vue'
import RecommendSection from '@/components/RecommendSection.vue'
import ProductSection from '@/components/ProductSection.vue'
import FooterSection from '@/components/FooterSection.vue'

const route = useRoute()
const activeTab = ref(0)

onMounted(() => {
  const tabParam = Number(route.query.tab)
  if (!isNaN(tabParam) && tabParam >= 0 && tabParam <= 2) {
    activeTab.value = tabParam
  }
})
</script>

<template>
  <div class="home-page">
    <HeroSection v-model:activeTab="activeTab" />
    <RecommendSection :activeTab="activeTab" />
    <ProductSection :activeTab="activeTab" />
    <FooterSection />
  </div>
</template>
