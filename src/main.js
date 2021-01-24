import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "../src/assets/css/base.css";
import "@/vantui/vantui";
import "vant/lib/index.css";
Vue.config.productionTip = false;
Vue.prototype.$bus=new Vue()
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
