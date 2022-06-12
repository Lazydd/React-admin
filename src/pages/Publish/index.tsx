import React, { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
    Breadcrumb,
    Card,
    Input,
    Radio,
    Select,
    Button,
    Form,
    message,
    Upload,
} from "antd";
import ImgCrop from "antd-img-crop";

import { PlusOutlined } from "@ant-design/icons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./index.scss";

import SeleteType from "../../components/SeleteType";
import {
    getArticle,
    saveArticle,
    getArticleDetails,
    editSaveArticle,
} from "../../api";
export default function Publish() {
    const navigate = useNavigate();

    const [params] = useSearchParams();
    const id = params.get("id");

    const [loading, setLoading] = useState(id ? true : false);
    const [optionlist, setOptionlist] = useState([]);
    const [fileList, setFileList] = useState([]);
    const [imageCount, setImageCount] = useState(1);

    const [form] = Form.useForm();

    const cacheImgList = useRef([]);

    const init = () => {
        getArticle().then((res) => {
            setOptionlist(res.data?.channels);
            setLoading(false);
        });

        if (id) {
            getArticleDetails(id).then((res) => {
                const {
                    cover: { type, images },
                } = res.data;
                form.setFieldsValue({ ...res.data, type });
                const imageList = images.map((url: string) => ({
                    url,
                }));
                setFileList(imageList);
                setImageCount(type);
                cacheImgList.current = imageList;
                setLoading(false);
            });
        }
    };

    const handleChange = (res: any) => {
        const formatList = res.fileList.map((item: any) => {
            if (item.response) {
                return {
                    url: item.response.data.url,
                };
            }
            return item;
        });
        setFileList(formatList);
        cacheImgList.current = formatList;
    };

    const onFinish = (e: any) => {
        const { channel_id, content, title, type } = e;
        const cover = {
            type: imageCount,
            images: fileList.map((item: any) => item.url),
        };
        const params = {
            channel_id,
            content,
            title,
            type,
            cover,
        };
        if (id) {
            editSaveArticle(params, id);
        } else {
            saveArticle(params);
        }
        message.success("保存成功");
        navigate("/arcticle");
    };

    const radioChange = (e: any) => {
        const { value } = e.target;
        setImageCount(value);
        if (cacheImgList.current.length === 0) return;
        if (value === 1) {
            setFileList([cacheImgList.current[0]]);
        } else if (value === 3) {
            setFileList(cacheImgList.current);
        }
    };

    useEffect(() => {
        init();
    }, []);
    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item>
                    <a href="">首页</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <a href="">{id ? "编辑文章" : "发布文章"}</a>
                </Breadcrumb.Item>
            </Breadcrumb>
            <Card
                style={{ width: "100%", marginTop: 20, overflow: "hidden" }}
                loading={loading}
            >
                <Form
                    onFinish={onFinish}
                    form={form}
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ type: 1, content: "" }}
                >
                    <Form.Item
                        label="标题"
                        name="title"
                        rules={[{ required: true, message: "请输入文章标题" }]}
                    >
                        <Input placeholder="请输入文章标题" />
                    </Form.Item>
                    <Form.Item
                        label="频道"
                        name="channel_id"
                        rules={[{ required: true, message: "请选择频道" }]}
                    >
                        <Select placeholder="请选择文章频道">
                            {optionlist.map((item: any) => (
                                <Select.Option value={item.id} key={item.id}>
                                    {item.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="封面"
                        name="type"
                        rules={[{ required: true, message: "请选择封面" }]}
                    >
                        <Radio.Group onChange={radioChange}>
                            <Radio value={1}>单图</Radio>
                            <Radio value={3}>三图</Radio>
                            <Radio value={0}>无图</Radio>
                        </Radio.Group>
                    </Form.Item>
                    {imageCount > 0 && (
                        <Form.Item
                            label="封面"
                            name="fileList"
                            // rules={[{ required: true, message: "请选择封面" }]}
                        >
                            <ImgCrop rotate grid modalTitle="裁剪图片">
                                <Upload
                                    action="http://geek.itheima.net/v1_0/upload"
                                    listType="picture-card"
                                    name="image"
                                    showUploadList
                                    fileList={fileList}
                                    onChange={handleChange}
                                    multiple={imageCount > 1}
                                    maxCount={imageCount}
                                >
                                    <div style={{ marginTop: 8 }}>
                                        <PlusOutlined />
                                    </div>
                                </Upload>
                            </ImgCrop>
                        </Form.Item>
                    )}
                    <Form.Item
                        label="内容"
                        name="content"
                        rules={[{ required: true, message: "请输入文章内容" }]}
                    >
                        <ReactQuill
                            theme="snow"
                            placeholder="请输入文章内容..."
                        />
                    </Form.Item>
                    <Button className="submit" type="primary" htmlType="submit">
                        提交
                    </Button>
                </Form>
            </Card>
        </>
    );
}
