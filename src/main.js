import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import plural from "./assets/filters/plural";
import Vuelidate from "vuelidate";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { dom } from "@fortawesome/fontawesome-svg-core";
// import axios from "axios";

dom.watch();

library.add(fas);
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.use(Vuelidate);

Vue.config.productionTip = false;

Vue.filter("plural", plural);

Vue.use(Buefy, {
  defaultIconPack: "fa",
});

new Vue({
  store,
  router,
  created() {
    const userString = localStorage.getItem("user");
    if (userString) {
      const userData = JSON.parse(userString);
      this.$store.commit("SET_USER_DATA", userData);
    }
    // axios.interceptors.response.use(
    //   (response) => response,
    //   (error) => {
    //     if (error.response.status === 401) {
    //       this.$store.dispatch("logout");
    //     }
    //     return Promise.reject(error);
    //   }
    // );
  },
  render: (h) => h(App),
}).$mount("#app");
