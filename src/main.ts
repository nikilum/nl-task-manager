import { createApp } from "vue";
import { createPinia } from "pinia";
import naive from "naive-ui";
import { globalCookiesConfig } from "vue3-cookies";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

globalCookiesConfig({
    expireTimes: "1y",
    secure: true,
    sameSite: "Strict",
});

app.use(createPinia());
app.use(router);
app.use(naive);

app.mount("#app");
