import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    posts: [],
  },

  getters: {
    getPost(state, id) {
      return state.posts.findIndex((item) => {
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
  },

  actions: {
    fetchPosts({ commit }) {
      axios.get("http://localhost:3000/posts").then((res) => {
        commit("SET_POSTS", res.data.posts);
      });
    },

    changeClaps({ commit }, { clap, id }) {
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
    },

    login({ commit }, { email, password }) {
      axios
        .post("http://localhost:3000/login", { email, password })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
      commit;
    },
  },
});
