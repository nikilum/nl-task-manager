<template>
  <div class="d-flex align-center gutter-x-1 user-profile">
    <n-avatar :src="src" round :size="size" object-fit="cover" :style="`height: ${size}px; min-width: ${size}px; min-height: ${size}px;`" />
    <div class="user-profile__name" v-if="name">{{ name }}</div>
  </div>
</template>

<script setup>
defineProps({
  name: {
    type: String,
    default: null
  },
  src: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    default: 32,
  }
})
</script>

<style scoped lang="scss">
.user-profile {
  min-width: 0;
  width: 100%;

  &__name {
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
  }
}
</style>