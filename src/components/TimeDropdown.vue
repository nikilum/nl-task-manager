<template>
  <n-popover
      trigger="manual"
      placement="bottom"
      class="time-dropdown"
      style="width: 360px; max-width: 360px"
      :show="showPopover"
      @clickoutside="closePopover()"
  >
    <template #trigger>
      <slot name="trigger" :open="openPopover">
        <ItemWithHourglass @click="openPopover" class="time-dropdown__hourglass-time">{{ triggerTime }}</ItemWithHourglass>
      </slot>
    </template>

    <div class="my-1">
      <!-- TODO ДОБАВИТЬ ВОЗМОЖНОСТЬ РЕДАКТИРОВАТЬ УДАЛЯТЬ ВРЕМЕННЫЕ ИТЕМЫ -->
      <template v-if="!isEstimate">
        <TimeDropdownHistory ref="scrollbarRef" :id="id" :project_id="project_id" />
        <n-hr />
      </template>
      <n-form class="gutter-y-2" :show-label="false" :show-feedback="false" ref="formRef" :model="modelRef">
        <n-form-item path="time">
          <n-auto-complete
              :clearable="true"
              size="small"
              v-model:value="modelRef.time"
              :input-props="{ autocomplete: 'disabled' }"
              :options="options"
              placeholder="Укажите время. Например, 1д 10ч 21м"
          />
        </n-form-item>
        <div class="d-flex gutter-x-1">
          <n-button secondary size="tiny" class="flex-100" @click="closePopover()">Закрыть</n-button>
          <n-button
              type="primary"
              size="tiny"
              :disabled="!modelRef.time"
              class="flex-100"
              @click="!modelRef.time ? '' : handleValidateButtonClick()"
          >
            {{ isEstimate ? "Сохранить" : "Добавить" }}
          </n-button>
        </div>
      </n-form>
    </div>
  </n-popover>
</template>

<script setup>
import {computed, ref} from "vue";
import ItemWithHourglass from "./ItemWithHourglass.vue";
import {useLoadingBar, useMessage} from 'naive-ui';
import $api from '../API/_api.js'
import TimeDropdownHistory from "./TimeDropdownHistory.vue";

const props = defineProps({
  triggerTime: {
    type: String,
    default: ""
  },
  isEstimate: {
    type: Boolean,
    default: false,
  },
  id: {
    type: [String, Number],
    required: true,
  },
  project_id: {
    type: [String, Number],
    required: true,
  }
})

const message = useMessage()
const loading = useLoadingBar()

const showPopover = ref(false)
const scrollbarRef = ref(null)
const modelRef = ref({
  time: props.isEstimate ? props.triggerTime : ""
})

const options = computed(() => {
  const timeString = modelRef.value.time.trim()
  const timeStringArray = timeString.split(' ').filter(Boolean)
  const currentStringItem = getLastItem(timeStringArray)
  const prevStringItem = timeStringArray[timeStringArray.length - 2]

  let result = []

  if (!Number(currentStringItem)) {
    return []
  }

  if (timeStringArray.length === 1) {
    ["ч", "м", "д", "с"].forEach((item) => result.push(currentStringItem + item))
    return result
  }

  switch (getLastItem(prevStringItem)) {
    case "д":
      ["ч", "м", "с"].forEach((item) => result.push(timeString + item));
      break;
    case "ч":
      ["м", "с"].forEach((item) => result.push(timeString + item));
      break;
    case "м":
      result.push(timeString + "с");
      break;
  }

  return result
})
const formattedModelRef = computed(() => {

})

function openPopover() {
  if (props.isEstimate) {
    modelRef.value.time = props.triggerTime
  }

  showPopover.value = true
}
function closePopover() {
  showPopover.value = false

  setTimeout(() => {
    modelRef.value.time = ''

    if (!props.isEstimate) {
      console.log(scrollbarRef.value)
    }

  }, 150)
}
async function handleValidateButtonClick() {
  const data = Object.assign({}, formattedModelRef.value)
  loading.start()

  if (props.isEstimate) {
    try {
      const r = await $api.TASKS.changeEstimate(data)
      closePopover()
      loading.finish()
    } catch (e) {
      loading.error()
      message.error(e?.response?.data?.error ?? "Неизвестная ошибка, попробуйте позже");
    }

    return
  }

  try {
    const r = await $api.TASKS.addTime(data)
    closePopover()
    loading.finish()
  } catch (e) {
    loading.error()
    message.error(e?.response?.data?.error ?? "Неизвестная ошибка, попробуйте позже");
  }
}

function getLastItem(array) {
  return array[array.length - 1]
}
</script>

<style lang="scss" scoped>
.time-dropdown {
  &__time {
    font-size: 14px;
    white-space: nowrap;
  }
}
</style>
