const isProd = process.env.NODE_ENV === 'production'
module.exports = {
  configureWebpack: {
    externals: isProd ? ['@vue/composition-api', 'lodash'] : []
  },
  chainWebpack: config => {
    if (isProd) {
      config.module.rule('ts').uses.delete('cache-loader')

      config.module
        .rule('ts')
        .use('ts-loader')
        .loader('ts-loader')
        .tap(opts => {
          opts.transpileOnly = false
          opts.happyPackMode = false
          return opts
        })
    } else {
      config.entry('app').clear().add('./src/demo/main.ts') // 入口路径 (相对路径)
      config.module.rule('ts').uses.delete('cache-loader')

      config.module
        .rule('ts')
        .use('ts-loader')
        .loader('ts-loader')
        .tap(opts => {
          opts.transpileOnly = false
          opts.happyPackMode = false
          return opts
        })
    }
  }
}
