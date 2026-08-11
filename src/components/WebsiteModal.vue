<script setup lang="ts">
import BaseModal from './BaseModal.vue'

defineProps<{
  modelValue: boolean
  title: string
  url?: string
  screenshot?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'go'): void
}>()

function onUpdate(value: boolean) {
  emit('update:modelValue', value)
}

function go() {
  emit('go')
}
</script>

<template>
  <BaseModal :model-value="modelValue" :title="title" @update:model-value="onUpdate">
    <template v-if="url && screenshot">
      <div class="detail-website-preview">
        <img class="detail-website-screenshot" loading="lazy" :src="screenshot" alt="电商网站截图">
      </div>
      <a class="detail-website-url" :href="url" target="_blank" rel="noopener">
        <span class="detail-url-label">网址：</span>
        <span class="detail-url-value">{{ url }}</span>
      </a>
    </template>

    <div v-else class="detail-website-empty">
      <svg class="detail-empty-icon" width="64" height="64" viewBox="0 0 64 64" fill="none">
        <rect x="8" y="12" width="48" height="40" rx="4" stroke="currentColor" stroke-width="2" fill="none" />
        <path d="M8 20h48" stroke="currentColor" stroke-width="2" />
        <circle cx="14" cy="16.5" r="1.5" fill="currentColor" />
        <circle cx="19" cy="16.5" r="1.5" fill="currentColor" />
        <circle cx="24" cy="16.5" r="1.5" fill="currentColor" />
        <path d="M26 36l6-6 6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M38 34l4-4 4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M26 42l6-6 6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      <div class="detail-empty-title">电商网站正在建设中</div>
      <div class="detail-empty-desc">该品牌电商网站正在筹备中，敬请期待</div>
    </div>

    <template #footer>
      <template v-if="url">
        <button class="detail-modal-btn detail-modal-btn-outline" type="button" @click="onUpdate(false)">关闭</button>
        <button class="detail-modal-btn detail-modal-btn-primary" type="button" @click="go">前往</button>
      </template>
      <button v-else class="detail-modal-btn detail-modal-btn-outline" type="button" @click="onUpdate(false)">关闭</button>
    </template>
  </BaseModal>
</template>
