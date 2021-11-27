<template>
  <div>
    <v-container
      class="mt-5"
    >
      <v-card class="card-shadow">
        <v-card-title class="d-flex">
          <h3 class="mr-auto color-accent">All Roles</h3>

          <v-btn
            class="ml-auto px-10"
            right
            outlined
            color="primary"
            to="/roles/new"
          >
            <v-icon left>
              mdi-plus-circle-outline
            </v-icon>
            New Role
          </v-btn>
        </v-card-title>

        <v-divider class="mb-10"/>

        <v-data-table
          class="row-pointer"
          :headers="headers"
          :items="roles"
          @click:row="handleClick"
        ></v-data-table>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    headers: [
      {text: 'Name', value: 'name'},
      {text: 'Updated', value: 'updatedAt'},
      {text: 'Created', value: 'createdAt'}
    ],
    roles: []
  }),
  methods: {
    async getRoles() {
      try {
        await this.$axios
          .get("/api/roles/")
          .then((response) => {
            this.roles = response.data['hydra:member'];
          });
      } catch (error) {
        console.error(error);
      }
    },
    async handleClick(value) {
      await this.$router.push(`/roles/${value.id}`);
    },
  },
  beforeMount() {
    this.getRoles()
  }
}
</script>

<style scoped>

</style>
