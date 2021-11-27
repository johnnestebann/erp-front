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
          <h3 class="mr-auto ml-2 color-accent">Role ID <small>#{{ role.id }}</small></h3>
        </v-card-title>

        <v-divider class="mb-4"/>

        <v-form>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                md="12"
              >
                <v-expansion-panels flat value="0">
                  <v-expansion-panel>
                    <v-expansion-panel-header>
                      <h3>General</h3>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <v-row>
                        <v-col
                          cols="12"
                          md="4"
                        >
                          <v-text-field
                            v-model="role.name"
                            :counter="30"
                            label="Name"
                            outlined
                            dense
                            required
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-expansion-panel-content>
                  </v-expansion-panel>

                  <v-expansion-panel>
                    <v-expansion-panel-header>
                      <h3>Actions</h3>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <v-row>
                        <v-col cols="12" md="4">
                          <v-checkbox v-for="(action, i) in defaultActions" v-model="role.actions" :key="i" :value="action" :label="action"></v-checkbox>
                        </v-col>
                      </v-row>
                    </v-expansion-panel-content>
                  </v-expansion-panel>

                  <v-expansion-panel>
                    <v-expansion-panel-header>
                      <h3>Serializations</h3>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>

                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
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
                Delete Role
              </v-btn>
            </template>
            <v-card>
              <v-card-text class="d-flex flex-column">
                <v-btn @click="dialog = false" color="black" icon large right class="ml-auto">
                  <v-icon>mdi-close</v-icon>
                </v-btn>

                <v-icon class="mx-auto mb-3" color="primary" x-large>mdi-alert-circle-outline</v-icon>

                <h5 class="px-8 text-center font-weight-bold" style="font-size: 1rem;">Are you sure to delete this
                  role?</h5>
              </v-card-text>

              <v-card-actions>
                <v-btn
                  class="d-flex mx-auto px-10 mb-4"
                  color="primary"
                  depressed
                  @click="deleteRole"
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
    role: {
      name: {required}
    }
  },
  data: () => ({
    role: {
      name: '',
      actions: [],
      serializations: {}
    },
    defaultActions: [],
    defaultSerializations: {},
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
          await this.$axios.$patch(this.role['@id'], {
            name: this.role.name,
            actions: this.role.actions
          }, {
            headers: {
              'Content-Type': 'application/ld+json'
            }
          });

          this.snackbar.color = 'primary';
          this.snackbar.text = 'Saved successfully!';

        } catch (e) {
          this.snackbar.color = 'danger';
          this.snackbar.text = 'Error saving!';
        } finally {
          this.snackbar.show = true;
        }

        await this.$router.push("/roles");
      }
    },
    async getRole() {
      try {
        await this.$axios
          .$get(`/api/roles/${this.$route.params.pathMatch}`)
          .then((response) => {
            this.role = response;
          });
      } catch (error) {
        console.error(error);
      }
    },
    async getAllowedEntities() {
      try {
        await this.$axios
          .$get(`/api/allowed_entities/1`)
          .then((response) => {
            this.defaultActions = response.data.Actions
            this.defaultSerializations = response.data.Serializations
          });
      } catch (error) {
        console.error(error);
      }
    },
    async deleteRole() {
      try {
        await this.$axios
          .$delete(`/api/roles/${this.$route.params.pathMatch}`)
          .then(async () => {
            await this.$router.push("/roles");
          });
      } catch (error) {
        console.error(error);
      }
    }
  },
  beforeMount() {
    this.getRole()
    this.getAllowedEntities()

    this.defaultActions = this.defaultActions.concat(this.role.actions)
  }
}
</script>

<style scoped>

</style>
