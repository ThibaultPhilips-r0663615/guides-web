console.log('nuxt config')
console.log(process.env.TEST)
console.log(process.env.HIHIHI)

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'guides-web',
    htmlAttrs: {
      lang: 'fr'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/styles/styles.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/nuxt-client-init.js', mode: 'client' },
    { src: '~/plugins/date.js', mode: 'client' },
    '~plugins/i18n.js',
    '~/plugins/translationMixins.js',
    '~/plugins/utilMixins.js',
  ],
  server: {
    port: 80 // default: localhost
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    ['@nuxtjs/vuetify', { /* module options */ }],
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    ['@nuxtjs/dotenv', { filename: '.env.dev' }]
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'custom',
        path: '*',
        component: resolve(__dirname, 'pages/_lang/404.vue')
      })
    },
    middleware: ['i18n']
  },
  env: {

  },
  // Available on both client & server
  publicRuntimeConfig: {
    hahaha: process.env.TEST,
    hihihi: process.env.HIHIHI
  },
  // Only avaibable on server
  privateRuntimeConfig: {

  }
}