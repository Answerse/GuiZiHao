<script setup lang="ts">
defineProps<{
  src: string
}>()
</script>

<template>
  <div class="chenpitong-iframe-wrapper">
    <iframe
      class="chenpitong-iframe"
      :src="src"
      frameborder="0"
      allowfullscreen
    ></iframe>
  </div>
</template>

<style scoped>
.chenpitong-iframe-wrapper {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.chenpitong-iframe {
  width: 100%;
  height: 100%;
  border: none;
}
</style>