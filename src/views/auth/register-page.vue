<template>
  <n-form ref="formRef" :model="modelRef" :rules="rules" class="form">
    <n-form-item path="name" label="Имя (никнейм)">
      <n-input
        v-model:value="modelRef.name"
        type="text"
        placeholder="Укажите своё имя"
        @keydown.enter="
          !modelRef.email || !modelRef.name ? '' : handleValidateButtonClick()
        "
      />
    </n-form-item>
    <n-form-item path="email" label="Электронная почта">
      <n-input
        v-model:value="modelRef.email"
        type="email"
        placeholder="Укажите свою почту"
        @keydown.enter="
          !modelRef.email || !modelRef.name ? '' : handleValidateButtonClick()
        "
      />
    </n-form-item>
    <n-button
      class="w-100"
      :disabled="!modelRef.email || !modelRef.name"
      size="medium"
      type="primary"
      @click="handleValidateButtonClick"
    >
      Зарегистрироваться
    </n-button>
  </n-form>
</template>

<script setup>
import { ref } from "vue";
import { useMessage, useLoadingBar } from "naive-ui";
import $api from "@/API/_api";
import { useRouter } from "vue-router";

const formRef = ref(null);
const router = useRouter();
const message = useMessage();
const loading = useLoadingBar();
const modelRef = ref({
  email: null,
  name: null,
});

const rules = {
  email: [
    {
      required: true,
      trigger: ["input", "blur"],
      message: "Проверьте, корректно ли введена почта",
      validator: (a) => {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
          modelRef.value.email
        );
      },
    },
  ],
  name: [
    {
      required: true,
      trigger: ["input", "blur"],
      message: "Пожалуйста, укажите имя (никнейм)",
    },
  ],
};

function handleValidateButtonClick() {
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      loading.start();

      try {
        await $api.AUTH.register(modelRef.value)

        message.success(
            "Вы успешно зарегистрированы! Теперь проверьте почту и войдите в свой аккаунт."
        );
        await router.push({
          name: "auth-login",
        });
        loading.finish();

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
