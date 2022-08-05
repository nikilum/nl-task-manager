<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import sidebarConfig from "@/components/AppSidebar/sidebar-config";

const props = defineProps({
  collapsed: {
    type: Boolean,
    required: true,
  },
  windowWidth: {
    type: Number,
    required: true,
  },
});
const route = useRoute();

// Computed

const sidebarPosition = computed(() => {
  if (props.windowWidth < 454) {
    return "absolute";
  }

  if (props.windowWidth < 768) {
    return "absolute";
  }

  return props.windowWidth < 454 ? "absolute" : "static";
});

// Variables

const menuOptions = ref(sidebarConfig);
const currentPage = computed(() => route.name);
console.log(currentPage.value)
</script>

<template>
  <n-layout-sider
    :width="windowWidth < 454 ? '0' : '60px'"
    v-if="windowWidth < 768"
  />
  <n-layout-sider
    :collapsed="props.collapsed"
    bordered
    collapse-mode="width"
    :position="sidebarPosition"
    :native-scrollbar="false"
    :content-style="props.collapsed ? '' : 'padding: 4px 5px 0 0;'"
    :collapsed-width="windowWidth < 454 ? 0 : 60"
    :width="windowWidth < 454 ? '100%' : 272"
  >
    <n-menu
      :value="currentPage"
      :options="menuOptions"
      :collapsed="props.collapsed"
      :collapsed-width="60"
      :collapsed-icon-size="22"
    />
  </n-layout-sider>
</template>
