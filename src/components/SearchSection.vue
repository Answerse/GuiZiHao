<script setup>
import { ref } from 'vue'

const searchText = ref('')
</script>

<template>
  <div class="search-section">
    <div class="search-box">
      <div class="search-icon">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <circle cx="14" cy="14" r="10" stroke="rgba(16, 18, 21, 0.5)" stroke-width="2"/>
          <path d="M23 23L27 27" stroke="rgba(16, 18, 21, 0.5)" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </div>
      <input type="text" class="search-input" v-model="searchText" placeholder="请输入关键词搜索">
    </div>
  </div>
</template>
