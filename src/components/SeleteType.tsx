import React, { useState, useEffect } from "react";
import { Select } from "antd";

import { getArticle } from "../api/index";

export default function SeleteType() {
    const [optionlist, setOptionlist] = useState([]);

    useEffect(() => {
        getArticle().then((res) => {
            setOptionlist(res.data?.channels);
        });
    }, []);
    return (
        <Select placeholder="请选择频道" style={{ width: 120 }}>
            {optionlist.map((item: any) => (
                <Select.Option value={item.id} key={item.id}>
                    {item.name}
                </Select.Option>
            ))}
        </Select>
    );
}
