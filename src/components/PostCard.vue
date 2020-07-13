<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">{{ post.title }}</p>
    </header>

    <div class="card-content">
      <div class="content">
        <p class="">{{ post.description }}</p>
      </div>
    </div>

    <footer class="card-footer">
      <div class="level card-footer-item">
        <div class="level-left">
          <time class="level-item"
            >{{ postCreatedAgo }}
            {{ postCreatedAgo | plural(["день", "дней", "дней"]) }} назад</time
          >
        </div>
        <div class="level-right">
          <template v-if="userRole === 'writer'">
            <b-button
              class="level-item"
              tag="router-link"
              :to="{ name: 'editPost', params: { id: post.id } }"
              >Редактировать</b-button
            >
            <b-button @click="deletePost" class="level-item" type="is-danger"
              >Удалить</b-button
            >
          </template>

          <b-button
            :disabled="userRole !== 'reader'"
            class="level-item"
            :type="{ 'is-success': clap, disabled: userRole !== 'reader' }"
            @click="changeClap"
            icon-left="sign-language"
            rounded
          ></b-button>
          <span>{{ post.claps }}</span>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      clap: false,
    };
  },

  props: {
    post: {
      type: Object,
      default: () => {},
    },
  },

  computed: {
    postCreatedAgo() {
      let postDate = new Date(this.post.createdAt);
      let daysAgo = Math.ceil((Date.now() - postDate) / (60 * 60 * 24 * 1000));
      return daysAgo;
    },

    ...mapState({
      userRole: (state) => state.user.role,
    }),
  },

  methods: {
    changeClap() {
      this.clap = !this.clap;

      this.$store.dispatch("changeClaps", {
        clap: this.clap,
        id: this.post.id,
      });
    },

    deletePost() {
      this.$store.dispatch("deletePost", this.post.id);
    },
  },
};
</script>

<style scoped>
.clapIcon {
  display: block;
  width: 30px;
  height: 30px;
}
</style>
