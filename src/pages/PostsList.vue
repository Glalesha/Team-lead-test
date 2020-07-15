<template>
  <div>
    <div v-if="posts.length > 10" class="block">
      <b-pagination
        :total="posts.length"
        per-page="10"
        :current.sync="currentPage"
      ></b-pagination>
    </div>
    <transition-group name="list" tag="ul" class="post-list">
      <li class="post-item" v-for="post in currentPosts" :key="post.id">
        <PostCard :post="post" />
      </li>
    </transition-group>
  </div>
</template>

<script>
import { mapState } from "vuex";
import PostCard from "../components/PostCard";

export default {
  components: {
    PostCard,
  },

  data() {
    return {
      currentPage: 1,
    };
  },

  computed: {
    ...mapState(["posts"]),

    currentPosts() {
      return this.posts.slice(
        (this.currentPage - 1) * 10,
        this.currentPage * 10
      );
    },
  },
};
</script>

<style scoped lang="scss">
.post-item {
  max-width: 720px;
  margin: auto;

  &:not(:last-child) {
    margin-bottom: 50px;
  }
}

.a {
  height: 200px;
}
</style>
