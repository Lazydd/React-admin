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
    Transfer,
} from "antd";
import type { TransferDirection } from "antd/es/transfer";
import type { ColumnsType } from "antd/lib/table";
import moment from "moment";
import {
    getRoleListPage,
    saveRole,
    updateRole,
    deleteRole,
    relationApi,
    getAuthorityList,
} from "api";
import "./index.scss";
import {
    EditOutlined,
    DeleteOutlined,
    PlusOutlined,
    ApiOutlined,
} from "@ant-design/icons";
const { Search } = Input;

export default function Role() {
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
    const [userInfo, setUserInfo] = useState({} as UserInfoType);
    const [targetKeys, setTargetKeys] = useState<string[]>([]);
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

    const [form] = Form.useForm();
    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 15 },
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
    interface RecordType {
        key: string;
        apiName: string;
        disable: boolean;
    }
    interface UserInfoType {
        id: string;
        username: string;
        disable: boolean;
    }
    const columns: ColumnsType<DataType> = [
        {
            title: "??????",
            dataIndex: "index",
            width: 80,
            fixed: "left",

            render: (text: any, record: any, index: number) =>
                `${(params.current - 1) * params.size + index + 1}`,
        },
        {
            title: "????????????",
            dataIndex: "roleName",
            width: 200,
        },
        {
            title: "????????????",
            dataIndex: "roleFlag",
            width: 200,
        },
        {
            title: "????????????",
            width: 180,
            dataIndex: "createdTime",
            render: (text: any) => moment(text).format("YYYY-MM-DD HH:mm:ss"),
        },
        {
            title: "????????????",
            width: 180,
            dataIndex: "updatedTime",
            render: (text: any) =>
                text ? moment(text).format("YYYY-MM-DD HH:mm:ss") : "",
        },
        {
            title: "?????????",
            width: 180,
            dataIndex: "createdBy",
        },
        {
            title: "?????????",
            width: 180,
            dataIndex: "updatedBy",
        },
        {
            title: "??????",
            align: "center",
            fixed: "right",
            width: 160,
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
                        <Button
                            type="primary"
                            shape="circle"
                            icon={<ApiOutlined />}
                            onClick={() => {
                                relation(item);
                            }}
                        ></Button>
                        <Popconfirm
                            title="???????????????"
                            placement="left"
                            onConfirm={() => {
                                confirm(item);
                            }}
                            okText="??????"
                            cancelText="??????"
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

    const relationCancel = () => {
        form.resetFields();
        setRelationVisible(false);
    };

    const edit = (item: any) => {
        setVisible(true);
        form.setFieldsValue({ ...item });
    };

    const relation = (item: any) => {
        setUserInfo(item);
        getAuthorityList({ roleId: item.id }).then((res: any) => {
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

    const onFinish = (values: any) => {
        setConfirmLoading(true);
        let id = form.getFieldValue("id");
        if (id) {
            updateRole({ ...values, id })
                .then((res: any) => {
                    if (res.code == 200) {
                        setVisible(false);
                        setParams({ ...params, current: 1 });
                        message.success("????????????");
                    } else {
                        message.error(res.error);
                    }
                })
                .finally(() => {
                    setConfirmLoading(false);
                });
        } else {
            saveRole(values)
                .then((res: any) => {
                    if (res.code == 200) {
                        setVisible(false);
                        setParams({ ...params, current: 1 });
                        message.success("????????????");
                    } else {
                        message.error(res.error);
                    }
                })
                .finally(() => {
                    setConfirmLoading(false);
                });
        }
    };

    const relationApiSubmit = () => {
        relationApi({
            roleId: userInfo.id,
            apiIds: targetKeys?.join(","),
        }).then((res: any) => {
            if (res.code == 200) {
                message.success("????????????");
                setRelationVisible(false);
                setParams({ ...params, current: 1 });
            } else {
                message.error(res.error);
            }
        });
    };

    const onChange = (
        newTargetKeys: string[],
        direction: TransferDirection,
        moveKeys: string[]
    ) => {
        setTargetKeys(newTargetKeys);
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

    const onSearch = (roleName: string) => {
        setParams({ ...params, roleName });
    };

    const pageChange = (current: number) => {
        setParams({ ...params, current });
    };

    const confirm = (item: any) => {
        deleteRole(item.id).then((res: any) => {
            if (res.code == 200) {
                message.success("????????????");
                setParams({ ...params, current: 1 });
            } else {
                message.error(res.error);
            }
        });
    };

    const getData = async () => {
        const res: any = await getRoleListPage({
            ...params,
            roleName: params.roleName || undefined,
        });
        if (res.code == 200) {
            const { records, total } = res;
            setAticleTableData({
                list: records,
                count: total,
            });
        } else {
            message.error(res.error);
        }

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
                    <a href="">??????</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <a href="">????????????</a>
                </Breadcrumb.Item>
            </Breadcrumb>
            <Card style={{ width: "100%", marginTop: 20, overflow: "hidden" }}>
                <Search
                    placeholder="?????????????????????"
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
                        ??????????????????????????????{articleTableData.count}?????????
                    </p>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => {
                            setVisible(true);
                        }}
                    >
                        ??????
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
                    loading={loading}
                />
            </Card>
            <Modal
                title={form.getFieldValue("id") ? "??????" : "??????"}
                visible={visible}
                onOk={() => form.submit()}
                onCancel={() => setVisible(false)}
                afterClose={() => form.resetFields()}
                confirmLoading={confirmLoading}
                forceRender
                okText="??????"
                cancelText="??????"
            >
                <Form {...layout} form={form} onFinish={onFinish}>
                    <Form.Item
                        name="roleName"
                        label="????????????"
                        rules={[
                            {
                                required: true,
                                message: "?????????????????????",
                            },
                        ]}
                    >
                        <Input placeholder="?????????????????????" />
                    </Form.Item>
                </Form>
            </Modal>
            <Modal
                title="??????Api"
                visible={relationVisible}
                onOk={() => relationApiSubmit()}
                bodyStyle={{ display: "flex", justifyContent: "center" }}
                onCancel={relationCancel}
                width="750px"
                confirmLoading={confirmLoading}
                forceRender
                okText="??????"
                cancelText="??????"
            >
                <Transfer
                    dataSource={roleList}
                    targetKeys={targetKeys}
                    onChange={onChange}
                    showSearch
                    onSearch={relationSearch}
                    selectedKeys={selectedKeys}
                    onSelectChange={onSelectChange}
                    render={(item) => item.apiName}
                    pagination
                />
            </Modal>
        </>
    );
}
