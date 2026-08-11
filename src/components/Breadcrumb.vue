<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { RouteLocationRaw } from 'vue-router'

withDefaults(
  defineProps<{
    items: { label: string; to?: RouteLocationRaw }[]
    showBack?: boolean
    backIcon?: string
  }>(),
  {
    showBack: true,
    backIcon: '/icons/arrow-back-green.svg'
  }
)

const router = useRouter()

function onBack() {
  router.go(-1)
}
</script>

<template>
  <div class="detail-breadcrumb">
    <div class="breadcrumb-row">
      <button v-if="showBack" class="back-btn" @click="onBack" aria-label="后退">
        <img :src="backIcon" class="back-btn-icon" alt="">
      </button>
      <div class="breadcrumb-items">
        <template v-for="(item, index) in items" :key="index">
          <router-link
            v-if="item.to"
            :to="item.to"
            class="breadcrumb-item"
          >{{ item.label }}</router-link>
          <span
            v-else
            class="breadcrumb-item"
            :class="{ 'breadcrumb-current': index === items.length - 1 }"
          >{{ item.label }}</span>
          <img
            v-if="index < items.length - 1"
            src="/images/breadcrumb-chevron.svg"
            class="breadcrumb-chevron"
            alt=">"
          >
        </template>
      </div>
    </div>
  </div>
</template>
