import Vue from "vue";
import Router from "vue-router";
import PostsList from "./pages/PostsList";
import Login from "./pages/Login";
import Home from "./pages/Home";
import PostForm from "./pages/PostForm";
import Register from "./pages/Register";

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
      path: "/register",
      name: "register",
      component: Register,
    },
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/create-post",
      name: "createPost",
      component: PostForm,
      meta: { requiresRole: "writer" },
    },
    {
      path: "/edit-post/:id",
      name: "editPost",
      component: PostForm,
      props: true,
      meta: { requiresRole: "writer" },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const userRole =
    localStorage.getItem("user") &&
    JSON.parse(localStorage.getItem("user")).role;

  if (
    to.matched.some((record) => {
      return record.meta.requiresRole && record.meta.requiresRole !== userRole;
    })
  ) {
    next("/");
  } else {
    next();
  }
});

export default router;
