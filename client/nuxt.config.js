module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Secret',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Send encrypted notes that will self-destruct after being read.'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#d8f7ff', height: '4px' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend(config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    postcss: {
      plugins: {
        'postcss-custom-properties': false
      }
    }
  },
  css: ['@/assets/sass/app.scss'],
  modules: ['@nuxtjs/axios'],
  axios: {
    credentials: false,
    browserBaseURL: 'http://localhost:8080/',
    requestInterceptor: (config, { app }) => {
      app.router.app.$loading.start()
      return config
    },
    responseInterceptor: (response, { app }) => {
      app.router.app.$loading.finish()
      return response
    },
    errorHandler(errorReason, { app }) {
      app.router.app.$loading.fail()
      app.router.app.$loading.finish()

      return Promise.reject(errorReason)
    },
    disableDefaultErrorHandler: true
  },
  plugins: ['~/plugins/vue-clipboards']
}
