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
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
          class="mb-1"
        >
          <v-list-item-action>
            <v-img v-bind:src="item.img" width="20" />
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title style="color: #3c292d; font-weight: 600" v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="true"
      fixed
      dense
      elevation="2"
      app
      color="#3c292d"
    >
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon color="white">mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>

      <v-toolbar-title>
        <v-img src="/logo.png" width="130" />
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <span style="color: white">Username</span>
      <v-btn icon color="white">
        <v-icon>mdi-logout-variant</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main style="background: #f2f2f2">
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: true,
      drawer: true,
      fixed: true,
      items: [
        {
          img: '/icons/activity.svg',
          title: 'My Dashboard',
          to: '/dashboard'
        },
        {
          img: '/icons/person.svg',
          title: 'All Contacts',
          to: '/contacts'
        },
        {
          img: '/icons/rocket.svg',
          title: 'Bookings',
          to: '/bookings'
        },
        {
          img: '/icons/company.svg',
          title: 'Suppliers',
          to: '/suppliers'
        },
        {
          img: '/icons/plane.svg',
          title: 'Reports',
          to: '/reports'
        },
        {
          img: '/icons/usuario.svg',
          title: 'ERP Accounts',
          to: '/accounts'
        },
        {
          img: '/icons/show-state.svg',
          title: 'Audit',
          to: '/audit'
        }
      ],
      miniVariant: false,
      title: 'GROWPRO'
    }
  }
}
</script>
