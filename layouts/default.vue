<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="true"
      fixed
      light
      app
    >
      <v-list class="mt-4">
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
          class="mb-1"
        >
          <v-list-item-action class="mr-3 ml-3">
            <!-- <v-img
              v-bind:src="$route.path === item.to ? item.img + '-hover.svg' : item.img + '.svg'"
              width="20"
            /> -->
            <v-icon :color="$route.path === item.to ? '#FF5766' : '#3C292D'">{{ item.icon }}</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title
              style="font-weight: 600"
              :style="$route.path === item.to ? 'color: #FF5766' : 'color: #3C292D'"
              v-text="item.title"
            />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="true"
      fixed
      dense
      elevation="1"
      app
      color="#3c292d"
    >
      <!-- <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon color="white">mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn> -->

      <v-toolbar-title>
        <v-img class="ml-2" src="/logo.png" width="130" />
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-menu
        left
        bottom
        offset-y
      >
        <template v-slot:activator="{ on, attrs }">

          <span
            v-bind="attrs"
            v-on="on"
            style="color: white;font-size: 1rem;font-weight: lighter"
          >
            <v-icon color="white">mdi-menu-down</v-icon>

            {{ $auth.user.name }}

            <v-list-item-avatar width="30" height="30">
              <img src="https://randomuser.me/api/portraits/women/81.jpg" alt=""/>
            </v-list-item-avatar>
          </span>
        </template>

        <v-list>
          <v-list-item>
            <v-list-item-title style="cursor: pointer" @click="logout">Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main
      class="ml-0"
      style="background: #f2f2f2"
    >
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

  </v-app>
</template>

<script>
export default {
  middleware: "auth",
  data () {
    return {
      clipped: true,
      drawer: true,
      fixed: true,
      items: [
        {
          img: '/icons/activity',
          icon: 'mdi-view-dashboard-variant-outline',
          title: 'My Dashboard',
          to: '/dashboard'
        },
        {
          img: '/icons/rocket',
          icon: 'mdi-rocket-launch-outline',
          title: 'Bookings',
          to: '/bookings'
        },
        {
          img: '/icons/company',
          icon: 'mdi-office-building-outline',
          title: 'Providers',
          to: '/suppliers'
        },
        {
          img: '/icons/plane',
          icon: 'mdi-file-chart-outline',
          title: 'Reports',
          to: '/reports'
        },
        {
          img: '/icons/usuario',
          icon: 'mdi-account-multiple-outline',
          title: 'ERP Accounts',
          to: '/accounts'
        },
        {
          img: '/icons/show-state',
          icon: 'mdi-cog-outline',
          title: 'Audit',
          to: '/audit'
        }
      ],
      miniVariant: false
    }
  },
  methods: {
    async logout() {
      await this.$auth.logout();
      await this.$router.push("/login");
    },
  },
  beforeMount() {
    console.log(this.$auth.user.name)
  }
}
</script>

<style>
* {
  font-family: Poppins,serif;
}
</style>
