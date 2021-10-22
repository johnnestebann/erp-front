<template>
  <div>
    <v-container
      class="mt-5"
    >
      <v-card class="card-shadow">
        <v-card-title class="d-flex">
          <v-btn text icon to="/accounts">
            <v-icon large>mdi-chevron-left</v-icon>
          </v-btn>
          <h3 class="mr-auto ml-2 color-accent">Account ID <small>#{{ account.id }}</small></h3>
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
                  v-model="password"
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

        <v-divider/>

        <v-card-title class="d-flex">
          <v-dialog
            v-model="dialog"
            persistent
            max-width="300"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                text
                color="primary"
                class="mr-auto"
                :disabled="$v.$invalid"
                depressed
                v-bind="attrs"
                v-on="on"
              >
                Delete Account
              </v-btn>
            </template>
            <v-card>
              <v-card-text class="d-flex flex-column">
                <v-btn @click="dialog = false" color="black" icon large right class="ml-auto">
                  <v-icon>mdi-close</v-icon>
                </v-btn>

                <v-icon class="mx-auto mb-3" color="primary" x-large>mdi-alert-circle-outline</v-icon>

                <h5 class="px-8 text-center font-weight-bold" style="font-size: 1rem;">Are you sure to delete this account?</h5>
              </v-card-text>

              <v-card-actions>
                <v-btn
                  class="d-flex mx-auto px-10 mb-4"
                  color="primary"
                  depressed
                  @click="deleteAccount"
                >
                  Delete
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

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
      email: {required, email}
    }
  },
  data: () => ({
    account: {
      name: '',
      email: '',
      password: ''
    },
    password: '',
    dialog: false,
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
          await this.$axios.$patch(this.account['@id'], {
            name: this.account.name,
            email: this.account.email,
            password: this.password !== '' ? this.password : undefined
          }, {
            headers: {
              'Content-Type': 'application/ld+json'
            }});

          this.snackbar.color = 'primary';
          this.snackbar.text = 'Saved successfully!';

        } catch (e) {
          this.snackbar.color = 'danger';
          this.snackbar.text = 'Error saving!';
        } finally {
          this.snackbar.show = true;
        }

        await this.$router.push("/accounts");
      }
    },
    async getAccount() {
      try {
        await this.$axios
          .$get(`/api/users/${this.$route.params.pathMatch}`)
          .then((response) => {
            this.account = response;
          });
      } catch (error) {
        console.error(error);
      }
    },
    async deleteAccount() {
      try {
        await this.$axios
          .$delete(`/api/users/${this.$route.params.pathMatch}`)
          .then(async () => {
            await this.$router.push("/accounts");
          });
      } catch (error) {
        console.error(error);
      }
    }
  },
  beforeMount() {
    this.getAccount()
  }
}
</script>

<style scoped>

</style>
