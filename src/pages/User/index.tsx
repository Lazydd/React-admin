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
    Tag,
    Input,
    Transfer,
} from "antd";
import type { TransferDirection } from "antd/es/transfer";
import type { ColumnsType } from "antd/lib/table";
import moment from "moment";
import "./index.scss";
import {
    EditOutlined,
    DeleteOutlined,
    PlusOutlined,
    ApiOutlined,
    ToolOutlined,
} from "@ant-design/icons";
interface RecordType {
    key: string;
    roleName: string;
    description: string;
    chosen: boolean;
}
const { Search } = Input;

import {
    getUserList,
    resetUser,
    saveUser,
    deleteUser,
    getRoleList,
} from "../../api";
export default function User() {
    const [loading, setLoading] = useState(true);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [relationVisible, setRelationVisible] = useState(false);
    const [articleTableData, setAticleTableData] = useState({
        list: [],
        count: 0,
    });
    const [params, setParams] = useState({
        current: 1,
        roleName: "",
        size: 10,
    });
    const [roleList, setRoleList] = useState<RecordType[]>([]);
    const [roleSearch, setRoleSearch] = useState<string>();
    const [oneWay, setOneWay] = useState(false);
    const [mockData, setMockData] = useState<RecordType[]>([]);
    const [targetKeys, setTargetKeys] = useState<string[]>([]);

    const [form] = Form.useForm();
    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 15 },
    };
    const handleCancel = () => {
        form.resetFields();
        setVisible(false);
    };
    const relationCancel = () => {
        form.resetFields();
        setRelationVisible(false);
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
            title: "用户名称",
            dataIndex: "username",
            width: 100,
        },
        {
            title: "是否禁用",
            dataIndex: "disable",
            width: 150,
            render: (text: any) =>
                text ? (
                    <Tag color="#f50">是</Tag>
                ) : (
                    <Tag color="#87d068">否</Tag>
                ),
        },
        {
            title: "封禁时长",
            width: 180,
            dataIndex: "disableTime",
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
                            icon={<ApiOutlined />}
                            onClick={() => {
                                relation(item);
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
                        <Popconfirm
                            title="确认重置密码？"
                            placement="left"
                            onConfirm={() => {
                                reset(item);
                            }}
                            okText="确定"
                            cancelText="取消"
                        >
                            <Button
                                type="primary"
                                danger
                                shape="circle"
                                icon={<ToolOutlined />}
                            ></Button>
                        </Popconfirm>
                    </Space>
                </div>
            ),
        },
    ];
    // const edit = (item: any) => {
    //     setVisible(true);
    //     form.setFieldsValue({ ...item });
    // };

    const onFinish = (values: any) => {
        setConfirmLoading(true);
        saveUser(values)
            .then((res: any) => {
                if (res.code == 200) {
                    setVisible(false);
                    setParams({ ...params, current: 1 });
                    message.success("保存成功");
                } else {
                    message.error(res.error);
                }
            })
            .finally(() => {
                setConfirmLoading(false);
            });
    };

    const onSearch = (roleName: string) => {
        setParams({ ...params, roleName });
    };

    const relation = (item: any) => {
        getRoleList({ userId: item.id }).then((res: any) => {
            if (res.code == 200) {
                setRoleList(res.data);
            } else {
                message.error(res.error);
            }
        });
        setRelationVisible(true);
    };

    const pageChange = (current: number) => {
        setParams({ ...params, current });
    };

    const relationSearch = (item: string) => {
        setRoleSearch(item);
    };

    const onChange = (
        newTargetKeys: string[],
        direction: TransferDirection,
        moveKeys: string[]
    ) => {
        // console.log(newTargetKeys, direction, moveKeys);
        // setTargetKeys(newTargetKeys);
    };

    const confirm = (item: any) => {
        deleteUser(item.id).then((res: any) => {
            if (res.code == 200) {
                message.success("删除成功");
                setParams({ ...params, current: 1 });
            } else {
                message.error(res.error);
            }
        });
    };

    const reset = (item: any) => {
        resetUser(item.id).then((res: any) => {
            if (res.code == 200) {
                message.success("重置密码成功");
            } else {
                message.error(res.error);
            }
        });
    };

    const getData = async () => {
        getUserList({
            ...params,
            roleName: params.roleName || undefined,
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
        const newTargetKeys = [];
        const newMockData = [];
        for (let i = 0; i < 2000; i++) {
            const data = {
                key: i.toString(),
                title: `content${i + 1}`,
                description: `description of content${i + 1}`,
                chosen: Math.random() * 2 > 1,
            };
            if (data.chosen) {
                newTargetKeys.push(data.key);
            }
            newMockData.push(data);
        }

        setTargetKeys(newTargetKeys);
        setMockData(roleList);
    }, [params]);

    // useEffect(() => {
    //     getRoleList({ userId }).then((res: any) => {
    //         if (res.code == 200) {
    //             setRoleList(res.records);
    //         } else {
    //             message.error(res.error);
    //         }
    //     });
    // }, []);
    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item>
                    <a href="">首页</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <a href="">用户管理</a>
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
                <Form {...layout} form={form} onFinish={onFinish}>
                    <Form.Item
                        name="username"
                        label="用户名"
                        rules={[
                            {
                                required: true,
                                message: "请输入用户名",
                            },
                        ]}
                    >
                        <Input placeholder="请输入用户名" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="密码"
                        rules={[
                            {
                                required: true,
                                message: "请输入密码",
                            },
                        ]}
                    >
                        <Input placeholder="请输入密码" />
                    </Form.Item>
                </Form>
            </Modal>
            <Modal
                title="绑定角色"
                visible={relationVisible}
                onOk={() => form.submit()}
                onCancel={relationCancel}
                confirmLoading={confirmLoading}
                forceRender
                okText="确定"
                cancelText="取消"
            >
                <Transfer
                    dataSource={roleList}
                    targetKeys={targetKeys}
                    onChange={onChange}
                    showSearch
                    onSearch={relationSearch}
                    render={(item) => item.roleName}
                    oneWay={oneWay}
                    pagination
                />
            </Modal>
        </>
    );
}
