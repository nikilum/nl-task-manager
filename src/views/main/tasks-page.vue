<template>
  <div class="tasks-table">
    <n-h1>Мои задачи</n-h1>
    <n-card>
      <n-collapse>
        <n-collapse-item title="SPRINT 11">
          <div class="gutter-y-4">
            <n-collapse>
              <n-collapse-item class="tasks-table__collapse" v-for="table of formattedData" :title="table.status">
                <template #header>
                  <div class="d-flex align-start">
                    <n-tag class="table-tag pointer" :color="{ textColor: table.status_color }"
                           :style='generateBackground(table)' :bordered="false">
                      {{ table.status }}
                    </n-tag>
                    <span class="ml-3 tasks-table__tasks">Кол-во задач: {{ table.items.length }}</span>
                  </div>
                </template>
                <n-data-table scroll-x class="tasks-table" :columns="tasksTableColumns" :data="table.items"/>
              </n-collapse-item>
            </n-collapse>
          </div>
        </n-collapse-item>
      </n-collapse>
    </n-card>
  </div>
</template>

<script setup>
import createColumns from '@/assets/js/tables/tasksTable/columns'
import data from '@/assets/js/tables/tasksTable/data'
import hexToRgb from '@/assets/js/helpers/hexToRgb'
import {computed, ref} from "vue";
import {useLoadingBar, useMessage} from "naive-ui";

const loading = useLoadingBar()
const message = useMessage()

const startingData = ref(data)

const statuses = startingData.value
    .filter((item1, pos, arr) => arr.findIndex((item2) => item2.status === item1.status) === pos)
    .map(({status, status_color}) => ({status, status_color}));

const formattedData = computed(() => {
  let result = []

  statuses.forEach(({status, status_color}) => {
    const items = startingData.value.filter((item) => item.status === status)

    result.push({items, status, status_color})
  })

  return result
})

const tasksTableColumns = createColumns(startingData, loading, message)

function generateBackground(table) {
  const rgb = hexToRgb(table.status_color)

  return `background: rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.2)`
}
</script>

<style scoped lang="scss" src="@/assets/scss/tasks-table.scss"></style>
<style scoped lang="scss" src="@/assets/scss/table-tag.scss"></style>

<style scoped lang="scss">
.tasks-table {
  &__collapse {
    :deep(.n-collapse-item__content-wrapper) {
      margin-left: 22px;
    }

    :deep(.n-collapse-item__content-wrapper .n-collapse-item__content-inner) {
      padding-top: 0;
    }
  }

  &__tasks {
    font-size: 16px;
  }

  :deep(th.n-data-table-th) {
    font-size: 16px;
    background: transparent !important;
    padding: 4px 0 4px 12px !important;
  }

  :deep(td.n-data-table-td) {
    font-size: 16px;
    padding: 4px 0 4px 12px !important;
  }

  :deep(.n-data-table-thead) {
    background: none !important;
  }
}
</style>
