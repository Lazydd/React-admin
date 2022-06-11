import axios from "axios";
import qs from "qs";
import global from "./global";
import { message } from "antd";
let props = "";
const instance = axios.create({
    // baseUrl: "http://",
    // timeout: 30000,
});

instance.interceptors.request.use((request: any) => {
    if (!request.url.includes("/v3/")) request.url = "/v1_0" + request.url;

    if (global.getCookie("_Bearer_TOKEN_")) {
        request.headers["Authorization"] =
            "Bearer " + `${global.getCookie("_Bearer_TOKEN_")}`;
    }

    if (
        request.data &&
        request.headers["Content-Type"] !== "multiple/form-data" &&
        request.headers["Content-Type"] !== "application/json" &&
        (request.headers["Content-Type"] ===
            "application/x-www-form-urlencoded" ||
            request.method === "post")
    ) {
        request.data = qs.stringify(request.data, {
            allowDots: true,
        });
    }
    if (request.method === "get")
        request.params = { ...request.params, time: new Date().getTime() };
    return request;
});

instance.interceptors.response.use(
    (response: any) => {
        if (response.status >= 200 && response.status < 300) {
            if (response.data.code === 401) {
                setTimeout(() => {
                    message.error(response.data.error);
                }, 1000);
            } else {
                return response.data;
            }
        }
    },
    (err: any) => {
        message.error(err.message);
        throw new Error("网络错误");
    }
);

export { instance };
