<script setup>
import { ref } from "vue";
import AppNavbar from "@/components/AppNavbar.vue";
import AppSidebar from "@/components/AppSidebar/AppSidebar.vue";

const sidebarCollapsed = ref(false);
const windowWidth = ref(getWindowWidth());

function getWindowWidth() {
  return window.innerWidth;
}

window.addEventListener("resize", function () {
  updateMobile();
});

function updateMobile() {
  const currentWidth = getWindowWidth();

  windowWidth.value = currentWidth;

  if (currentWidth < 768) {
    sidebarCollapsed.value = true;
    return;
  }

  sidebarCollapsed.value = false;
}

updateMobile();
</script>

<template>
  <div class="panel">
    <n-layout position="absolute">
      <AppNavbar @collapse="sidebarCollapsed = !sidebarCollapsed" />
      <n-layout class="panel__body" has-sider position="absolute">
        <AppSidebar :collapsed="sidebarCollapsed" :window-width="windowWidth" />
        <n-layout
            :content-style="
            windowWidth < 768
              ? 'padding: 20px;'
              : 'padding: 32px 32px 32px 32px'
          "
            :native-scrollbar="false"
        >
          <RouterView />
        </n-layout>
      </n-layout>
    </n-layout>
  </div>
</template>

<style scoped lang="scss">
.panel {
  height: 100%;
  position: relative;

  &__body {
    height: calc(100% - 60px);
    top: 60px !important;
    background: red;
  }
}
</style>
