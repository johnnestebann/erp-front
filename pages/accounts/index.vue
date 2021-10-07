<template>
  <div>
    <v-container
      class="mt-5"
    >
      <v-card elevation="3">
        <v-card-title class="d-flex">
          <h3 class="mr-auto" style="color: #3C292D;font-family: Poppins,serif">All Accounts</h3>

          <v-btn
            class="ml-auto"
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

        <v-divider class="mb-10" />

        <v-data-table
          :headers="headers"
          :items="accounts"
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
    }
  },
  beforeMount() {
    this.getAccounts()
  }
}
</script>

<style scoped>

</style>
