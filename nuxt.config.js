import colors from 'vuetify/es5/util/colors'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - GrowPro',
    title: 'ERP',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/global.css',
  ],

  loading: {
    color: '#FF5766',
    height: "3px"
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {src: '~/plugins/vuelidate', ssr: false}
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    'nuxt-font-loader'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/auth',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: 'http://localhost',
    proxy: true
  },

  proxy: {
    '/auth': {target: 'http://localhost', pathRewrite: {'^/auth/': ''}, changeOrigin: true},
    '/api': {target: 'http://localhost', pathRewrite: {'^/api/': '/api/'}, changeOrigin: true},
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {url: "/auth", method: "post", propertyName: "token"},
          logout: false,
          user: {url: "/api/current", method: "get", propertyName: false}
        }
      }
    },
    redirect: {
      login: "/login",
      logout: false,
      home: "/dashboard",
      user: "/dashboard"
    },
    watchLoggedIn: true
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    theme: {
      light: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        },
        light: {
          primary: '#FF5766',
          accent: colors.grey.lighten5,
          secondary: colors.amber.darken3,
          info: colors.teal.darken1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  fontLoader: {
    url: 'https://fonts.googleapis.com/css2?family=Poppins&display=swap',
    prefetch: true,
    preconnect: true
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
