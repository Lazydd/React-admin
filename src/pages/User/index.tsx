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
    Radio,
    Select,
    InputNumber,
    Switch,
} from "antd";
import type { TransferDirection } from "antd/es/transfer";
import type { ColumnsType } from "antd/lib/table";
import {
    getUserList,
    resetUser,
    saveUser,
    deleteUser,
    getRoleList,
    relationRole,
    disableUser,
} from "api";
import "./index.scss";
import {
    DeleteOutlined,
    PlusOutlined,
    ApiOutlined,
    ToolOutlined,
    LockOutlined,
    UnlockOutlined,
} from "@ant-design/icons";
interface RecordType {
    key: string;
    roleName: string;
    disable: boolean;
}
interface UserInfoType {
    id: string;
    username: string;
    disable: boolean;
}
const { Search } = Input;

export default function User() {
    const [loading, setLoading] = useState(true);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [radio, setRadio] = useState(-10);
    const [disableVisible, setDisableVisible] = useState(false);
    const [relationVisible, setRelationVisible] = useState(false);
    const [userTableData, setUserTableData] = useState({
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
    const [userInfo, setUserInfo] = useState({} as UserInfoType);
    const [targetKeys, setTargetKeys] = useState<string[]>([]);
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

    const [form] = Form.useForm();
    const [disableform] = Form.useForm();
    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 15 },
    };
    const handleCancel = () => {
        form.resetFields();
        disableform.resetFields();
        setVisible(false);
        setDisableVisible(false);
        setConfirmLoading(false);
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
            render: (time: number) => (
                <div>{time == -1 ? "永久封禁" : time ? time + "秒" : ""}</div>
            ),
        },
        {
            title: "操作",
            align: "center",
            fixed: "right",
            width: 160,
            render: (item: any) => (
                <div className="control-group">
                    <Space size="middle">
                        {/* <Button
                            type="primary"
                            shape="circle"
                            icon={
                                item.disable ? (
                                    <LockOutlined />
                                ) : (
                                    <UnlockOutlined />
                                )
                            }
                            onClick={() => {
                                disable(item);
                            }}
                        ></Button> */}
                        <Switch
                            checkedChildren="启用"
                            unCheckedChildren="禁用"
                            defaultChecked={!item.disable}
                            onChange={(e) => switchChange(e, item)}
                        />
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

    const switchChange = (value: boolean, item: any) => {
        disableUser({
            time: value ? undefined : -1,
            id: item.id,
        })
            .then((res: any) => {
                if (res.code == 200) {
                    setDisableVisible(false);
                    message.success("保存成功");
                    setParams({ ...params, current: 1 });
                } else {
                    message.error(res.error);
                }
            })
            .finally(() => {
                setConfirmLoading(false);
            });
    };

    const radioChange = (e: any) => {
        setRadio(e.target.value);
    };

    const disableOnFinish = (values: any) => {
        let time;
        if (values.type == 0) {
            time = values.time;
        } else if (values.type == 1) {
            time = undefined;
        } else if (values.type == -1) {
            time = -1;
        }
        setConfirmLoading(true);
        disableUser({ time, id: disableform.getFieldValue("id") })
            .then((res: any) => {
                if (res.code == 200) {
                    setDisableVisible(false);
                    message.success("保存成功");
                    setParams({ ...params, current: 1 });
                } else {
                    message.error(res.error);
                }
            })
            .finally(() => {
                setConfirmLoading(false);
            });
    };

    const disable = (item: any) => {
        setDisableVisible(true);
        let type;
        if (item.disable && item.disableTime == -1) {
            type = -1;
        } else if (item.disable && item.disableTime != -1) {
            type = 0;
        } else if (!item.disable) {
            type = 1;
        }
        setRadio(item.disable && item.disableTime != -1 ? 0 : 1);
        disableform.setFieldsValue({
            ...item,
            type,
            time: type == 0 ? item.disableTime : undefined,
        });
    };

    const onSearch = (roleName: string) => {
        setParams({ ...params, roleName });
    };

    const relation = (item: any) => {
        setUserInfo(item);
        getRoleList({ userId: item.id }).then((res: any) => {
            if (res.code == 200) {
                let arr = res.data.map((item: any) => {
                    item.key = item.id;
                    return item;
                });
                let arr2 = res.data
                    .filter((item: any) => item.disabled)
                    .map((item: any) => {
                        item.key = item.id;
                        item.disabled = !item.disabled;
                        return item.key;
                    });

                setRoleList(arr);
                setTargetKeys(arr2);
            } else {
                message.error(res.error);
            }
        });
        setRelationVisible(true);
    };

    const pageChange = (current: number) => {
        setParams({ ...params, current });
    };

    const onSelectChange = (
        sourceSelectedKeys: string[],
        targetSelectedKeys: string[]
    ) => {
        setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
    };

    const relationSearch = (item: string) => {
        setRoleSearch(item);
    };

    const onChange = (
        newTargetKeys: string[],
        direction: TransferDirection,
        moveKeys: string[]
    ) => {
        setTargetKeys(newTargetKeys);
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
                message.success("重置密码成功，新密码为" + res.data);
            } else {
                message.error(res.error);
            }
        });
    };

    const relationRoleSubmit = () => {
        relationRole({
            userId: userInfo.id,
            roleIds: targetKeys?.join(","),
        }).then((res: any) => {
            if (res.code == 200) {
                message.success("绑定成功");
                setRelationVisible(false);
                setParams({ ...params, current: 1 });
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
                    setUserTableData({
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
                        根据筛选条件共查询到{userTableData.count}条结果
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
                    dataSource={userTableData.list || []}
                    scroll={{ x: 1300 }}
                    pagination={{
                        pageSize: params.size,
                        current: params.current,
                        onChange: pageChange,
                        total: userTableData.count,
                        showSizeChanger: false,
                    }}
                    rowKey={(record) => record.id}
                    loading={loading}
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
                onOk={() => relationRoleSubmit()}
                bodyStyle={{ display: "flex", justifyContent: "center" }}
                onCancel={relationCancel}
                width="750px"
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
                    selectedKeys={selectedKeys}
                    onSelectChange={onSelectChange}
                    render={(item) => item.roleName}
                    pagination
                />
            </Modal>
            {/* <Modal
                title="禁用"
                visible={disableVisible}
                onOk={() => disableform.submit()}
                onCancel={handleCancel}
                confirmLoading={confirmLoading}
                forceRender
                okText="确定"
                cancelText="取消"
            >
                <Form {...layout} form={disableform} onFinish={disableOnFinish}>
                    <Form.Item
                        name="type"
                        label="状态"
                        rules={[
                            {
                                required: true,
                                message: "请选择状态",
                            },
                        ]}
                    >
                        <Radio.Group
                            buttonStyle="solid"
                            onChange={(e) => radioChange(e)}
                        >
                            <Radio.Button value={0}>禁用</Radio.Button>
                            <Radio.Button value={1}>启用</Radio.Button>
                            <Radio.Button value={-1}>永久封禁</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                    {radio == 0 ? (
                        <Form.Item
                            name="time"
                            label="封禁时长"
                            rules={[
                                {
                                    required: true,
                                    message: "请输入封禁时长",
                                },
                            ]}
                        >
                            <InputNumber min={1} />
                        </Form.Item>
                    ) : (
                        ""
                    )}
                </Form>
            </Modal> */}
        </>
    );
}
