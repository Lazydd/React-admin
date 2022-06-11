import { instance } from "../utils/axios";

export const userLogin = (data: object) => {
    return instance({
        url: "/authorizations",
        method: "POST",
        data,
    });
};

export const getWeather = (city: string) => {
    return instance.get(
        "/map/weather/weatherInfo?key=6d78e0a70cbe6fc669f1a0705a85a5b5&city=" +
            city
    );
};

export const getLocalPosition = () => {
    return instance.get("/map/ip?key=6d78e0a70cbe6fc669f1a0705a85a5b5");
};

export const getUserInfo = () => {
    return instance.get("/user/profile");
};

export const getArticle = () => {
    return instance.get("/channels");
};

export const getArticleTableData = (params: Object) => {
    return instance.get("/mp/articles", { params });
};

export const deleteArticle = (params: any) => {
    return instance.delete("/mp/articles/" + params.id);
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
