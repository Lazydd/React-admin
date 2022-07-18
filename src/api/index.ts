import { instance } from "utils/axios";

export const userLogin = (data: object) => {
    return instance({
        url: "/login/doLogin",
        method: "POST",
        data,
    });
};

export const getUserInfo = () => {
    return instance.get("/user/current/user");
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
    return instance.get("/role/page", { params });
};

export const getRoleList = (params: Object) => {
    return instance.get("/role/list", { params });
};

export const saveRole = (params: Object) => {
    return instance.post("/role/save", params);
};

export const updateRole = (params: Object) => {
    return instance.post("/role/update", params);
};

export const deleteRole = (id: string) => {
    return instance.delete("/role/remove", { params: { ids: id } });
};

export const relationApi = (params: Object) => {
    return instance.post("/role/relation/api", params);
};

export const getUserList = (params: Object) => {
    return instance.get("/user/page", { params });
};

export const saveUser = (params: Object) => {
    return instance.post("/user/save", params);
};

export const changeUserType = (params: Object) => {
    return instance.post("/user/page", params);
};

export const resetUser = (id: string) => {
    return instance.post("/user/reset/password", { id });
};

export const deleteUser = (id: string) => {
    return instance.delete("/user/remove", { params: { ids: id } });
};

export const disableUser = (params: Object) => {
    return instance.post("/user/disable", params);
};

export const getAuthorityPage = (params: Object) => {
    return instance.get("/api/page", { params });
};

export const getAuthorityList = (params: Object) => {
    return instance.get("/api/list", { params });
};

export const refreshAuthorityList = () => {
    return instance.get("/api/refresh");
};

export const relationRole = (params: Object) => {
    return instance.post("/user/relation/role", params);
};

export const getLogPage = (params: Object) => {
    return instance.get("/logs/page", { params });
};
