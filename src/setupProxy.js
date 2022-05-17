const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        // createProxyMiddleware("/v1_0", {
        //     target: "http://geek.itheima.net",
        //     changeOrigin: true,
        //     // pathRewrite: { "^/v1_0": "" },
        // }),
        createProxyMiddleware("/v1_0", {
            target: "http://192.168.2.13:8082",
            changeOrigin: true,
            pathRewrite: { "^/v1_0": "" },
        }),
        // createProxyMiddleware("/api2", {
        //     target: "http://geek.itheima.net",
        //     changeOrigin: true,
        //     pathRewrite: { "^/api2": "" },
        // })
    );
};
