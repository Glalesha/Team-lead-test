<template>
  <section class="section">
    <form @submit.prevent="login">
      <b-field
        label="Логин"
        :type="{ 'is-danger': $v.email.$error }"
        :message="[
          {
            'Некорректный логин': !$v.email.email && $v.email.$error,
          },
          { 'Требуется ввести логин': !$v.email.required && $v.email.$error },
        ]"
      >
        <b-input
          @blur="$v.email.$touch()"
          v-model="email"
          type="email"
        ></b-input>
      </b-field>

      <b-field label="Пароль" :type="{ 'is-danger': $v.email.$error }">
        <b-input v-model="password" type="password"></b-input>
      </b-field>

      <p class="control">
        <button :disabled="$v.$invalid" type="submit" class="button is-primary">
          Войти
        </button>
      </p>

      <p v-if="$v.$invalid">
        Пожалуйста, заполните все необходимые поля
      </p>
    </form>
  </section>
</template>

<script>
import { required, email  } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },

  validations: {
    email: {
      email,
      required,
    },

    password: {
      required,
    },
  },

  methods: {
    login() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$store.dispatch("login", {
          email: this.email,
          password: this.password,
        });

        this.email = "";
        this.password = "";
      }
    },
  },
};
</script>

<style></style>
