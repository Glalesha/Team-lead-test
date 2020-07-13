<template>
  <div class="box">
    <div class="card">
      <header class="card-header">
        <b-field
          :type="{ 'is-danger': $v.title.$error }"
          :message="[{ 'У поста должно быть название': $v.title.$error }]"
          ><b-input
            type="text"
            class="card-header-title"
            v-model="title"
          ></b-input
        ></b-field>
      </header>

      <div class="card-content">
        <div class="content">
          <b-field
            :type="{ 'is-danger': $v.description.$error }"
            :message="[
              { 'У поста должно быть описание': $v.description.$error },
            ]"
            ><b-input
              type="textarea"
              class="card-header-title"
              v-model="description"
            ></b-input
          ></b-field>
        </div>
      </div>

      <footer class="card-footer">
        <div class="level card-footer-item">
          <div class="level-left"></div>
          <div class="level-right">
            <b-button class="level-item" rounded @click="save" type="is-info"
              >Сохранить</b-button
            >
            <b-button
              class="level-item"
              rounded
              @click="cancel"
              type="is-danger"
              >Отмена</b-button
            >
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";

export default {
  props: ["id"],

  data() {
    return {
      title: this.$store.getters.getPost(this.id).title,
      description: this.$store.getters.getPost(this.id).description,
    };
  },

  validations: {
    title: {
      required,
    },

    description: {
      required,
    },
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
      this.$v.title.$touch();
      this.$v.description.$touch();

      if (this.$v.$error) return;
      this.$store
        .dispatch("updatePost", {
          newPost: { title: this.title, description: this.description },
          id: this.id,
        })
        .then(this.$router.push({ name: "posts" }));
    },
  },
};
</script>

<style></style>
