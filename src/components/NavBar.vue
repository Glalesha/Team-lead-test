<template>
  <b-navbar>
    <template slot="start">
      <b-navbar-item
        ><b-button tag="router-link" :to="{ name: 'posts' }"
          >Posts</b-button
        ></b-navbar-item
      >
    </template>
    <template slot="end">
      <b-navbar-item
        ><b-button tag="router-link" :to="{ name: 'login' }" type="is-primary"
          >log in
        </b-button></b-navbar-item
      >
    </template>
  </b-navbar>
</template>

<script>
export default {};
</script>

<style></style>
