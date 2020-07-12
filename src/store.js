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
          .post(`http://localhost:3000/posts/${id}`, { clap })
          .then(() => {
            commit("CHANGE_CLAPS", { id, clap });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        console.log("you can't do it action");
      }
    },

    login({ commit }, { email, password }) {
      return axios
        .post("http://localhost:3000/login", { email, password })
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

    deletePost({ commit }, id) {
      axios.delete(`http://localhost:3000/posts/${id}`).then((res) => {
        console.log(res.data.posts);
        commit("SET_POSTS", res.data.posts);
      });
    },
  },
});
