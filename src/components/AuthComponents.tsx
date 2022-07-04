import React, { Fragment } from "react";
import { Navigate } from "react-router-dom";
import global from "../utils/global";

export default function AuthComponents({ children }: { children: any }) {
    const tokenName = global.getStorage("tokenName");
    const tokenValue = global.getStorage("tokenValue");
    if (tokenName && tokenValue) {
        return <Fragment>{children}</Fragment>;
    } else {
        return <Navigate to="/login"></Navigate>;
    }
}
