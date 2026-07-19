<script setup lang="ts">
import { ref } from 'vue'
import HeroSection from '@/components/HeroSection.vue'
import RecommendSection from '@/components/RecommendSection.vue'
import ProductSection from '@/components/ProductSection.vue'
import FooterSection from '@/components/FooterSection.vue'

const activeTab = ref(0)
</script>

<template>
  <div class="home-page">
    <HeroSection v-model:activeTab="activeTab" />
    <RecommendSection :activeTab="activeTab" />
    <ProductSection :activeTab="activeTab" />
    <FooterSection />
  </div>
</template>
