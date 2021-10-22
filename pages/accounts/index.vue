<template>
  <div>
    <v-container
      class="mt-5"
    >
      <v-card class="card-shadow">
        <v-card-title class="d-flex">
          <h3 class="mr-auto color-accent">All Accounts</h3>

          <v-btn
            class="ml-auto px-10"
            right
            outlined
            color="primary"
            to="/accounts/new"
          >
            <v-icon left>
              mdi-plus-circle-outline
            </v-icon>
            New Account
          </v-btn>
        </v-card-title>

        <v-divider class="mb-10"/>

        <v-data-table
          class="row-pointer"
          :headers="headers"
          :items="accounts"
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
      {text: 'Lastname', value: 'lastname'},
      {text: 'Email', value: 'email'},
    ],
    accounts: []
  }),
  methods: {
    async getAccounts() {
      try {
        await this.$axios
          .get("/api/users/")
          .then((response) => {
            this.accounts = response.data['hydra:member'];
          });
      } catch (error) {
        console.error(error);
      }
    },
    async handleClick(value) {
      await this.$router.push(`/accounts/${value.id}`);
    },
  },
  beforeMount() {
    this.getAccounts()
  }
}
</script>

<style scoped>

</style>
