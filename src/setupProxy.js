const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        createProxyMiddleware("/system", {
            target: "http://127.0.0.1:8888",
            // changeOrigin: true,
            // pathRewrite: { "^/v1_0": "" },
        }),
        createProxyMiddleware("/login", {
            target: "http://127.0.0.1:8888",
            // changeOrigin: true,
            // pathRewrite: { "^/v1_0": "" },
        }),
        createProxyMiddleware("/v3", {
            target: "https://restapi.amap.com",
            changeOrigin: true,
        }),
    );
};
