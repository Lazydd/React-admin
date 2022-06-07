import React from "react";
import { Breadcrumb } from "antd";
export default function Arcticle() {
    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item>
                    <a href="">首页</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <a href="">内容管理</a>
                </Breadcrumb.Item>
            </Breadcrumb>
        </>
    );
}
