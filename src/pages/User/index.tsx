import React, { useState, useEffect } from "react";
import {
    Breadcrumb,
    Card,
    Button,
    Table,
    Popconfirm,
    Space,
    Form,
    message,
    Modal,
    Input,
} from "antd";

import type { ColumnsType } from "antd/lib/table";
import moment from "moment";
import "./index.scss";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
const { Search } = Input;

import { getUserList, saveUser, updateUser, deleteUser } from "../../api";
export default function User() {
    const [loading, setLoading] = useState(true);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [articleTableData, setAticleTableData] = useState({
        list: [],
        count: 0,
    });
    const [params, setParams] = useState({
        current: 1,
        roleName: "",
        size: 10,
    });

    const [form] = Form.useForm();
    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 15 },
    };
    const handleCancel = () => {
        form.resetFields();
        setVisible(false);
    };
    interface DataType {
        id: string;
        index: number;
        roleName: string;
        roleFlag: string;
        createdTime: string;
        updatedTime: string;
        createdBy: string;
        updatedBy: string;
    }
    const columns: ColumnsType<DataType> = [
        {
            title: "序号",
            dataIndex: "index",
            width: 80,
            fixed: "left",

            render: (text: any, record: any, index: number) =>
                `${(params.current - 1) * params.size + index + 1}`,
        },
        {
            title: "角色名称",
            dataIndex: "roleName",
            width: 200,
            render: (text: any) => <a>{text}</a>,
        },
        {
            title: "角色拼音",
            dataIndex: "roleFlag",
            width: 200,
            render: (text: any) => <a>{text}</a>,
        },
        {
            title: "创建时间",
            width: 180,
            dataIndex: "createdTime",
            render: (text: any) => moment(text).format("YYYY-MM-DD HH:mm:ss"),
        },
        {
            title: "更新时间",
            width: 180,
            dataIndex: "updatedTime",
            render: (text: any) =>
                text ? moment(text).format("YYYY-MM-DD HH:mm:ss") : "",
        },
        {
            title: "创建人",
            width: 180,
            dataIndex: "createdBy",
        },
        {
            title: "更新人",
            width: 180,
            dataIndex: "updatedBy",
        },
        {
            title: "操作",
            align: "center",
            fixed: "right",
            width: 140,
            render: (item) => (
                <div className="control-group">
                    <Space size="middle">
                        <Button
                            type="primary"
                            shape="circle"
                            icon={<EditOutlined />}
                            onClick={() => {
                                edit(item);
                            }}
                        ></Button>
                        <Popconfirm
                            title="确认删除？"
                            placement="left"
                            onConfirm={() => {
                                confirm(item);
                            }}
                            okText="确定"
                            cancelText="取消"
                        >
                            <Button
                                type="primary"
                                danger
                                shape="circle"
                                icon={<DeleteOutlined />}
                            ></Button>
                        </Popconfirm>
                    </Space>
                </div>
            ),
        },
    ];
    const edit = (item: any) => {
        setVisible(true);
        form.setFieldsValue({ ...item });
    };

    const onFinish = (values: any) => {
        setConfirmLoading(true);
        let id = form.getFieldValue("id");
        if (id) {
            updateUser({ ...values, id })
                .then((res: any) => {
                    if (res.code == 200) {
                        setVisible(false);
                        message.success("保存成功");
                    } else {
                        message.error(111111111);
                    }
                })
                .finally(() => {
                    setConfirmLoading(false);
                });
        } else {
            saveUser(values)
                .then((res: any) => {
                    if (res.code == 200) {
                        setVisible(false);
                        message.success("保存成功");
                    } else {
                        message.error(111111111);
                    }
                })
                .finally(() => {
                    setConfirmLoading(false);
                });
        }
        setParams({ ...params, current: 1 });
    };

    const onSearch = (roleName: string) => {
        setParams({ ...params, roleName });
    };

    const pageChange = (current: number) => {
        setParams({ ...params, current });
    };

    const confirm = (item: any) => {
        deleteUser(item.id).then((res: any) => {
            message.success("删除成功");
            setParams({ ...params, current: 1 });
        });
    };

    const getData = async () => {
        const res: any = await getUserList({
            ...params,
            roleName: params.roleName || undefined,
        });
        const { records, total } = res;
        setAticleTableData({
            list: records,
            count: total,
        });
        setLoading(false);
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
                    <a href="">角色管理</a>
                </Breadcrumb.Item>
            </Breadcrumb>
            <Card style={{ width: "100%", marginTop: 20, overflow: "hidden" }}>
                <Search
                    placeholder="请输入角色名称"
                    loading={loading}
                    enterButton
                    onSearch={onSearch}
                />
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
                        icon={<PlusOutlined />}
                        onClick={() => {
                            setVisible(true);
                        }}
                    >
                        新增
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
                    }}
                    rowKey={(record) => record.id}
                />
            </Card>
            <Modal
                title={form.getFieldValue("id") ? "编辑" : "新增"}
                visible={visible}
                onOk={() => form.submit()}
                onCancel={handleCancel}
                confirmLoading={confirmLoading}
                forceRender
                okText="确定"
                cancelText="取消"
            >
                <Form
                    {...layout}
                    form={form}
                    onFinish={onFinish}
                    initialValues={{ nodeFlag: 1 }}
                >
                    <Form.Item
                        name="roleName"
                        label="角色名称"
                        rules={[
                            {
                                required: true,
                                message: "请输入角色名称",
                            },
                        ]}
                    >
                        <Input placeholder="请输入角色名称" />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}
