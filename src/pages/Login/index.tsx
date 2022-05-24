import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Checkbox, message } from "antd";
import {
    UserOutlined,
    LockOutlined,
    VerifiedOutlined,
} from "@ant-design/icons";
import "./index.scss";
import global from "../../utils/global";
import { userLogin, login } from "../../api/index";
// import { useStore } from "../../store";
export default function Login() {
    // const { loginStore } = useStore();
    const navigation = useNavigate();
    const [verification, setVerification] = useState();
    // async写法
    // const onFinish = async (values: any) => {
    //     try {
    //         let res = await userLogin({
    //             username: values.username,
    //             password: values.password,
    //             verification: values.verification,
    //         });

    //         // if (res.code === 200) {
    //         //     // global.setCookie("CXCSESSID", res.data.token);
    //         //     navigation("/", {
    //         //         replace: true,
    //         //         state: {},
    //         //     });
    //         //     message.success("登录成功");
    //         // }
    //     } catch (err: any) {
    //         console.log(err);
    //         message.error(err?.response?.data?.message);
    //     }

    const onFinish = (values: any) => {
        userLogin({
            username: values.username,
            password: values.password,
            verification: values.verification,
        }).then((res: any) => {
            if (res.code === 200) {
                // global.setCookie("_Bearer_TOKEN_", res.data.token);
                navigation("/", {
                    replace: true,
                    state: {},
                });
                message.success("登录成功");
            }
        });

        // loginStore.setToken({
        //     mobile: values.username,
        //     code: values.password,
        // });
    };

    function getCode() {
        login()
            .then((res: any) => {
                const myBlob = new Blob([res], {
                    type: "image/jpeg",
                });
                const url: any = window.URL.createObjectURL(myBlob);
                setVerification(url);
            })
            .catch((err) => {
                message.error(err);
            });
    }
    useEffect(() => {
        getCode();
    }, []);
    return (
        <section className="login">
            <div className="box">
                <div className="form">
                    <h2>Login</h2>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                            // username: 13811111111,
                            username: "admin",
                            // password: 246810,
                            password: "admin",
                        }}
                        onFinish={onFinish}
                        validateTrigger={["onBlur", "onChange"]}
                    >
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Username!",
                                },
                            ]}
                        >
                            <Input
                                prefix={<UserOutlined />}
                                placeholder="Username"
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Password!",
                                },
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined />}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                        <div className="verification-box">
                            <Form.Item
                                name="verification"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Please input your Verification!",
                                    },
                                ]}
                            >
                                <Input
                                    className="verification"
                                    prefix={<VerifiedOutlined />}
                                    placeholder="Verification"
                                />
                            </Form.Item>
                            {/* <img src="/v1_0/login/code" alt="" /> */}
                            <img
                                className="verificationImg"
                                src={verification}
                                alt=""
                                onClick={getCode}
                            />
                        </div>
                        <Form.Item>
                            <Form.Item
                                name="remember"
                                valuePropName="checked"
                                noStyle
                            >
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>

                            <a className="login-form-forgot" href="">
                                Forgot password
                            </a>
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="login-form-button"
                            >
                                Login
                            </Button>
                            <div className="login-form-register">
                                register now!
                            </div>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </section>
    );
}
