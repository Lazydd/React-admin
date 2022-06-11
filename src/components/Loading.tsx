import React from "react";
import { Spin } from 'antd';
export default function Loading() {
    return (
        <div className="loading-box">
            <div className="loading">
                <Spin />
                <div>加载中...</div>
            </div>
        </div>
    );
}
