<template>
  <div id="app">
    <NavBar />

    <transition name="fade" mode="out-in"
      ><router-view></router-view
    ></transition>
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";

export default {
  components: {
    NavBar,
  },

  created() {
    this.$store.dispatch("fetchPosts");
  },
};
</script>

<style lang="scss">
.list-enter {
  transform: translateY(10px);
  opacity: 0;
}

.list-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

.list-enter-active {
  transition: all 0.2s ease;
}

.list-leave-active {
  transition: all 0.2s ease;
  position: absolute;
  width: 100%;
}

.list-move {
  transition: transform 1s;
}
</style>
