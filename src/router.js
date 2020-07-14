import Vue from "vue";
import Router from "vue-router";
import PostsList from "./pages/PostsList";
import Login from "./pages/Login";
import Home from "./pages/Home";
import PostForm from "./pages/PostForm";

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
  const isWriter =
    localStorage.getItem("user") &&
    JSON.parse(localStorage.getItem("user")).role === "writer";

  if (to.matched.some((record) => record.meta.requiresRole) && !isWriter) {
    next("/");
  } else {
    next();
  }
});

export default router;
