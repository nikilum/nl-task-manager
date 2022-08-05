import axios from "axios";

const $axios = axios.create({
  baseURL: "http://api.devserver",
  timeout: 60000,
});

export default $axios;
