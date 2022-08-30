import { instance as $axios } from "utils/axios";
import axios from "axios";
let sourceToken = axios.CancelToken.source();

export const userLogin = (data: object) => {
    return $axios({
        url: "/system/login/doLogin",
        method: "POST",
        data,
    });
};

export const userLogout = () => {
    return $axios.get("/system/login/logout");
};

export const getUserInfo = () => {
    return $axios.get("/system/user/current/user");
};

export const getWeather = (city: string) => {
    return $axios.get(
        "/v3/weather/weatherInfo?key=6d78e0a70cbe6fc669f1a0705a85a5b5&city=" +
            city,
        {
            cancelToken: sourceToken.token,
        }
    );
};

export const getLocalPosition = () => {
    return $axios.get("/v3/ip?key=6d78e0a70cbe6fc669f1a0705a85a5b5");
};

export const getRoleListPage = (params: Object) => {
    return $axios.get("/system/role/page", { params });
};

export const getRoleList = (params: Object) => {
    return $axios.get("/system/role/list", { params });
};

export const saveRole = (params: Object) => {
    return $axios.post("/system/role/save", params);
};

export const updateRole = (params: Object) => {
    return $axios.post("/system/role/update", params);
};

export const deleteRole = (id: string) => {
    return $axios.delete("/system/role/remove", { params: { ids: id } });
};

export const relationApi = (params: Object) => {
    return $axios.post("/system/role/relation/api", params);
};

export const getUserList = (params: Object) => {
    return $axios.get("/system/user/page", { params });
};

export const saveUser = (params: Object) => {
    return $axios.post("/system/user/save", params);
};

export const changeUserType = (params: Object) => {
    return $axios.post("/system/user/page", params);
};

export const resetUser = (id: string) => {
    return $axios.post("/system/user/reset/password", { id });
};

export const deleteUser = (id: string) => {
    return $axios.delete("/system/user/remove", { params: { ids: id } });
};

export const disableUser = (params: Object) => {
    return $axios.post("/system/user/disable", params);
};

export const getAuthorityPage = (params: Object) => {
    return $axios.get("/system/api/page", { params });
};

export const getAuthorityList = (params: Object) => {
    return $axios.get("/system/api/list", { params });
};

export const refreshAuthorityList = () => {
    return $axios.get("/system/api/refresh");
};

export const relationRole = (params: Object) => {
    return $axios.post("/system/user/relation/role", params);
};

export const getLogPage = (params: Object) => {
    return $axios.get("/system/logs/page", { params });
};

export const getTaskList = () => {
    return $axios.get("/system/job/all/task");
};

export const createTask = (params: Object) => {
    return $axios.post("/system/job/create/task", params);
};

export const updateTask = (params: Object) => {
    return $axios.post("/system/job/update", params);
};

export const switchTask = (params: Object) => {
    return $axios.get("/system/job/switch", { params });
};

export const removeTask = (params: Object) => {
    return $axios.get("/system/job/remove", { params });
};

export const allJobs = () => {
    return $axios.get("/system/job/all/Jobs");
};

export { sourceToken };
