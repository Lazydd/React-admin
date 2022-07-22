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
    Switch,
    Tooltip,
    Radio,
    DatePicker,
} from "antd";
import type { TransferDirection } from "antd/es/transfer";
import type { ColumnsType } from "antd/lib/table";
import { deleteUser, getTaskList, saveTask, pauseTask, resumeTask } from "api";
import "./index.scss";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";

const { Search, TextArea } = Input;
import moment from "moment";

export default function Task() {
    const [loading, setLoading] = useState(true);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [radio, setRadio] = useState(-10);
    const [userTableData, setUserTableData] = useState({
        list: [],
        count: 0,
    });
    const [params, setParams] = useState({
        current: 1,
        roleName: "",
        size: 10,
    });
    const [roleSearch, setRoleSearch] = useState<string>();
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
        setConfirmLoading(false);
    };
    interface DataType {
        sequenceId: string;
        index: number;
        jobDetailName: string;
        jobCronExpression: boolean;
        groupName: string;
        timeZone: string;
        triggerState: string;
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
            title: "任务名称",
            dataIndex: "jobDetailName",
            width: 200,
        },
        {
            title: "任务描述",
            dataIndex: "jobCronExpression",
            width: 200,
            ellipsis: {
                showTitle: false,
            },
            render: (text: string) => (
                <Tooltip placement="topLeft" title={text}>
                    {text}
                </Tooltip>
            ),
        },
        {
            title: "组名",
            width: 180,
            dataIndex: "groupName",
        },
        {
            title: "trigger名称",
            width: 180,
            dataIndex: "triggerKey",
            render: (text: any) => <span>{text.name}</span>,
        },
        {
            title: "trigger组",
            width: 180,
            dataIndex: "triggerKey",
            render: (text: any) => <span>{text.group}</span>,
        },
        {
            title: "时区",
            width: 180,
            dataIndex: "timeZone",
        },
        {
            title: "状态",
            width: 180,
            dataIndex: "triggerState",
            render: (text: string) => <span>{formatType(text)}</span>,
        },
        {
            title: "操作",
            align: "center",
            fixed: "right",
            width: 200,
            render: (item) => (
                <div className="control-group">
                    <Space size="middle">
                        <Switch
                            checkedChildren="正常"
                            unCheckedChildren="暂停"
                            defaultChecked={
                                item.triggerState == "NORMAL" ? true : false
                            }
                            onChange={(e) => switchChange(e, item)}
                        />
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
    // const edit = (item: any) => {
    //     setVisible(true);
    //     form.setFieldsValue({ ...item });
    // };

    const formatType = (item: string) => {
        let str = "";
        switch (item) {
            case "NONE":
                str = "空";
                break;
            case "NORMAL":
                str = "正常";
                break;
            case "PAUSED":
                str = "暂停";
                break;
            case "COMPLETE":
                str = "完成";
                break;
            case "ERROR":
                str = "错误";
                break;
            case "BLOCKED":
                str = "阻止";
                break;
        }
        return str;
    };

    const onFinish = (values: any) => {
        setConfirmLoading(true);
        values.startTime = moment(values.startTime).format(
            "YYYY-MM-DD HH:mm:ss"
        );
        values.endTime = moment(values.endTime).format("YYYY-MM-DD HH:mm:ss");

        saveTask(values)
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
        if (value) {
            pauseTask({
                groupName: item?.groupName,
                name: item?.triggerKey?.name,
            })
                .then((res: any) => {
                    if (res.code == 200) {
                        if (res.data) {
                            message.success("操作成功");
                            setParams({ ...params, current: 1 });
                        }
                    } else {
                        message.error(res.error);
                    }
                })
                .finally(() => {
                    setConfirmLoading(false);
                });
        } else {
            resumeTask({
                groupName: item?.groupName,
                name: item?.triggerKey?.name,
            })
                .then((res: any) => {
                    if (res.code == 200) {
                        if (res.data) {
                            message.success("操作成功");
                            setParams({ ...params, current: 1 });
                        }
                    } else {
                        message.error(res.error);
                    }
                })
                .finally(() => {
                    setConfirmLoading(false);
                });
        }
    };

    const disable = (item: any) => {
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

    const getData = async () => {
        const res: any = await getTaskList({
            ...params,
            roleName: params.roleName || undefined,
        });
        if (res.code == 200) {
            setUserTableData({
                list: res.data,
                count: res.total,
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
                    <a href="">首页</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <a href="">任务管理</a>
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
                        根据筛选条件共查询到{userTableData.count || 0}条结果
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
                    rowKey={(record) => record.jobDetailName}
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
                width={1000}
            >
                <Form
                    {...layout}
                    form={form}
                    onFinish={onFinish}
                    wrapperCol={{ span: 18 }}
                >
                    <div className="form-group">
                        <div className="form-item">
                            <Form.Item
                                name="jobName"
                                label="任务名称"
                                rules={[
                                    {
                                        required: true,
                                        message: "请输入任务名称",
                                    },
                                ]}
                            >
                                <Input placeholder="请输入任务名称" />
                            </Form.Item>
                            <Form.Item
                                name="jobGroup"
                                label="任务分组"
                                rules={[
                                    {
                                        required: true,
                                        message: "请输入任务分组",
                                    },
                                ]}
                            >
                                <Input placeholder="请输入任务分组" />
                            </Form.Item>
                            <Form.Item
                                name="jobDescription"
                                label="任务描述"
                                rules={[
                                    {
                                        required: true,
                                        message: "请输入任务描述",
                                    },
                                ]}
                            >
                                <TextArea
                                    placeholder="请输入任务描述"
                                    autoSize={{ minRows: 3, maxRows: 6 }}
                                />
                            </Form.Item>
                            <Form.Item
                                name="jobShouldRecover"
                                label="是否可恢复"
                                rules={[
                                    {
                                        required: true,
                                        message: "请选择是否可恢复",
                                    },
                                ]}
                            >
                                <Radio.Group>
                                    <Radio value={true}>是</Radio>
                                    <Radio value={false}>否</Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item
                                name="startTime"
                                label="开始时间"
                                rules={[
                                    {
                                        required: true,
                                        message: "请选择开始时间",
                                    },
                                ]}
                            >
                                <DatePicker
                                    showTime={{ format: "HH:mm:ss" }}
                                    format="YYYY-MM-DD HH:mm:ss"
                                />
                            </Form.Item>
                            <Form.Item
                                name="className"
                                label="className"
                                rules={[
                                    {
                                        required: true,
                                        message: "请选择className",
                                    },
                                ]}
                            >
                                <TextArea
                                    placeholder="请输入cron表达式"
                                    autoSize={{ minRows: 3, maxRows: 6 }}
                                />
                            </Form.Item>
                        </div>
                        <div className="form-item">
                            <Form.Item
                                name="triggerName"
                                label="trigger名称"
                                rules={[
                                    {
                                        required: true,
                                        message: "请输入trigger名称",
                                    },
                                ]}
                            >
                                <Input placeholder="请输入trigger名称" />
                            </Form.Item>
                            <Form.Item
                                name="triggerGroup"
                                label="trigger分组"
                                rules={[
                                    {
                                        required: true,
                                        message: "请输入trigger分组",
                                    },
                                ]}
                            >
                                <Input placeholder="请输入trigger分组" />
                            </Form.Item>
                            <Form.Item
                                name="triggerDescription"
                                label="trigger描述"
                                rules={[
                                    {
                                        required: true,
                                        message: "请输入trigger描述",
                                    },
                                ]}
                            >
                                <TextArea
                                    placeholder="请输入trigger描述"
                                    autoSize={{ minRows: 3, maxRows: 6 }}
                                />
                            </Form.Item>
                            <Form.Item
                                name="jobDurability"
                                label="任务持久化"
                                rules={[
                                    {
                                        required: true,
                                        message: "请选择任务持久化",
                                    },
                                ]}
                            >
                                <Radio.Group>
                                    <Radio value={true}>是</Radio>
                                    <Radio value={false}>否</Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item
                                name="endTime"
                                label="结束时间"
                                rules={[
                                    {
                                        required: true,
                                        message: "请选择结束时间",
                                    },
                                ]}
                            >
                                <DatePicker
                                    showTime={{ format: "HH:mm:ss" }}
                                    format="YYYY-MM-DD HH:mm:ss"
                                />
                            </Form.Item>
                            <Form.Item
                                name="cron"
                                label="cron表达式"
                                rules={[
                                    {
                                        required: true,
                                        message: "请输入cron表达式",
                                    },
                                ]}
                            >
                                <TextArea
                                    placeholder="请输入cron表达式"
                                    autoSize={{ minRows: 3, maxRows: 6 }}
                                />
                            </Form.Item>
                        </div>
                    </div>
                </Form>
            </Modal>
        </>
    );
}
