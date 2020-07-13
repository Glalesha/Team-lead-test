<template>
  <div class="hero is-small is-primary navbar-container">
    <div class="hero-body">
      <div class="container">
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
              ><b-button v-if="loggedIn" @click="logout" type="is-info"
                >log out</b-button
              ><b-button
                v-else
                tag="router-link"
                :to="{ name: 'login' }"
                type="is-info"
                >log in
              </b-button></b-navbar-item
            >
          </template>
        </b-navbar>
      </div>
    </div>
  </div>
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

<style scoped lang="scss"></style>
