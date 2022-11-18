const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    open: false,
    // overlay: {
    //   warnings: false,
    //   errors: true
    // },
    proxy: {
      '/API': {
        target: `http://localhost:9090`,
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          '^/API': ''
        },
      }
    }
  }
})
