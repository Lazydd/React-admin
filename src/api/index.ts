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

export const getArticle = () => {
    return instance.get("/channels");
};

export const getUserList = (params: Object) => {
    return instance.get("/system/role/page", { params });
};

export const saveUser = (params: Object) => {
    return instance.post("/system/role/save", params);
};

export const updateUser = (params: Object) => {
    return instance.post("/system/role/update", params);
};

export const deleteUser = (id: string) => {
    return instance.delete("/system/role/remove", { params: { ids: id } });
};

export const saveArticle = (params: any) => {
    return instance.post("/mp/articles?draft=false", params, {
        headers: { "Content-Type": "application/json" },
    });
};

export const editSaveArticle = (params: any, id: string) => {
    return instance.put(`/mp/articles/${id}?draft=false`, params, {
        headers: { "Content-Type": "application/json" },
    });
};

export const getArticleDetails = (id: string) => {
    return instance.get("/mp/articles/" + id);
};
