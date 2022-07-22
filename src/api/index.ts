import { instance as $axios } from "utils/axios";

export const userLogin = (data: object) => {
    return $axios({
        url: "/login/doLogin",
        method: "POST",
        data,
    });
};

export const userLogout = () => {
    return $axios.get("/login/logout");
};

export const getUserInfo = () => {
    return $axios.get("/user/current/user");
};

export const getWeather = (city: string) => {
    return $axios.get(
        "/v3/weather/weatherInfo?key=6d78e0a70cbe6fc669f1a0705a85a5b5&city=" +
            city
    );
};

export const getLocalPosition = () => {
    return $axios.get("/v3/ip?key=6d78e0a70cbe6fc669f1a0705a85a5b5");
};

export const getRoleListPage = (params: Object) => {
    return $axios.get("/role/page", { params });
};

export const getRoleList = (params: Object) => {
    return $axios.get("/role/list", { params });
};

export const saveRole = (params: Object) => {
    return $axios.post("/role/save", params);
};

export const updateRole = (params: Object) => {
    return $axios.post("/role/update", params);
};

export const deleteRole = (id: string) => {
    return $axios.delete("/role/remove", { params: { ids: id } });
};

export const relationApi = (params: Object) => {
    return $axios.post("/role/relation/api", params);
};

export const getUserList = (params: Object) => {
    return $axios.get("/user/page", { params });
};

export const saveUser = (params: Object) => {
    return $axios.post("/user/save", params);
};

export const changeUserType = (params: Object) => {
    return $axios.post("/user/page", params);
};

export const resetUser = (id: string) => {
    return $axios.post("/user/reset/password", { id });
};

export const deleteUser = (id: string) => {
    return $axios.delete("/user/remove", { params: { ids: id } });
};

export const disableUser = (params: Object) => {
    return $axios.post("/user/disable", params);
};

export const getAuthorityPage = (params: Object) => {
    return $axios.get("/api/page", { params });
};

export const getAuthorityList = (params: Object) => {
    return $axios.get("/api/list", { params });
};

export const refreshAuthorityList = () => {
    return $axios.get("/api/refresh");
};

export const relationRole = (params: Object) => {
    return $axios.post("/user/relation/role", params);
};

export const getLogPage = (params: Object) => {
    return $axios.get("/logs/page", { params });
};

export const getTaskList = (params: Object) => {
    return $axios.get("/job/all/jobs", { params });
};

export const saveTask = (params: Object) => {
    return $axios.post("/job/create/task", params);
};
