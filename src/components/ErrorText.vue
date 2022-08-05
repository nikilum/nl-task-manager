<template>
  <div class="justify-center align-center flex-column">
    <n-text class="error-text flex-column align-center mb-3" depth="3">
      <n-icon class="mb-1" size="32">
        <Warning />
      </n-icon>
      <slot/>
    </n-text>
    <n-button tertiary size="tiny" type="error" @click="$emit('try-again')"><slot name="buttonText" /></n-button>
  </div>
</template>

<style scoped lang="scss">
.error-text {
  font-size: 14px;
}
</style>

<script setup>
import {Warning} from "@vicons/ionicons5"

defineEmits()
</script>