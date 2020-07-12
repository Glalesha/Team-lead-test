<template>
  <div class="card">
    <header class="card-header">
      <b-input
        type="text"
        class="card-header-title"
        :value="post.title"
      ></b-input>
    </header>

    <div class="card-content">
      <div class="content">
        <b-input
          type="text"
          class="card-header-title"
          :value="post.desctiption"
        ></b-input>
      </div>
    </div>

    <footer class="card-footer">
      <div class="level card-footer-item">
        <div class="level-right">
          <b-button
            class="level-item"
            rounded
            :type="{ 'is-success': clap, disabled: userRole !== 'reader' }"
            @click="save"
            >Сохранить</b-button
          >
          <b-button
            class="level-item"
            rounded
            :type="{ 'is-success': clap, disabled: userRole !== 'reader' }"
            @click="cancel"
            >Отмена</b-button
          >
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  props: ["id"],

  computed: {
    post() {
      return this.$store.getters.getPost(this.id);
    },
  },

  methods: {
    cancel() {
      this.$router.push({name: 'posts'})
    }
  }
};
</script>

<style></style>
