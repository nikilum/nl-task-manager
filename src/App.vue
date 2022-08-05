<script setup lang="ts">
import {useCookies} from "vue3-cookies";
import {darkTheme} from "naive-ui"

const theme = {
  common: {
    primaryColor: "#FF6600ff",
    primaryColorHover: "#FF8330FF",
    primaryColorPressed: "#D55500FF",
    primaryColorSuppl: "#FF8330FF",
    borderRadiusSmall: "2px",
    borderRadius: "3px",
    fontSize: "18px",
    fontSizeMini: "16px",
    fontSizeTiny: "14px",
    fontSizeSmall: "16px",
    fontSizeMedium: "18px",
    fontSizeLarge: "20px",
    fontSizeHuge: "24px",
    fontWeight: "500",
    fontWeightStrong: "600",
  },
  Button: {
    heightTiny: "32px",
    heightSmall: "36px",
    heightMedium: "42px",
    heightLarge: "50px",
    paddingTiny: "0 12px",
    paddingSmall: "0 16px",
    paddingMedium: "0 20px",
    paddingLarge: "0 24px",
  },
  Tabs: {
    tabFontSizeMedium: "1",
    tabFontWeightActive: "600",
    tabFontWeight: "500",
  },
  Input: {
    heightTiny: "32px",
    heightSmall: "36px",
    heightMedium: "42px",
    heightLarge: "50px",
    fontSizeMedium: "16px",
    fontSizeLarge: "18px",
    fontSizeSmall: "14px",
    fontSizeTiny: "14px",
  },
  Card: {
    borderRadius: "8px",
  },
};
</script>

<template>
  <n-config-provider abstract inline-theme-disabled :theme-overrides="theme" lang="ruRU">
    <n-loading-bar-provider>
      <n-message-provider>
        <RouterView />
      </n-message-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<style src="@/assets/scss/_app.scss" lang="scss"></style>
