module.exports = {
  devServer: {
    proxy: {
      '^/api/data/lastFive': {
        target: 'http://localhost:3000/',
        ws: true,
        changeOrigin: true
      },
    }
  }
}