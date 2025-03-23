const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        createProxyMiddleware('/receive_data', {
            target: 'https://studious-yodel-g4475945qw4q2wx4w-5000.app.github.dev/',
            changeOrigin: true,
            pathRewrite: {
                '^/receive_data': '/receive_data',
            },
        })
    );
};