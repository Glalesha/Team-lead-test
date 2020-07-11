import Vue from "vue";
import Router from "vue-router";
import Posts from "./pages/Posts";
import Login from "./pages/Login"

Vue.use(Router);

export default new Router({
  mode: "history",

  routes: [
    {
      path: "/",
      name: "posts",
      component: Posts,
    },
{
    path: '/login',
    name: "login",
    component: Login
}
  ],
});
