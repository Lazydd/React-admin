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
} from "antd";
import moment from "moment";
import type { ColumnsType } from "antd/lib/table";
import "./index.scss";
import { SearchOutlined } from "@ant-design/icons";

import { getArticle, getArticleTableData } from "../../api";
export default function Article() {
    const [loading, setLoading] = useState(true);
    const [optionlist, setOptionlist] = useState([]);
    const [articleTableData, setAticleTableData] = useState({
        list: [],
        count: 0,
    });
    const [params, setParams] = useState({ page: 1, per_page: 10 });

    const { Option } = Select;
    const { RangePicker } = DatePicker;
    const dateFormat = "YYYY/MM/DD";
    interface DataType {
        id: string;
        sort: number;
        title: string;
        iconCls: string;
        pubdate: string;
        url: string;
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
            title: "标题",
            dataIndex: "title",
            fixed: "left",
            render: (text: any) => <a>{text}</a>,
        },
        {
            title: "状态",
            dataIndex: "iconCls",
        },
        {
            title: "权限匹配路径",
            dataIndex: "url",
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

    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };

    const rangePickerChange = (e: any) => {
        console.log(moment(e[0]).format("YYYY/MM/DD"));
    };

    const edit = (e: any) => {};

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
                <div className="control">
                    <span style={{ marginRight: 20 }}>状态：</span>
                    <Radio.Group defaultValue="a" buttonStyle="solid">
                        <Radio.Button value="a">全部</Radio.Button>
                        <Radio.Button value="b">草稿</Radio.Button>
                        <Radio.Button value="c">待审核</Radio.Button>
                        <Radio.Button value="d">审核失败</Radio.Button>
                    </Radio.Group>
                    <Button type="primary" icon={<SearchOutlined />}>
                        筛选
                    </Button>
                </div>
                <div className="control">
                    <span style={{ marginRight: 20 }}>频道：</span>
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
                </div>
                <div className="control">
                    <span style={{ marginRight: 20 }}>日期：</span>
                    <RangePicker
                        defaultValue={[
                            moment("2015/01/01", dateFormat),
                            moment("2015/01/01", dateFormat),
                        ]}
                        onChange={rangePickerChange}
                    />
                </div>
                <Table
                    className="menuMainTainTable"
                    columns={columns}
                    dataSource={articleTableData.list || []}
                    scroll={{ x: 1300 }}
                    rowKey={(record) => record.id}
                />
            </Card>
        </>
    );
}
