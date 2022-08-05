<template>
  <div>
    <n-scrollbar trigger="none" style="max-height: 149px;" ref="scrollbarRef">
      <div class="time-dropdown-history__item" :key="index" v-for="(track, index) of tracks"
           v-if="tracks.length && !errors"
           :style="index % 2 === 0 ? `background-color: ${themeVars.codeColor}` : ''">
        <div class="justify-between align-center gutter-x-2">
          <UserProfile :name="track.user.name" :src="track.user.avatar_24"/>
          <div class="d-flex align-center gutter-x-1">
            <TimeDropdown :is-estimate="true" :id="id" :project_id="project_id">
              <template v-slot:trigger="slotProps">
                <n-button tertiary size="tiny" circle @click="slotProps.open">
                  <template #icon>
                    <n-icon>
                      <Pencil/>
                    </n-icon>
                  </template>
                </n-button>
              </template>
            </TimeDropdown>
            <n-button tertiary size="tiny" circle type="error">
              <template #icon>
                <n-icon>
                  <Trash/>
                </n-icon>
              </template>
            </n-button>
          </div>
        </div>
        <div class="justify-between mt-1">
          <n-text :depth="3" class="time-dropdown-history__time">{{ track.date }}</n-text>
          <n-text :depth="3" class="time-dropdown-history__time">{{ millisecondsToTime(track.time) }}</n-text>
        </div>
      </div>
      <ErrorText @try-again="tryAgain" v-else>
        <template #buttonText>Загрузить повторно</template>
        Ошибка загрузки истории треков
      </ErrorText>
    </n-scrollbar>
    <template v-if="dataSum">
      <n-hr />
      <div class="time-dropdown-history__sum">
        Сумма за задачу: {{ millisecondsToTime(dataSum) }}
      </div>
    </template>
  </div>
</template>

<script setup>
import UserProfile from "./UserProfile.vue";
import {Pencil, Trash} from '@vicons/ionicons5';
import millisecondsToTime from '../assets/js/helpers/millisecondsToTime.js'
import {useMessage, useThemeVars} from 'naive-ui';
import $api from '../API/_api.js'
import testData from '../assets/js/dropdowns/estimateDropdown/items.js'
import {computed, ref} from "vue";
import ErrorText from "./ErrorText.vue";
import TimeDropdown from "./TimeDropdown.vue";

const props = defineProps({
  project_id: {
    type: Number,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  }
})

const themeVars = useThemeVars()
const message = useMessage()

const tracks = ref([])
const errors = ref(false)

getHistoryData()

const dataSum = computed(() => {
  const tracksSum = tracks.value.map(({time}) => time)

  if (!tracksSum.length) {
    return 0
  }

  return  tracksSum.reduce((accumulator, item) => accumulator + item)
})

async function getHistoryData() {
  try {
    // const r = await $api.TASKS.getTracksHistory({id: props.id, project_id: props.project_id})
    tracks.value = testData
  } catch (e) {
    message.error(e?.response?.data?.error ?? "Неизвестная ошибка загрузки истории треков.");
    errors.value = true
  }
}

function tryAgain() {
  errors.value = false
  getHistoryData()
}

</script>

<style lang="scss" scoped>
.time-dropdown-history {
  &__item {
    padding: 8px 16px;
    border-radius: 4px;
  }

  &__time {
    font-size: 14px;
    white-space: nowrap;
  }
  &__sum {
    font-size: 14px;
    line-height: 14px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}
</style>