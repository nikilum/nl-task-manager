import $axios from "@/axios";

const API_BLOCK_PREFIX = "/auth";

export default {
    async login(data) {
        return await $axios.post(url("/login"), data);
    },
    async register(data) {
        return await $axios.post(url("/register"), data);
    },
};

function url(path) {
    return API_BLOCK_PREFIX + path;
}
