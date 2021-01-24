import axios from "axios";
import Vue from "vue";
import { Notify } from "vant";
const instance = axios.create({
  baseURL: "https://api.shop.eduwork.cn/",
  timeout: 5000
});
instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }

    return config;
  },
  err => {
    return Promise.reject(err);
  }
);
instance.interceptors.response.use(
  res => {
    return res.data ? res.data : res;
  },
  err => {
    // console.log(err.response.data);
    // Vue.prototype.$notify(
    //   err.response.data.errors[Object.keys(err.response.data.errors)[0]][0]
    // );
    Notify(
      err.response.data.errors[Object.keys(err.response.data.errors)[0]][0]
    );
    return Promise.reject(err);
  }
);
export default instance;
