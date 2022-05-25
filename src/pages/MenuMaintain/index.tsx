import React, { useState, useEffect } from "react";
import {
    Breadcrumb,
    Card,
    Button,
    Table,
    Tag,
    Popconfirm,
    message,
    Modal,
    Form,
    Input,
    Radio,
} from "antd";
import type { ColumnsType } from "antd/lib/table";
import type { RadioChangeEvent } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import "./index.scss";
import { getMenuList, addMenu, deleteMenu } from "../../api";

export default function MenuMaintain() {
    const [loading, setLoading] = useState(true);
    const [menulist, setMenulist] = useState([]);
    const [visible, setVisible] = useState(false);
    const [value, setValue] = useState(1);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const [form] = Form.useForm();
    interface DataType {
        id: string;
        sort: number;
        name: string;
        iconCls: string;
        path: string;
        url: string;
        component: string;
        tags: Array<string>;
    }
    const onFinish = (values: any) => {
        setConfirmLoading(true);
        addMenu({ ...values, id: form.getFieldValue("id") }).then(
            (res: any) => {
                if (res.code === 200) {
                    message.success("操作成功");
                    setVisible(false);
                    form.resetFields();
                    setConfirmLoading(false);
                } else {
                    message.error(res.error);
                    setConfirmLoading(false);
                }
            }
        );
    };
    const onChange = (e: RadioChangeEvent) => {
        setValue(e.target.value);
    };
    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 15 },
    };
    const handleCancel = () => {
        form.resetFields();
        setVisible(false);
    };

    const confirm = (item: any) => {
        deleteMenu(item.id).then((res: any) => {
            if (res.code === 200) {
                init();
                message.success("删除成功");
            } else {
                message.error(res);
            }
        });
    };

    const edit = (item: any) => {
        form.setFieldsValue({ ...item });
        setVisible(true);
    };

    const init = () => {
        getMenuList().then((res: any) => {
            if (res.code === 200) {
                setMenulist(res.data);
                setLoading(false);
            } else {
                console.log(11);

                message.error(res.error);
            }
        });
    };
    useEffect(() => {
        setVisible(visible);
    }, [visible]);
    useEffect(() => {
        init();
    }, []);
    const columns: ColumnsType<DataType> = [
        {
            title: "序号",
            dataIndex: "sort",
            width: 80,
            fixed: "left",
            sorter: (a, b) => a.sort - b.sort,
        },
        {
            title: "菜单名称",
            dataIndex: "name",
            fixed: "left",
            render: (text: any) => <a>{text}</a>,
        },
        {
            title: "图标",
            dataIndex: "iconCls",
        },
        {
            title: "权限匹配路径",
            dataIndex: "url",
        },
        {
            title: "React路由地址",
            dataIndex: "path",
        },
        {
            title: "component",
            dataIndex: "component",
        },
        // {
        //     title: "标识",
        //     key: "tags",
        //     dataIndex: "tags",
        //     render: (tags: any) => (
        //         <>
        //             {tags.map((tag: any) => {
        //                 let color = tag.length > 5 ? "geekblue" : "green";
        //                 if (tag === "loser") {
        //                     color = "volcano";
        //                 }
        //                 return (
        //                     <Tag color="#108ee9" key={tag}>
        //                         {tag.toUpperCase()}
        //                     </Tag>
        //                 );
        //             })}
        //         </>
        //     ),
        // },
        {
            title: "操作",
            align: "center",
            fixed: "right",
            width: 140,
            render: (item) => (
                <div className="control-group">
                    <Button
                        type="primary"
                        size="small"
                        onClick={() => {
                            edit(item);
                        }}
                    >
                        编辑
                    </Button>
                    <Popconfirm
                        title="确认删除？"
                        placement="left"
                        onConfirm={() => {
                            confirm(item);
                        }}
                        okText="确定"
                        cancelText="取消"
                    >
                        <Button type="primary" danger size="small">
                            删除
                        </Button>
                    </Popconfirm>
                </div>
            ),
        },
    ];

    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item>
                    <a href="">系统维护</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <a href="">菜单管理</a>
                </Breadcrumb.Item>
            </Breadcrumb>
            <Card
                style={{ width: "100%", marginTop: 20, overflow: "hidden" }}
                loading={loading}
            >
                <Button
                    type="primary"
                    style={{ marginRight: 15 }}
                    icon={<PlusOutlined />}
                    onClick={() => {
                        setVisible(true);
                    }}
                >
                    新增
                </Button>
                <Button type="primary" danger icon={<DeleteOutlined />}>
                    批量删除
                </Button>
                <Table
                    className="menuMainTainTable"
                    columns={columns}
                    dataSource={menulist || []}
                    scroll={{ x: 1300 }}
                    rowKey={(record) => record.id}
                />
            </Card>
            <Modal
                title={form.getFieldValue("id") ? "编辑" : "新增"}
                visible={visible}
                onOk={() => form.submit()}
                onCancel={handleCancel}
                confirmLoading={confirmLoading}
                okText="确定"
                cancelText="取消"
            >
                <Form
                    {...layout}
                    form={form}
                    onFinish={onFinish}
                    // initialValues={{ nodeFlag: 1 }}
                >
                    <Form.Item
                        name="nodeFlag"
                        label="类型"
                        rules={[
                            {
                                required: true,
                                message: "请选择类型",
                            },
                        ]}
                    >
                        <Radio.Group onChange={onChange} value={value}>
                            <Radio value={1}>节点</Radio>
                            <Radio value={0}>菜单</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        name="name"
                        label="菜单名称"
                        rules={[
                            {
                                required: true,
                                message: "请输入菜单名称",
                            },
                        ]}
                    >
                        <Input placeholder="请输入菜单名称" />
                    </Form.Item>
                    <Form.Item
                        name="iconCls"
                        label="菜单图标"
                        rules={[
                            {
                                required: true,
                                message: "请输入菜单图标",
                            },
                        ]}
                    >
                        <Input placeholder="请输入菜单图标" />
                    </Form.Item>
                    <Form.Item
                        name="url"
                        label="匹配路径"
                        rules={[
                            {
                                required: true,
                                message: "请输入权限匹配路径",
                            },
                        ]}
                    >
                        <Input placeholder="请输入权限匹配路径" />
                    </Form.Item>
                    <Form.Item
                        name="path"
                        label="路由地址"
                        rules={[
                            {
                                required: true,
                                message: "请输入路由地址",
                            },
                        ]}
                    >
                        <Input placeholder="请输入路由地址" />
                    </Form.Item>
                    <Form.Item name="component" label="component">
                        <Input placeholder="请输入component" />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}
