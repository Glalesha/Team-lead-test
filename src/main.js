import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import plural from "./assets/filters/plural";
import Vuelidate from 'vuelidate'

Vue.use(Vuelidate)

Vue.config.productionTip = false;

Vue.filter("plural", plural);

Vue.use(Buefy);

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
