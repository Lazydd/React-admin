import React, { useState, useEffect } from "react";
import {
    Breadcrumb,
    Card,
    Button,
    Table,
    message,
    Input,
    Tooltip,
    Form,
    Radio,
} from "antd";

import type { ColumnsType } from "antd/lib/table";
import moment from "moment";
import "./index.scss";
import { LoadingOutlined, SearchOutlined } from "@ant-design/icons";

import { getAuthorityPage, refreshAuthorityList } from "../../api";
export default function Authority() {
    const [loading, setLoading] = useState(true);
    const [articleTableData, setAticleTableData] = useState({
        list: [],
        count: 0,
    });
    const [params, setParams] = useState({
        current: 1,
        size: 10,
        status: "",
    });
    const layout = {
        wrapperCol: { span: 8 },
    };
    interface DataType {
        id: string;
        index: number;
        username: string;
        disable: boolean;
        disableTime: string;
    }
    const columns: ColumnsType<DataType> = [
        {
            title: "序号",
            dataIndex: "index",
            fixed: "left",
            width: 80,
            render: (text: any, record: any, index: number) =>
                `${(params.current - 1) * params.size + index + 1}`,
        },
        {
            title: "接口名称",
            dataIndex: "apiName",
            fixed: "left",
            width: 150,
            render: (text: any) => (
                <Tooltip placement="topLeft" title={text}>
                    {text}
                </Tooltip>
            ),
        },
        {
            title: "接口请求方式",
            dataIndex: "apiMethod",
            width: 150,
        },
        {
            title: "接口路径",
            dataIndex: "apiUrl",
            width: 250,
        },
        {
            title: "接口权限标识",
            dataIndex: "apiFlag",
            width: 200,
        },
        {
            title: "创建人",
            width: 150,
            dataIndex: "createdBy",
        },
        {
            title: "更新人",
            width: 150,
            dataIndex: "updatedBy",
        },
        {
            title: "更新时间",
            width: 200,
            dataIndex: "updatedTime",
            render: (text: any) => (
                <span>
                    {text ? moment(text).format("YYYY-MM-DD HH:mm:ss") : ""}
                </span>
            ),
        },
        {
            title: "创建时间",
            width: 200,
            dataIndex: "createdTime",
            render: (text: any) => (
                <span>
                    {text ? moment(text).format("YYYY-MM-DD HH:mm:ss") : ""}
                </span>
            ),
        },
        {
            title: "接口作者",
            width: 150,
            dataIndex: "apiAuthor",
        },
    ];

    const onFinish = (e: any) => {
        setParams({ ...params, ...e, current: 1 });
    };

    const pageChange = (current: number) => {
        setParams({ ...params, current });
    };

    const refresh = () => {
        refreshAuthorityList().then((res: any) => {
            if (res.code == 200) {
                message.success(res.data);
            } else {
                message.error(res.error);
            }
        });
    };

    const getData = async () => {
        getAuthorityPage({
            ...params,
            status: params.status ? params.status : undefined,
        })
            .then((res: any) => {
                if (res.code == 200) {
                    setAticleTableData({
                        list: res.records,
                        count: res.total,
                    });
                } else {
                    message.error(res.error);
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        setLoading(true);
        getData();
    }, [params]);
    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item>
                    <a href="">首页</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <a href="">权限管理</a>
                </Breadcrumb.Item>
            </Breadcrumb>
            <Card style={{ width: "100%", marginTop: 20, overflow: "hidden" }}>
                <Form {...layout} onFinish={onFinish}>
                    <Form.Item label="请求方式" name="status" initialValue="">
                        <Radio.Group buttonStyle="solid">
                            <Radio.Button value="">全部</Radio.Button>
                            <Radio.Button value="GET">GET</Radio.Button>
                            <Radio.Button value="POST">POST</Radio.Button>
                            <Radio.Button value="DELETE">DELETE</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label="接口名称" name="apiName">
                        <Input placeholder="请输入接口名称" />
                    </Form.Item>
                    <Form.Item label="接口路径" name="apiUrl">
                        <Input placeholder="请输入接口路径" />
                    </Form.Item>
                    <Form.Item label="权限标识" name="apiFlag">
                        <Input placeholder="请输入权限标识" />
                    </Form.Item>
                    <Form.Item label="接口作者" name="apiAuthor">
                        <Input placeholder="请输入接口作者" />
                    </Form.Item>
                    <Button
                        type="primary"
                        className="control"
                        icon={<SearchOutlined />}
                        htmlType="submit"
                    >
                        筛选
                    </Button>
                </Form>
            </Card>
            <Card
                style={{ width: "100%", marginTop: 20, overflow: "hidden" }}
                loading={loading}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: 25,
                    }}
                >
                    <p style={{ marginBottom: 0 }}>
                        根据筛选条件共查询到{articleTableData.count}条结果
                    </p>
                    <Button
                        type="primary"
                        icon={<LoadingOutlined />}
                        onClick={() => {
                            refresh();
                        }}
                    >
                        刷新权限接口
                    </Button>
                </div>
                <Table
                    className="menuMainTainTable"
                    columns={columns}
                    dataSource={articleTableData.list || []}
                    scroll={{ x: 1300 }}
                    pagination={{
                        pageSize: params.size,
                        current: params.current,
                        onChange: pageChange,
                        total: articleTableData.count,
                        showSizeChanger: false,
                    }}
                    rowKey={(record) => record.id}
                />
            </Card>
        </>
    );
}
