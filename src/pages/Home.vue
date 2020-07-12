<template>
  <div class="container has-text-centered has-text-primary">
    <h1 class="is-size-1">Добро пожаловать в medium!</h1>
    <p v-if="loggedIn" class="is-size-3">
      Чтобы использовать это приложение, необходимо выполнить вход
    </p>

    <p v-else class="is-size-3"></p>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      loggedIn: (state) => state.user.role !== "notAuthorized",
    }),
  },
};
</script>

<style>
h1 {
  margin-top: 200px;
}
</style>
