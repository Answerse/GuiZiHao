<script setup lang="ts">
defineProps<{
  title: string
  description: string
}>()
</script>

<template>
  <div class="brand-card">
    <div class="brand-card-image">
      <img src="/images/product-card.webp" alt="Product Image" />
    </div>
    <div class="brand-card-content">
      <h3 class="brand-card-title">{{ title }}</h3>
      <p class="brand-card-description">{{ description }}</p>
      <div class="brand-card-footer">
        <span class="brand-card-view-more">了解更多</span>
        <img src="/icons/arrow-right.svg" alt="Arrow" class="brand-card-arrow-icon" />
      </div>
    </div>
  </div>
</template>