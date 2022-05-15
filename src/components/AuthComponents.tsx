import React, { Fragment } from "react";
import { Navigate } from "react-router-dom";
import global from "../utils/global";

export default function AuthComponents({ children }: { children: any }) {
    const isToken = global.getCookie("_WEB_TOKEN_");
    if (isToken) {
        return <Fragment>{children}</Fragment>;
    } else {
        return <Navigate to="/login"></Navigate>;
    }
}
