<template>
  <v-layout align-center fill-height justify-center class="grey lighten-5">
    <v-flex xs9 sm7 md5 lg3>
      <v-card elevation="10">
        <v-card-title>
          <v-img src="/logo-color.png" width="1000"/>
        </v-card-title>
        <v-card-text>
          <form>
            <v-text-field
              v-model="email"
              label="Email"
              hint="Write a valid email"
              append-icon="mdi-account-outline"
              :error-messages="emailErrors"
              background-color="transparent"
              autofocus
            ></v-text-field>

            <v-text-field
              v-model="password"
              :append-icon="
                showPassword ? 'mdi-eye-outline' : 'mdi-eye-off-outline'
              "
              :type="showPassword ? 'text' : 'password'"
              name="input-10-1"
              label="Contraseña"
              @click:append="showPassword = !showPassword"
              @keyup.enter.native="submit()"
              :error-messages="passwordErrors"
              background-color="transparent"
            ></v-text-field>

            <v-btn
              block
              depressed
              large
              color="primary"
              class="mt-5"
              :disabled="$v.$invalid"
              :loading="loading"
              @click="submit()"
            >Acceder
            </v-btn
            >
          </form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import {validationMixin} from "vuelidate";
import {required, email} from "vuelidate/lib/validators";

export default {
  middleware: "guest",
  layout: "guest",
  mixins: [validationMixin],
  validations: {
    email: {required, email},
    password: {required},
  },
  data: () => ({
    loading: false,
    showPassword: false,
    email: "",
    password: "",
  }),
  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.required && errors.push("El email es obligatorio");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required &&
      errors.push("Contraseña obligatoria! si no la recuerdas, click abajo");
      return errors;
    },
  },
  methods: {
    async submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.loading = true;
        try {
          await this.$auth.loginWith("local", {
            data: {
              email: this.email,
              password: this.password,
            },
          });
          await this.$router.push("/dashboard");
        } catch (e) {
        } finally {
          this.loading = false;
        }
      }
    },
    invalidAuth() {
      this.email = this.password = "";
    },
  },
}
</script>

<style scoped>

</style>
