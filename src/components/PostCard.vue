<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">{{ post.title }}</p>
    </header>

    <div class="card-content">
      <div class="content">
        {{ post.description }}
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
          <b-button
            class="level-item"
            :type="{ 'is-success': clap }"
            @click="changeClap"
            ><img class="clapIcon" src="../assets/img/clap-icon.svg"
          /></b-button>
          <span>{{ post.claps }}</span>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
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
  },

  methods: {
    changeClap() {
      this.clap = !this.clap;

      this.$store.dispatch("changeClaps", {
        clap: this.clap,
        id: this.post.id,
      });
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
