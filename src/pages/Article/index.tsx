import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    Breadcrumb,
    Card,
    Radio,
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

import type { ColumnsType } from "antd/lib/table";

import "./index.scss";
import {
    SearchOutlined,
    EditOutlined,
    DeleteOutlined,
} from "@ant-design/icons";

import SeleteType from "../../components/SeleteType";

import { getArticleTableData, deleteArticle } from "../../api";
export default function Article() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [articleTableData, setAticleTableData] = useState({
        list: [],
        count: 0,
    });
    const [params, setParams] = useState({
        page: 1,
        per_page: 10,
    });

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
            render: (text: any) => <Image height={150} src={text.images[0]} />,
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

    const getData = async () => {
        const res = await getArticleTableData(params);
        const { results, total_count } = res.data;
        setAticleTableData({
            list: results,
            count: total_count,
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
                    <a href="">内容管理</a>
                </Breadcrumb.Item>
            </Breadcrumb>
            <Card style={{ width: "100%", marginTop: 20, overflow: "hidden" }}>
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

                    <Form.Item label="频道" name="channel_id">
                        <SeleteType />
                    </Form.Item>
                    <Form.Item label="日期" name="date">
                        <DatePicker.RangePicker />
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
