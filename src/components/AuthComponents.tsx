import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import global from "../utils/global";

export default function AuthComponents({ children }: { children: any }) {
    // const isToken = global.getCookie("CXCSESSID");
    // if (isToken) {
    return <Fragment>{children}</Fragment>;
    // } else {
    //     return <Navigate to="/login"></Navigate>;
    // }
}
