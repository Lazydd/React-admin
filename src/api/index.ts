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
    return instance.get("/user/profile");
};

export const login = () => {
    return instance({
        url: "/login/code",
        method: "get",
        responseType: "blob",
    });
};
