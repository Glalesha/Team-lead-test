<template>
  <div class="container has-text-centered has-text-dark container-welcome">
    <h1 class="title is-size-1">Добро пожаловать в medium!</h1>
    <p class="subtitle is-size-3">{{ subtitleText }}</p>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      userRole: (state) => state.user.role,
    }),

    subtitleText() {
      if (this.userRole === "notAuthorized") {
        return "Пока вы не войдете в аккаунт, вы можете только просматривать посты";
      } else if (this.userRole === "reader") {
        return "Вы вошли как читатель. Вы можете просматривать посты, а также ставить им оценки";
      } else {
        return "Вы вошли как редактор. Вы можете просматривать посты, изменять и удалять их";
      }
    },
  },
};
</script>

<style scoped lang="scss">
.container-welcome {
  margin-top: 200px;
}
</style>
