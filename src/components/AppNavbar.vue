<script setup>
import {
  ExitOutline as ExitIcon,
  MenuOutline as MenuIcon,
} from "@vicons/ionicons5";
import { ref } from "vue";

const emit = defineEmits(["collapse"]);

let collapsed = ref(false);

function collapse() {
  collapsed = !collapsed.value;
  emit("collapse");
}
</script>

<template>
  <n-layout-header class="header" bordered>
    <div class="header__inner">
      <div class="align-center gutter-x-2">
        <n-button text type="primary" @click="collapse">
          <n-icon size="32">
            <menu-icon />
          </n-icon>
        </n-button>
      </div>
      <n-button tertiary type="error" size="small">
        <template #icon>
          <n-icon>
            <exit-icon />
          </n-icon>
        </template>
        Выход
      </n-button>
    </div>
  </n-layout-header>
</template>

<style scoped lang="scss">
.header {
  height: 60px;

  &__inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    padding: 0 32px;
  }
}

@media (max-width: 768px) {
  .header {
    &__name {
      display: none;
    }
    &__inner {
      padding: 0 16px;
    }
  }
}
</style>
