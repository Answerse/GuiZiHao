<script setup lang="ts">
import { watch } from 'vue'

const props = defineProps<{
  modelValue: boolean
  title?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'close'): void
}>()

function close() {
  emit('update:modelValue', false)
  emit('close')
}

// 打开时禁止背景滚动，关闭时恢复
watch(
  () => props.modelValue,
  (open) => {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = open ? 'hidden' : ''
    }
  }
)
</script>

<template>
  <Teleport to="body">
    <div v-if="modelValue" class="detail-overlay" @click="close" />
    <div v-if="modelValue" class="detail-modal" role="dialog" aria-modal="true">
      <button class="detail-modal-close" type="button" aria-label="关闭" @click="close">
        <img src="/icons/close-icon.svg" alt="关闭">
      </button>

      <h2 v-if="title" class="detail-modal-title">{{ title }}</h2>

      <slot />

      <div v-if="$slots.footer" class="detail-modal-footer">
        <slot name="footer" />
      </div>
    </div>
  </Teleport>
</template>
