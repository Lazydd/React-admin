import { instance } from "../utils/axios";

// export const userLogin = (data: object) => {
//     return instance({
//         url: "/authorizations",
//         method: "POST",
//         data,
//     });
// };

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
