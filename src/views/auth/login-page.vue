<template>
  <n-form ref="formRef" :model="modelRef" :rules="rules" class="form">
    <n-form-item path="email" label="Электронная почта">
      <n-input
        v-model:value="modelRef.email"
        type="email"
        placeholder="Укажите свою почту"
        @keydown.enter="
          !modelRef.email || !modelRef.password
            ? ''
            : handleValidateButtonClick()
        "
      />
    </n-form-item>
    <n-form-item path="password" label="Пароль">
      <n-input
        v-model:value="modelRef.password"
        type="password"
        placeholder="Укажите пароль"
        @keydown.enter="
          !modelRef.email || !modelRef.password
            ? ''
            : handleValidateButtonClick()
        "
      />
    </n-form-item>
    <n-button
      class="w-100"
      :disabled="!modelRef.email || !modelRef.password"
      size="medium"
      type="primary"
      @click="handleValidateButtonClick"
    >
      Войти
    </n-button>
  </n-form>
</template>

<script setup>
import { ref } from "vue";
import { useLoadingBar, useMessage } from "naive-ui";
import $api from "@/API/_api";
import { useRouter } from "vue-router";
import { useCookies } from "vue3-cookies";

const formRef = ref(null);
const message = useMessage();
const router = useRouter();
const { cookies } = useCookies();
const loading = useLoadingBar();
const modelRef = ref({
  email: null,
  password: null,
});

const rules = {
  email: [
    {
      required: true,
      trigger: ["input", "blur"],
      message: "Пожалуйста, укажите свою почту",
    },
  ],
  password: [
    {
      required: true,
      trigger: ["input", "blur"],
      message: "Пожалуйста, укажите пароль",
    },
  ],
};

function handleValidateButtonClick() {
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      loading.start();

      try {
        const r = await $api.AUTH.login(modelRef.value)

        const token = r.data.token;
        cookies.set('task-manager_auth', token);
        message.success("Удачного использования!");
        loading.finish();

        await router.push({name: "main-tasks"})
      } catch (e) {
        loading.error();
        message.error(e?.response?.data?.error ?? "Неизвестная ошибка, попробуйте позже");
      }

      return
    }
    message.error("Перепроверьте отправляемые данные");
  });
}
</script>

<style scoped></style>
