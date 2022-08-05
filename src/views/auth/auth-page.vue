<template>
  <div class="auth-page">
    <n-card class="auth-page__card">
      <n-tabs
        type="line"
        v-model:value="currentTab"
        animated
        class="auth-page__tabs"
        size="large"
        justify-content="space-evenly"
      >
        <n-tab-pane name="register" tab="Регистрация" />
        <n-tab-pane name="login" tab="Вход" />
      </n-tabs>
      <RouterView />
    </n-card>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const currentTab = computed({
  get() {
    const pathArr = route.path.split("/").filter(Boolean);
    return pathArr[pathArr.length - 1];
  },
  set(newVal) {
    router.push(newVal);
  },
});
</script>

<style scoped lang="scss">
.auth-page {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  &__card {
    max-width: 400px;
  }
}
</style>
