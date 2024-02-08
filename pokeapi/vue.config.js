const { defineConfig } = require('@vue/cli-service')
module.exports = {
  publicPath: './',
  ...defineConfig({
  transpileDependencies: true
})
}
