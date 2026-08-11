<script setup lang="ts">
import BaseModal from './BaseModal.vue'

interface ContactInfo {
  company: string
  contact: string
  phone: string
  mobile: string
  address: string
  email: string
}

defineProps<{
  modelValue: boolean
  title: string
  contactInfo: ContactInfo | null
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

// 联系方式展示顺序，与原始弹窗保持一致
const contactItems = [
  { label: '企业名称', key: 'company', icon: 'company' },
  { label: '联系人', key: 'contact', icon: 'contact' },
  { label: '联系电话', key: 'phone', icon: 'phone' },
  { label: '手机号码', key: 'mobile', icon: 'mobile' },
  { label: '电子邮箱', key: 'email', icon: 'email' },
  { label: '公司地址', key: 'address', icon: 'address' }
] as const

function onUpdate(value: boolean) {
  emit('update:modelValue', value)
}
</script>

<template>
  <BaseModal :model-value="modelValue" :title="title" @update:model-value="onUpdate">
    <div class="detail-contact-card">
      <div v-for="item in contactItems" :key="item.key" class="detail-contact-row">
        <!-- 企业名称 -->
        <svg v-if="item.icon === 'company'" class="detail-contact-icon" width="32" height="32" viewBox="0 0 20 20" fill="none">
          <rect x="3" y="2" width="14" height="16" rx="2" stroke="currentColor" stroke-width="1.5" />
          <path d="M3 6h14" stroke="currentColor" stroke-width="1.5" />
          <path d="M7 10h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
          <path d="M7 13h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
        </svg>
        <!-- 联系人 -->
        <svg v-else-if="item.icon === 'contact'" class="detail-contact-icon" width="32" height="32" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="5.5" r="3.5" stroke="currentColor" stroke-width="1.5" />
          <path d="M3 18c0-3.5 3.5-6 7-6s7 2.5 7 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
        </svg>
        <!-- 联系电话 -->
        <svg v-else-if="item.icon === 'phone'" class="detail-contact-icon" width="32" height="32" viewBox="0 0 20 20" fill="none">
          <path d="M17.5 14.5v2a1.5 1.5 0 01-1.5 1.5A13 13 0 012 4a1.5 1.5 0 011.5-1.5h2A1.5 1.5 0 017 3.5c.12.93.4 1.83.82 2.68a1.5 1.5 0 01-.34 1.63l-.7.7a10.5 10.5 0 005 5l.7-.7a1.5 1.5 0 011.63-.34c.85.42 1.75.7 2.68.82A1.5 1.5 0 0117.5 14.5z" stroke="currentColor" stroke-width="1.5" />
        </svg>
        <!-- 手机号码 -->
        <svg v-else-if="item.icon === 'mobile'" class="detail-contact-icon" width="32" height="32" viewBox="0 0 20 20" fill="none">
          <path d="M17.5 14.5v2a1.5 1.5 0 01-1.5 1.5A13 13 0 012 4a1.5 1.5 0 011.5-1.5h2A1.5 1.5 0 017 3.5c.12.93.4 1.83.82 2.68a1.5 1.5 0 01-.34 1.63l-.7.7a10.5 10.5 0 005 5l.7-.7a1.5 1.5 0 011.63-.34c.85.42 1.75.7 2.68.82A1.5 1.5 0 0117.5 14.5z" stroke="currentColor" stroke-width="1.5" />
          <path d="M14 2.5a4 4 0 014 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
          <path d="M14 5.5a1 1 0 011 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
        </svg>
        <!-- 电子邮箱 -->
        <svg v-else-if="item.icon === 'email'" class="detail-contact-icon" width="32" height="32" viewBox="0 0 20 20" fill="none">
          <rect x="2" y="3.5" width="16" height="13" rx="2" stroke="currentColor" stroke-width="1.5" />
          <path d="M2 7l8 5 8-5" stroke="currentColor" stroke-width="1.5" />
        </svg>
        <!-- 公司地址 -->
        <svg v-else class="detail-contact-icon" width="32" height="32" viewBox="0 0 20 20" fill="none">
          <path d="M10 18s6-5.5 6-9.5a6 6 0 10-12 0c0 4 6 9.5 6 9.5z" stroke="currentColor" stroke-width="1.5" />
          <circle cx="10" cy="8.5" r="2" stroke="currentColor" stroke-width="1.5" />
        </svg>
        <div class="detail-contact-content">
          <span class="detail-contact-label">{{ item.label }}</span>
          <span class="detail-contact-value">{{ contactInfo?.[item.key] }}</span>
        </div>
      </div>
    </div>

    <template #footer>
      <slot name="footer" />
    </template>
  </BaseModal>
</template>
