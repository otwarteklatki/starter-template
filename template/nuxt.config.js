module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: '{{ name }}',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '{{escape description }}' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      /*
      ** Sprites loader
      */
      const rule = config.module.rules.find(r => r.test.toString() === '/\\.(png|jpe?g|gif|svg)$/')
      config.module.rules.splice(config.module.rules.indexOf(rule), 1)

      // add it again, but now without 'assets\/icons'
      config.module.rules.push({
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: 'url-loader',
        exclude: /(assets\/icons)/,
        query: {
          limit: 1000, // 1KO
          name: 'img/[name].[hash:7].[ext]',
        },
      })

      config.module.rules.push({
        test: /\.svg$/,
        include: /(assets\/icons)/,
        use: 'svg-sprite-loader',
      })

      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  
  plugins: [
    { src: '~/plugins/global-components.js' }
  ]
}
