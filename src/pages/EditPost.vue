<template>
  <div class="card">
    <header class="card-header">
      <b-input
        type="text"
        class="card-header-title"
        v-model="newPost.title"
      ></b-input>
    </header>

    <div class="card-content">
      <div class="content">
        <b-input
          type="text"
          class="card-header-title"
          v-model="newPost.description"
        ></b-input>
      </div>
    </div>

    <footer class="card-footer">
      <div class="level card-footer-item">
        <div class="level-right">
          <b-button class="level-item" rounded @click="save"
            >Сохранить</b-button
          >
          <b-button class="level-item" rounded @click="cancel">Отмена</b-button>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  props: ["id"],

  data() {
    return {
      newPost: {
        title: this.post && this.post.title,
        description: this.post && this.post.description,
      },
    };
  },

  computed: {
    post() {
      return this.$store.getters.getPost(this.id);
    },
  },

  methods: {
    cancel() {
      this.$router.push({ name: "posts" });
    },

    save() {
      this.$store
        .dispatch("updatePost", {
          newPost: this.newPost,
          id: this.id,
        })
        .then(this.$router.push({ name: "posts" }));
    },
  },
};
</script>

<style></style>
