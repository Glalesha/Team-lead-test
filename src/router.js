import Vue from "vue";
import Router from "vue-router";
import PostsList from "./pages/PostsList";
import Login from "./pages/Login";
import Home from "./pages/Home";
import EditPost from "./pages/EditPost";

Vue.use(Router);

const router = new Router({
  mode: "history",

  routes: [
    {
      path: "/posts",
      name: "posts",
      component: PostsList,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "edit-post",
      name: "editPost",
      component: EditPost,
      props: true,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem("user");

  if (to.matched.some((record) => record.meta.requiresAuth) && !loggedIn) {
    next("/");
  } else {
    next();
  }
});

export default router;
