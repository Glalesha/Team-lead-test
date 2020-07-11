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
      <div  class="level card-footer-item" >
        <div class="level-left">
          <time class="level-item">{{ post.createdAt }}</time>
        </div>
        <div class="level-right">
          <b-button class="level-item"
            ><img class="clapIcon" src="../assets/img/clap-icon.svg"
          /></b-button>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      default: () => {},
    },
  },

  created() {
    console.log(this.post);
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
