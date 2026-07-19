<script setup>
import { ref } from 'vue'

const activeRegion = ref(0)
const regions = [
  '全部', '自治区', '南宁市', '柳州市', '桂林市', '梧州市', '北海市', '防城港市',
  '钦州市', '贵港市', '玉林市', '百色市', '贺州市', '河池市', '来宾市', '崇左市'
]

function selectRegion(index) {
  activeRegion.value = index
}
</script>

<template>
  <div class="region-section">
    <div class="region-content">
      <div class="region-tags">
        <div v-for="(region, index) in regions" :key="index" :class="['region-tag', { active: activeRegion === index }]" @click="selectRegion(index)">{{ region }}</div>
      </div>
    </div>
  </div>
</template>
