import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    Breadcrumb,
    Card,
    Radio,
    Select,
    DatePicker,
    Button,
    Table,
    Popconfirm,
    Tag,
    Space,
    Form,
    Image,
    message,
} from "antd";
import moment from "moment";
import type { ColumnsType } from "antd/lib/table";
import locale from "antd/lib/locale/zh_CN";
import "./index.scss";
import {
    SearchOutlined,
    EditOutlined,
    DeleteOutlined,
} from "@ant-design/icons";

import { getArticle, getArticleTableData, deleteArticle } from "../../api";
export default function Article() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [optionlist, setOptionlist] = useState([]);
    const [articleTableData, setAticleTableData] = useState({
        list: [],
        count: 0,
    });
    const [params, setParams] = useState({
        page: 1,
        per_page: 10,
    });

    const dateFormat = "YYYY/MM/DD";
    interface DataType {
        id: string;
        index: number;
        cover: string;
        title: string;
        status: string;
        pubdate: string;
        read_count: number;
        like_count: number;
        component: number;
        tags: Array<string>;
    }
    const columns: ColumnsType<DataType> = [
        {
            title: "序号",
            dataIndex: "index",
            width: 80,
            fixed: "left",
            sorter: (a, b) => {
                return a.index - b.index;
            },
            render: (text: any, record: any, index: number) =>
                `${(params.page - 1) * params.per_page + index + 1}`,
        },
        {
            title: "标题",
            dataIndex: "title",
            width: 200,
            fixed: "left",
            render: (text: any) => <a>{text}</a>,
        },
        {
            title: "封面",
            dataIndex: "cover",
            width: 200,
            render: (text: any) => (
                // <Image.PreviewGroup>
                //     {text.images.map((item: any, i: number) => (
                //         <Image
                //             key={item}
                //             width={200}
                //             height={150}
                //             src={item}
                //             style={{ display: i !== 0 ? "none" : "" }}
                //         ></Image>
                //     ))}
                // </Image.PreviewGroup>
                <Image width={200} height={150} src={text.images[0]} />
            ),
        },
        {
            title: "状态",
            dataIndex: "status",
            render: (text: any) => <Tag color="green">审核通过</Tag>,
        },
        {
            title: "发布时间",
            width: 180,
            dataIndex: "pubdate",
        },
        {
            title: "阅读数",
            dataIndex: "read_count",
            sorter: (a, b) => {
                return a.read_count - b.read_count;
            },
        },
        {
            title: "评论数",
            dataIndex: "component",
            sorter: (a, b) => {
                return a.component - b.component;
            },
        },
        {
            title: "点赞数",
            dataIndex: "like_count",
            sorter: (a, b) => {
                return a.like_count - b.like_count;
            },
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
    const edit = (e: any) => {
        navigate("/publish?id=" + e.id);
    };

    const onFinish = (e: any) => {
        const _params = {
            status: null,
            channel_id: null,
            begin_pubdate: null,
            end_pubdate: null,
        };
        const { status, channel_id, date } = e;
        if (status !== -1) {
            _params.status = status;
        }
        if (channel_id) {
            _params.channel_id = channel_id;
        }
        if (date) {
            const [begin_pubdate, end_pubdate] = date;
            _params.begin_pubdate = begin_pubdate.format("YYYY-MM-DD");
            _params.end_pubdate = end_pubdate.format("YYYY-MM-DD");
        }
        setParams({ ...params, ..._params, page: 1 });
    };

    const pageChange = (page: number) => {
        setParams({ ...params, page });
    };

    const confirm = (item: Object) => {
        deleteArticle(item).then((res: any) => {
            message.success("删除成功");
            setParams({ ...params, page: 1 });
        });
    };

    const init = () => {
        getArticle().then((res) => {
            setOptionlist(res.data?.channels);
            setLoading(false);
        });
    };

    const getData = async () => {
        const res = await getArticleTableData(params);
        const { results, total_count } = res.data;
        setAticleTableData({
            list: results,
            count: total_count,
        });
    };

    useEffect(() => {
        init();
    }, []);

    useEffect(() => {
        getData();
    }, [params]);
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
                <Form onFinish={onFinish}>
                    <Form.Item label="状态" name="status" initialValue={-1}>
                        <Radio.Group buttonStyle="solid">
                            <Radio.Button value={-1}>全部</Radio.Button>
                            <Radio.Button value={0}>草稿</Radio.Button>
                            <Radio.Button value={1}>待审核</Radio.Button>
                            <Radio.Button value={2}>审核通过</Radio.Button>
                            <Radio.Button value={3}>审核失败</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                    <Button
                        type="primary"
                        className="control"
                        icon={<SearchOutlined />}
                        htmlType="submit"
                    >
                        筛选
                    </Button>
                    <Form.Item label="频道" name="channel_id">
                        <Select placeholder="请选择频道" style={{ width: 120 }}>
                            {optionlist.map((item: any) => (
                                <Select.Option value={item.id} key={item.id}>
                                    {item.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="日期" name="date">
                        <DatePicker.RangePicker />
                    </Form.Item>
                </Form>
                <p>根据筛选条件共查询到{articleTableData.count}条结果</p>
                <Table
                    className="menuMainTainTable"
                    columns={columns}
                    dataSource={articleTableData.list || []}
                    scroll={{ x: 1300 }}
                    pagination={{
                        pageSize: params.per_page,
                        current: params.page,
                        onChange: pageChange,
                        total: articleTableData.count,
                    }}
                    rowKey={(record) => record.id}
                />
            </Card>
        </>
    );
}
