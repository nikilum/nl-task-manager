import $axios from "@/axios";

export default {
    async changePriority(data) {
        return await $axios.patch(`/projects/${data.project_id}/tasks/${data.id}/priority`, data);
    },
    async changeEstimate(data) {
        return await $axios.patch(`/projects/${data.project_id}/tasks/${data.id}/estimate`, data)
    },
    async addTime(data) {
        return await $axios.post(`/projects/${data.project_id}/tasks/${data.id}/time`, data)
    },
    async getTracksHistory(data) {
        return await $axios.post(`/projects/${data.project_id}/tasks/${data.id}/tracks`, data)
    }
}
