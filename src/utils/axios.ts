import axios from "axios";
import qs from "qs";
import global from "./global";

const instance = axios.create({
    // baseUrl: "http://",
    // timeout: 30000,
});
instance.interceptors.request.use((request: any) => {
    request.url = "/v1_0" + request.url;
    console.log(request.url);

    if (global.getCookie("CXCSESSID")) {
        request.headers["Authorization"] =
            "JSESSIONID" + `${global.getCookie("CXCSESSID")}`;
    }

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
    return request;
});

instance.interceptors.response.use(
    (response: any) => {
        if (response.status >= 200 && response.status < 300) {
            if (response.data.code === 401) {
                console.log("未登录");
            } else {
                return response.data;
            }
        }
    },
    (err: any) => {
        throw new Error("网络错误");
    }
);

export { instance };
