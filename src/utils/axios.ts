import axios from "axios";
import qs from "qs";
import global from "./global";
import { message } from "antd";
const instance = axios.create({
    // baseUrl: "http://",
    // timeout: 30000,
});
instance.interceptors.request.use((request: any) => {
    request.url = "/v1_0" + request.url;
    console.log(request.url);

    // if (global.getCookie("CXCSESSID")) {
    //     request.headers["Authorization"] =
    //         "CXCSESSID" + `${global.getCookie("CXCSESSID")}`;
    // }

    if (
        request.data &&
        request.headers["Content-Type"] !== "multiple/form-data" &&
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
                message.error(response.data.error);
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
