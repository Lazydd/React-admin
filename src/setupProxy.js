const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        createProxyMiddleware("/v1_0", {
            target: "http://192.168.2.36:8888",
            // changeOrigin: true,
            pathRewrite: { "^/v1_0": "" },
        }),
        createProxyMiddleware("/v3", {
            target: "https://restapi.amap.com",
            changeOrigin: true,
        }),
    );
};
