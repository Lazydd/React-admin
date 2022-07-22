import React, { useState, useEffect } from "react";
import {
    Breadcrumb,
    Card,
    Button,
    Table,
    message,
    Tooltip,
    Modal,
    Input,
    Empty,
} from "antd";
import type { ColumnsType } from "antd/lib/table";
import moment from "moment";
import ReactJson from "react-json-view";
import "./index.scss";

import { getLogPage } from "api";
const { Search } = Input;

export default function Authority() {
    const [loading, setLoading] = useState(true);
    const [response, setResponse] = useState({});
    const [title, setTitle] = useState("");
    const [visible, setVisible] = useState(false);
    const [logTableData, setLogTableData] = useState({
        list: [],
        count: 0,
    });
    const [params, setParams] = useState({
        current: 1,
        size: 10,
        likeKey: "",
    });

    interface DataType {
        id: string;
        index: number;
        browser: string;
        content: string;
        requestMethod: string;
        requestParameter: string;
        name: string;
        ip: string;
        ipAddress: string;
        operator: string;
        platform: string;
        url: string;
        timeConsuming: string;
        createdBy: string;
        updatedBy: string;
        updatedTime: string;
        createdTime: string;
    }
    const columns: ColumnsType<DataType> = [
        {
            title: "序号",
            dataIndex: "index",
            fixed: "left",
            width: 80,
            align: "center",
            render: (text: any, record: any, index: number) =>
                `${(params.current - 1) * params.size + index + 1}`,
        },

        {
            title: "接口名称",
            dataIndex: "name",
            fixed: "left",
            width: 150,
            align: "center",
            ellipsis: {
                showTitle: false,
            },
            render: (text: any) => (
                <Tooltip placement="topLeft" title={text}>
                    {text}
                </Tooltip>
            ),
        },
        {
            title: "请求方式",
            dataIndex: "requestMethod",
            width: 120,
            align: "center",
        },
        {
            title: "请求参数",
            dataIndex: "requestParameter",
            width: 180,
            align: "center",
            ellipsis: {
                showTitle: false,
            },
            render: (text: any) => (
                <Button onClick={() => getContent(text, "请求参数")}>
                    参数
                </Button>
            ),
        },
        {
            title: "接口地址",
            dataIndex: "url",
            width: 180,
            align: "center",
        },
        {
            title: "耗时(毫秒)",
            dataIndex: "timeConsuming",
            width: 150,
            align: "center",
        },
        {
            title: "异常与响应内容",
            dataIndex: "content",
            width: 150,
            render: (text: any) => (
                <Button onClick={() => getContent(text, "异常与响应内容")}>
                    响应
                </Button>
            ),
        },
        {
            title: "操作人",
            dataIndex: "operator",
            width: 150,
            align: "center",
            ellipsis: {
                showTitle: false,
            },
            render: (text: any) => (
                <Tooltip placement="topLeft" title={text}>
                    {text}
                </Tooltip>
            ),
        },
        {
            title: "创建时间",
            width: 200,
            dataIndex: "createdTime",
            align: "center",
            render: (text: any) => (
                <span>
                    {text ? moment(text).format("YYYY-MM-DD HH:mm:ss") : ""}
                </span>
            ),
        },
        {
            title: "平台",
            dataIndex: "platform",
            width: 150,
            align: "center",
            ellipsis: {
                showTitle: false,
            },
            render: (text: any) => (
                <Tooltip placement="topLeft" title={text}>
                    {text}
                </Tooltip>
            ),
        },
        {
            title: "浏览器",
            dataIndex: "browser",
            width: 150,
            align: "center",
            ellipsis: {
                showTitle: false,
            },
            render: (text: any) => (
                <Tooltip placement="topLeft" title={text}>
                    {text}
                </Tooltip>
            ),
        },

        {
            title: "IP",
            dataIndex: "ip",
            width: 150,
            align: "center",
        },
        {
            title: "IP来源",
            dataIndex: "ipAddress",
            width: 150,
            align: "center",
            ellipsis: {
                showTitle: false,
            },
            render: (text: any) => (
                <Tooltip placement="topLeft" title={text}>
                    {text}
                </Tooltip>
            ),
        },
        {
            title: "接口权限标识",
            dataIndex: "apiFlag",
            width: 150,
            align: "center",
        },
        {
            title: "创建人",
            width: 150,
            dataIndex: "createdBy",
            align: "center",
            ellipsis: {
                showTitle: false,
            },
            render: (text: any) => (
                <Tooltip placement="topLeft" title={text}>
                    {text}
                </Tooltip>
            ),
        },
        {
            title: "更新人",
            width: 150,
            dataIndex: "updatedBy",
            align: "center",
            ellipsis: {
                showTitle: false,
            },
            render: (text: any) => (
                <Tooltip placement="topLeft" title={text}>
                    {text}
                </Tooltip>
            ),
        },
        {
            title: "更新时间",
            width: 200,
            dataIndex: "updatedTime",
            align: "center",
            render: (text: any) => (
                <span>
                    {text ? moment(text).format("YYYY-MM-DD HH:mm:ss") : ""}
                </span>
            ),
        },
    ];

    const onSearch = (likeKey: any) => {
        setParams({ ...params, likeKey, current: 1 });
    };

    const pageChange = (current: number) => {
        setParams({ ...params, current });
    };

    const getContent = (text: string, title: string) => {
        setResponse(JSON.parse(text));
        setTitle(title);
        setVisible(true);
    };

    const getData = async () => {
        getLogPage({
            ...params,
            likeKey: params.likeKey ? params.likeKey : undefined,
        })
            .then((res: any) => {
                if (res.code == 200) {
                    setLogTableData({
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
                    <a href="">日志管理</a>
                </Breadcrumb.Item>
            </Breadcrumb>
            <Card style={{ width: "100%", marginTop: 20, overflow: "hidden" }}>
                <Search
                    placeholder="请输入接口名称、请求方式、接口地址等..."
                    loading={loading}
                    enterButton
                    onSearch={onSearch}
                />
            </Card>
            <Card style={{ width: "100%", marginTop: 20, overflow: "hidden" }}>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: 25,
                    }}
                >
                    <p style={{ marginBottom: 0 }}>
                        根据筛选条件共查询到{logTableData.count}条结果
                    </p>
                </div>
                <Table
                    className="menuMainTainTable"
                    columns={columns}
                    dataSource={logTableData.list || []}
                    scroll={{ x: 1300 }}
                    pagination={{
                        pageSize: params.size,
                        current: params.current,
                        onChange: pageChange,
                        total: logTableData.count,
                        showSizeChanger: false,
                    }}
                    rowKey={(record) => record.id}
                    loading={loading}
                />
            </Card>
            <Modal
                width={800}
                title={title}
                visible={visible}
                onOk={() => setVisible(false)}
                afterClose={() => setResponse({})}
                onCancel={() => setVisible(false)}
                forceRender
                okText="确定"
                cancelText="取消"
            >
                {Object.keys(response).length != 0 ? (
                    <ReactJson
                        style={{
                            height: "500px",
                            overflow: "auto",
                        }}
                        src={response}
                        enableClipboard={false}
                        iconStyle="circle"
                        name={false}
                        collapsed={false}
                        displayDataTypes={false}
                    />
                ) : (
                    <Empty />
                )}
            </Modal>
        </>
    );
}
