import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    posts: [],
    user: {
      role: "notAuthorized",
    },
  },

  getters: {
    getPost: (state) => (id) => {
      return state.posts.find((item) => {
        return item.id === id;
      });
    },
  },

  mutations: {
    SET_POSTS(state, posts) {
      state.posts = posts;
    },

    CHANGE_CLAPS(state, { id, clap }) {
      state.posts = state.posts.map((item) => {
        if (item.id === id) {
          item.claps += clap;
        }
        return item;
      });
    },

    SET_USER_DATA(state, userData) {
      state.user = userData;
      localStorage.setItem("user", JSON.stringify(userData));
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${userData.token}`;
    },

    CLEAR_USER_DATA(state) {
      localStorage.removeItem("user");
      (state.user = {
        role: "notAuthorized",
      }),
        (axios.defaults.headers.common["Authorization"] = null);
    },

    UPDATE_POST(state, newPosts) {
      state.posts = newPosts;
    },
  },

  actions: {
    fetchPosts({ commit }) {
      axios.get("http://localhost:3000/posts").then((res) => {
        commit("SET_POSTS", res.data.posts);
      });
    },

    changeClaps({ commit, state }, { clap, id }) {
      if (state.user.role === "reader") {
        if (clap) {
          clap = 1;
        } else {
          clap = -1;
        }

        axios
          .post(`http://localhost:3000/posts/${id}`, {
            clap,
            userId: state.user.id,
          })
          .then(() => {
            commit("CHANGE_CLAPS", { id, clap });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        console.log("you can't do this action");
      }
    },

    login({ commit }, { login, password }) {
      return axios
        .post("http://localhost:3000/login", { login, password })
        .then(({ data }) => {
          commit("SET_USER_DATA", data);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    register({ commit }, credentials) {
      return axios
        .post("http://localhost:3000/register", credentials)
        .then(({ data }) => {
          data;
          commit("SET_USER_DATA", data);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    logout({ commit }) {
      commit("CLEAR_USER_DATA");
    },

    deletePost({ commit, state }, id) {
      state.user.role;
      if (state.user.role === "writer") {
        axios.delete(`http://localhost:3000/posts/${id}`).then((res) => {
          commit("SET_POSTS", res.data.posts);
        });
      } else {
        console.log("you can't do this action");
      }
    },

    updatePost({ commit, state }, { newPost, id }) {
      if (state.user.role === "writer") {
        123;
        return axios
          .put(`http://localhost:3000/posts/${id}`, newPost)
          .then((res) => {
            res;
            commit("UPDATE_POST", res.data.posts);
          });
      } else {
        console.log("you can't do this action");
      }
    },
  },
});
