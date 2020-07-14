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

    CLEAR_USER_DATA() {
      localStorage.removeItem("user");
      location.reload();
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
            userLogin: state.user.login,
          })
          .then(() => {
            console.log(state.user);
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

    logout({ commit }) {
      commit("CLEAR_USER_DATA");
    },

    deletePost({ commit, state }, id) {
      if (state.user.role !== "writer") {
        axios.delete(`http://localhost:3000/posts/${id}`).then((res) => {
          commit("SET_POSTS", res.data.posts);
        });
      } else {
        console.log("you can't do this action");
      }
    },

    updatePost({ commit, state }, { newPost, id }) {
      if (state.user.role !== "writer") {
        return axios
          .put(`http://localhost:3000/posts/${id}`, newPost)
          .then((res) => {
            commit("UPDATE_POST", res.data.posts);
          });
      } else {
        console.log("you can't do this action");
      }
    },
  },
});
