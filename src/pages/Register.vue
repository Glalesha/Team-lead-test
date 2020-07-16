<template>
  <div class="is-mobile register-form-container">
    <form @submit.prevent="performRegister" class="register-form">
      <b-field
        label="Логин"
        :type="{ 'is-danger': $v.login.$error }"
        :message="[
          {
            'Некорректный логин': !$v.login.email && $v.login.$error,
          },
          { 'Требуется ввести логин': !$v.login.required && $v.login.$error },
        ]"
      >
        <b-input
          @blur="$v.login.$touch()"
          v-model="login"
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

      <b-radio v-model="role" name="role" native-value="reader"
        >Читатель</b-radio
      >
      <b-radio v-model="role" name="role" native-value="writer"
        >Редактор</b-radio
      >

      <p class="control">
        <b-button
          :disabled="$v.$invalid"
          tag="input"
          native-type="submit"
          class="button is-primary"
        >
          регистрация
        </b-button>
      </p>

      <p>
        Уже есть аккаунт?
        <router-link :to="{ name: 'login' }">Войдите</router-link>
      </p>

      <p v-if="$v.$anyError" class="has-text-danger">
        Пожалуйста, заполните все необходимые поля
      </p>
    </form>

    <b-notification
      :active.sync="showErrorNotification"
      class="notifation is-danger"
    >
      Пользователь с таким логином уже существует
    </b-notification>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { required, email, minLength } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      login: "",
      password: "",
      role: "",
      showErrorNotification: false,
    };
  },

  validations: {
    login: {
      email,
      required,
    },

    password: {
      mingLength: minLength(6),
      required,
    },

    role: {
      required,
    },
  },

  computed: {
    ...mapState({
      userRole: (state) => state.user.role,
    }),
  },

  methods: {
    performRegister() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$store
          .dispatch("register", {
            login: this.login,
            password: this.password,
            role: this.role,
            id: Math.ceil(Math.random() * 10000000),
          })
          .then(() => {
            this.login = "";
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
.register-form-container {
  max-width: 540px;
  margin-top: 200px;
  margin-left: auto;
  margin-right: auto;
}

.register-form {
  margin-bottom: 50px;
}
</style>
