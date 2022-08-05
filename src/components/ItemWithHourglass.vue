<template>
  <div class="d-flex align-center justify-center pointer item-with-hourglass">
    <n-icon size="16" class="mr-1">
      <hourglass-outline />
    </n-icon>
    <span class="item-with-hourglass__time">
      <slot />
    </span>
  </div>
</template>

<script setup>
import { HourglassOutline } from '@vicons/ionicons5'
</script>

<style lang="scss" scoped>
.item-with-hourglass {
  &__time {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}
</style>