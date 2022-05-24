import { instance } from "../utils/axios";

// export const userLogin = (data: object) => {
//     return instance({
//         url: "/authorizations",
//         method: "POST",
//         data,
//     });
// };

export const getWeather = () => {
    return instance.get(
        "https://restapi.amap.com/v3/weather/weatherInfo?city=110101&key=0b389e3ae69597e24385a2d9074852de"
    );
};

export const userLogin = (data: object) => {
    return instance({
        url: "/login",
        method: "POST",
        data,
    });
};

export const getUserInfo = () => {
    return instance.get("/sys/user/info");
};

export const login = () => {
    return instance({
        url: "/login/code",
        method: "get",
        responseType: "blob",
    });
};

export const getMenuList = () => {
    return instance.get("/sys/menu/list");
};

export const addMenu = (data: Object) => {
    return instance.post("/sys/menu/add", data);
};

export const deleteMenu = (data: Array<string>) => {
    return instance.delete("/sys/menu/del", { params: { ids: data } });
};
