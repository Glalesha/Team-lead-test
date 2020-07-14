<template>
  <div class="container">
    <transition-group name="list" tag="ul" class="post-list">
      <li class="post-item" v-for="post in posts" :key="post.id">
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
      arr: [
        { id: 1, title: "afsfsd" },
        { id: 2, title: "asfdh" },
        { id: 3, title: "afsfsd" },
        { id: 4, title: "afsfsd" },
      ],
    };
  },

  computed: {
    ...mapState(["posts"]),
  },

  methods: {
    deletePost(id) {
      this.arr = this.arr.filter((item) => {
        return item.id !== id;
      });
      // this.arr.sort(() => Math.random() - 0.5);
    },
  },
};
</script>

<style scoped lang="scss">
.post-item:not(:last-child) {
  margin-bottom: 50px;
}

.a {
  height: 200px;
}
</style>
