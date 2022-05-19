import React, { useState, useEffect } from "react";
import { Breadcrumb, Card, Button, Table, Tag, Space } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import './index.scss'
import { getMenuList } from "../../api";
export default function MenuMaintain() {
    const [loading, setLoading] = useState(true);
    const [menulist, setMenulist] = useState([]);

    function init() {
        getMenuList()
            .then((res: any) => {
                setMenulist(res.data);
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            })
            .catch((err: any) => {
                console.log(err);
            });
    }
    useEffect(() => {
        init();
    }, []);
    const columns = [
        {
            title: "菜单名称",
            dataIndex: "name",
            key: "name",
            render: (text: any) => <a>{text}</a>,
        },
        {
            title: "图标",
            dataIndex: "age",
            key: "age",
        },
        {
            title: "权限匹配路径",
            dataIndex: "address",
            key: "address",
        },
        {
            title: "React路由地址",
            dataIndex: "address",
            key: "address",
        },
        {
            title: "component",
            dataIndex: "address",
            key: "address",
        },
        {
            title: "标识",
            key: "tags",
            dataIndex: "tags",
            render: (tags: any) => (
                <>
                    {tags.map((tag: any) => {
                        let color = tag.length > 5 ? "geekblue" : "green";
                        if (tag === "loser") {
                            color = "volcano";
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: "操作",
            key: "action",
            render: (text: any, record: any) => (
                <Space size="middle">
                    <a>Delete</a>
                </Space>
            ),
        },
    ];

    const data = [
        {
            key: "1",
            name: "John Brown",
            age: 32,
            address: "New York No. 1 Lake Park",
            tags: ["nice", "developer"],
        },
        {
            key: "2",
            name: "Jim Green",
            age: 42,
            address: "London No. 1 Lake Park",
            tags: ["loser"],
        },
        {
            key: "3",
            name: "Joe Black",
            age: 32,
            address: "Sidney No. 1 Lake Park",
            tags: ["cool", "teacher"],
        },
    ];
    return (
        <div>
            <Breadcrumb>
                <Breadcrumb.Item>
                    <a href="">系统维护</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <a href="">菜单管理</a>
                </Breadcrumb.Item>
            </Breadcrumb>
            <Card style={{ width: "100%", marginTop: 20 }} loading={loading}>
                <Button
                    type="primary"
                    style={{ marginRight: 15 }}
                    icon={<PlusOutlined />}
                >
                    新增
                </Button>
                <Button type="primary" danger icon={<DeleteOutlined />}>
                    批量删除
                </Button>
                <Table className="menuMainTainTable" columns={columns} dataSource={data} />
            </Card>
        </div>
    );
}
