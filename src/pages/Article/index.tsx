import React, { useState, useEffect } from "react";
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

import { getArticle, getArticleTableData } from "../../api";
export default function Article() {
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

    const { Option } = Select;
    const { RangePicker } = DatePicker;
    const dateFormat = "YYYY/MM/DD";
    interface DataType {
        id: string;
        sort: number;
        cover: string;
        title: string;
        status: string;
        pubdate: string;
        read_count: string;
        like_count: string;
        tags: Array<string>;
    }
    const columns: ColumnsType<DataType> = [
        {
            title: "序号",
            dataIndex: "sort",
            width: 80,
            fixed: "left",
            sorter: (a, b) => a.sort - b.sort,
        },
        {
            title: "封面",
            dataIndex: "cover",
            width: 200,
            fixed: "left",
            render: (text: any) => (
                <img src={text.images[0]} width={200} height={150} />
            ),
        },
        {
            title: "标题",
            dataIndex: "title",
            width: 200,
            fixed: "left",
            render: (text: any) => <a>{text}</a>,
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
        },
        {
            title: "评论数",
            dataIndex: "component",
        },
        {
            title: "点赞数",
            dataIndex: "like_count",
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

    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };

    const rangePickerChange = (e: any) => {
        console.log(moment(e[0]).format("YYYY/MM/DD"));
    };

    const edit = (e: any) => {};

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
        setParams({ ..._params, ...params, page: 1 });
    };

    const pageChange = (page: number) => {
        setParams({ ...params, page });
    };

    const statusChange = (e: any) => {
        // setParams({ status: e.target.value });
    };

    const confirm = (item: any) => {
        // deleteMenu(item.id).then((res: any) => {
        //     if (res.code === 200) {
        //         init();
        //         message.success("删除成功");
        //     } else {
        //         message.error(res);
        //     }
        // });
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
                    <Form.Item label="状态" name="status">
                        <Radio.Group
                            defaultValue={-1}
                            buttonStyle="solid"
                            onChange={statusChange}
                        >
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
                        <Select
                            placeholder="请选择频道"
                            style={{ width: 120 }}
                            onChange={handleChange}
                        >
                            {optionlist.map((item: any) => (
                                <Option value={item.id} key={item.id}>
                                    {item.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="日期" name="date">
                        <RangePicker onChange={rangePickerChange} />
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
