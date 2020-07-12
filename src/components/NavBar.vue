<template>
  <b-navbar>
    <template slot="start">
      <b-navbar-item
        ><b-button tag="router-link" :to="{ name: 'posts' }"
          >Posts</b-button
        ></b-navbar-item
      >
    </template>
    <template slot="end">
      <b-navbar-item
        ><b-button v-if="loggedIn" @click="logout" type="is-primary"
          >log out</b-button
        ><b-button
          v-else
          tag="router-link"
          :to="{ name: 'login' }"
          type="is-primary"
          >log in
        </b-button></b-navbar-item
      >
    </template>
  </b-navbar>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({ loggedIn: (state) => state.user.role !== "notAuthorized" }),
  },

  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.push({ name: "home" });
    },
  },
};
</script>

<style></style>
