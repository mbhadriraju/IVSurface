const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: '//orange-potato-q74gv4pvg6xcx6vp-5000.app.github.dev',
      changeOrigin: true,
    })
  );
};