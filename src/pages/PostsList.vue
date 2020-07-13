<template>
  <div class="box">
    <ul class="post-list">
      <li class="post-item" v-for="post in posts" :key="post.id">
        <PostCard :post="post" />
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
import PostCard from "../components/PostCard";

export default {
  components: {
    PostCard,
  },

  computed: {
    ...mapState(["posts"]),
  },

  created() {
    this.$store.dispatch("fetchPosts");
  },
};
</script>

<style scoped lang="scss">
.post-item:not(:last-child) {
  margin-bottom: 50px;
}
</style>
