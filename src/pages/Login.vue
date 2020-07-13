<template>
  <div class="container is-mobile is-two-fifths login-form-container">
    <form @submit.prevent="login" class="login-form">
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

      <b-field
        label="Пароль"
        :type="{ 'is-danger': $v.password.$error }"
        :message="[
          {
            'Пароль должен быть не меньше 6 символов':
              !$v.password.minLenght && $v.password.$error,
          },
        ]"
      >
        <b-input
          @blur="$v.password.$touch()"
          v-model="password"
          type="password"
        ></b-input>
      </b-field>

      <p class="control">
        <b-button
          :disabled="$v.$invalid"
          tag="input"
          native-type="submit"
          class="button is-primary"
        >
          Войти
        </b-button>
      </p>

      <p v-if="$v.$anyError" class="has-text-danger">
        Пожалуйста, заполните все необходимые поля
      </p>
    </form>

    <b-notification
      :active.sync="showErrorNotification"
      class="notifation is-danger"
    >
      Логин или пароль введены не верно
    </b-notification>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { required, email, minLength } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      email: "",
      password: "",
      showErrorNotification: false,
    };
  },

  validations: {
    email: {
      email,
      required,
    },

    password: {
      mingLength: minLength(6),
      required,
    },
  },

  computed: {
    ...mapState({
      userRole: (state) => state.user.role,
    }),
  },

  methods: {
    login() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$store
          .dispatch("login", {
            email: this.email,
            password: this.password,
          })
          .then(() => {
            this.email = "";
            this.password = "";

            if (this.userRole !== "notAuthorized") {
              this.$router.push({ name: "home" });
            } else {
              this.$v.$reset();
              this.showErrorNotification = true;
            }
          });
      }
    },
  },
};
</script>

<style scoped lang="scss">
.login-form-container {
  margin-top: 200px;
}

.login-form {
  margin-bottom: 50px;
}

.is-two-fifths {
  max-width: 540px;
}
</style>
