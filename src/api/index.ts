import { instance } from "../utils/axios";

export const userLogin = (data: object) => {
    return instance({
        url: "/login/doLogin",
        method: "POST",
        data,
    });
};

export const getUserInfo = () => {
    return instance.get("/system/user/current/user");
};

export const getWeather = (city: string) => {
    return instance.get(
        "/v3/weather/weatherInfo?key=6d78e0a70cbe6fc669f1a0705a85a5b5&city=" +
            city
    );
};

export const getLocalPosition = () => {
    return instance.get("/v3/ip?key=6d78e0a70cbe6fc669f1a0705a85a5b5");
};

export const getRoleListPage = (params: Object) => {
    return instance.get("/system/role/page", { params });
};

export const getRoleList = (params: Object) => {
    return instance.get("/system/role/list", { params });
};

export const saveRole = (params: Object) => {
    return instance.post("/system/role/save", params);
};

export const updateRole = (params: Object) => {
    return instance.post("/system/role/update", params);
};

export const deleteRole = (id: string) => {
    return instance.delete("/system/role/remove", { params: { ids: id } });
};

export const getUserList = (params: Object) => {
    return instance.get("/system/user/page", { params });
};

export const saveUser = (params: Object) => {
    return instance.post("/system/user/save", params);
};

export const changeUserType = (params: Object) => {
    return instance.post("/system/user/page", params);
};

export const resetUser = (id: string) => {
    return instance.post("/system/user/reset/password", { id });
};

export const deleteUser = (id: string) => {
    return instance.delete("/system/user/remove", { params: { ids: id } });
};

export const getAuthorityList = (params: Object) => {
    return instance.get("/system/api/page", { params });
};

export const refreshAuthorityList = () => {
    return instance.get("/system/api/refresh");
};
