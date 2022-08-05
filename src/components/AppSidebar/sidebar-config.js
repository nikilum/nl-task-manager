import {
  HomeOutline as HomeIcon,
  PeopleOutline as PeopleIcon,
  ImagesOutline as ImagesIcon,
  CardOutline as CardIcon,
} from "@vicons/ionicons5";
import { h } from "vue";
import { NIcon } from "naive-ui";
import { RouterLink } from "vue-router";

// Sidebar menu config starts here

export default [
  {
    label: renderRouterLink("Задачи", "main-tasks"),
    key: "main-tasks",
    icon: renderIcon(HomeIcon),
  },
  {
    key: "divider-1",
    type: "divider",
  },
  // {
  //   label: renderRouterLink("Telegram аккаунты", "panel-accounts"),
  //   key: "panel-accounts",
  //   icon: renderIcon(PeopleIcon),
  // },
  // {
  //   label: renderRouterLink("Запросы", "panel-requests"),
  //   key: "panel-requests",
  //   icon: renderIcon(ImagesIcon),
  // },
  // {
  //   label: renderRouterLink("Opensea", "panel-opensea"),
  //   key: "panel-opensea",
  //   icon: renderIcon(CardIcon),
  // },
];

function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) });
}
function renderRouterLink(text, name) {
  return () => h(RouterLink, { to: { name } }, { default: () => text });
}
