import $api from '@/API/_api'

export default async function (data, row, newPriority, loading, message) {
    if (row.priority === newPriority) return

    const itemIndex = data.value.findIndex((item) => item.id === row.id)

    loading.start();

    try {
        await $api.TASKS.changePriority({id: row.id, project_id: row.project_id, status: newPriority})

        loading.finish();
        data.value[itemIndex].priority = newPriority
    } catch (e) {
        loading.error();

        message.error(e?.response?.data?.error ?? "Неизвестная ошибка, попробуйте позже");
    }
}
