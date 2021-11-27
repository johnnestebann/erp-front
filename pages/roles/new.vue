<template>
  <div>
    <v-container
      class="mt-5"
    >
      <v-card class="card-shadow">
        <v-card-title class="d-flex">
          <v-btn text icon to="/roles">
            <v-icon large>mdi-chevron-left</v-icon>
          </v-btn>
          <h3 class="mr-auto ml-2 color-accent">New Role</h3>
        </v-card-title>

        <v-divider class="mb-10"/>

        <v-form>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                md="3"
              >
                <v-text-field
                  v-model="account.name"
                  :counter="30"
                  label="Name"
                  outlined
                  dense
                  required
                ></v-text-field>
              </v-col>

              <v-col
                cols="12"
                md="5"
              >
                <v-text-field
                  v-model="account.email"
                  :counter="40"
                  outlined
                  dense
                  autocomplete="new-password"
                  label="Email"
                  required
                ></v-text-field>
              </v-col>

              <v-col
                cols="12"
                md="4"
              >
                <v-text-field
                  v-model="account.password"
                  label="Password"
                  type="password"
                  autocomplete="new-password"
                  outlined
                  dense
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>

        <v-divider />

        <v-card-title class="d-flex">
          <v-btn
            @click="submit()"
            class="ml-auto px-10"
            color="primary"
            :disabled="this.$v.$invalid"
            depressed
          >
            Save
          </v-btn>
        </v-card-title>
      </v-card>
    </v-container>

    <v-snackbar
      v-model="snackbar.show"
      top
    >
      {{ snackbar.text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          :color="snackbar.color"
          text
          v-bind="attrs"
          @click="snackbar.show = false"
        >
          <v-icon>mdi-close-circle</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import {validationMixin} from "vuelidate";
import {email, required} from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],
  validations: {
    account: {
      name: {required},
      email: {required, email},
      password: {required},
    }
  },
  data: () => ({
    account: {
      name: '',
      email: '',
      password: ''
    },
    snackbar: {
      text: '',
      color: 'primary',
      show: false
    }
  }),
  methods: {
    async submit() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        try {
          await this.$axios.$post("/api/users", {
            name: this.account.name,
            email: this.account.email,
            password: this.account.password
          });

          this.snackbar.color = 'primary';
          this.snackbar.text = 'Saved successfully!';

          await this.$router.push("/accounts");
        } catch (e) {
          this.snackbar.color = 'danger';
          this.snackbar.text = 'Error saving!';
        } finally {
          this.snackbar.show = true;
        }
      }
    },
  }
}
</script>

<style scoped>

</style>
