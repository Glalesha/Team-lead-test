<template>
  <b-navbar
    class="is-primary navbar-container"
    transparent
    wrapper-class="container"
  >
    <template slot="start">
      <b-navbar-item tag="router-link" :to="{ name: 'posts' }"
        ><a class="button">
          Посты
        </a>
      </b-navbar-item>
    </template>

    <template slot="end">
      <b-navbar-item v-if="userRole === 'writer'"
        ><a class="button" @click="createNewPost"
          >Создать новый пост</a
        ></b-navbar-item
      >
      <b-navbar-item
        v-if="userRole !== 'notAuthorized'"
        @click="logout"
        type="is-info"
        ><a class="button is-info">log out</a></b-navbar-item
      ><b-navbar-item
        v-else
        tag="router-link"
        :to="{ name: 'login' }"
        type="is-info"
        ><a class="button is-info">log in </a>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({ userRole: (state) => state.user.role }),
  },

  methods: {
    logout() {
      this.$router.push({ name: "home" });
      this.$store.dispatch("logout");
    },

    createNewPost() {
      this.$router.push({ name: "createPost" });
    },
  },
};
</script>

<style scoped lang="scss">
.navbar-container {
  margin-bottom: 50px;
}
</style>
