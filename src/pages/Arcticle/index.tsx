import React, { useState, useEffect } from "react";
import { Breadcrumb, Card, Radio, Select, DatePicker, Button } from "antd";
import moment from "moment";
import "./index.scss";
import { SearchOutlined } from "@ant-design/icons";

import { getCticle } from "../../api";
export default function Arcticle() {
    const [loading, setLoading] = useState(true);

    const { Option } = Select;
    const { RangePicker } = DatePicker;
    const dateFormat = "YYYY/MM/DD";

    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };

    const rangePickerChange = (e: any) => {
        console.log(moment(e[0]).format("YYYY/MM/DD"));
    };

    const init = () => {
        getCticle().then((res) => {
            console.log(res);
            setLoading(false);
        });
    };

    useEffect(() => {
        init();
    }, []);

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
            <Card
                style={{ width: "100%", marginTop: 20, overflow: "hidden" }}
                loading={loading}
            >
                <div className="control">
                    <span style={{ marginRight: 20 }}>状态：</span>
                    <Radio.Group defaultValue="a" buttonStyle="solid">
                        <Radio.Button value="a">全部</Radio.Button>
                        <Radio.Button value="b">草稿</Radio.Button>
                        <Radio.Button value="c">待审核</Radio.Button>
                        <Radio.Button value="d">审核失败</Radio.Button>
                    </Radio.Group>
                    <Button type="primary" icon={<SearchOutlined />}>
                        筛选
                    </Button>
                </div>
                <div className="control">
                    <span style={{ marginRight: 20 }}>频道：</span>
                    <Select
                        defaultValue="lucy"
                        style={{ width: 120 }}
                        onChange={handleChange}
                    >
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="disabled" disabled>
                            Disabled
                        </Option>
                        <Option value="Yiminghe">yiminghe</Option>
                    </Select>
                </div>
                <div className="control">
                    <span style={{ marginRight: 20 }}>日期：</span>
                    <RangePicker
                        defaultValue={[
                            moment("2015/01/01", dateFormat),
                            moment("2015/01/01", dateFormat),
                        ]}
                        onChange={rangePickerChange}
                    />
                </div>
            </Card>
        </>
    );
}
