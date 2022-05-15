import React from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Checkbox, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./index.scss";
import global from "../../utils/global";
import { userLogin } from "../../api/index";
// import { useStore } from "../../store";
export default function Login() {
    // const { loginStore } = useStore();
    const navigation = useNavigate();

    // async写法
    const onFinish = async (values: any) => {
        try {
            let res = await userLogin({
                mobile: values.username,
                code: values.password,
            });
            global.setCookie("_WEB_TOKEN_", res.data.token);
            navigation("/", {
                replace: true,
                state: {},
            });
            message.success("登录成功");
        } catch (e: any) {
            message.error(e?.response?.data?.message);
        }

        // const onFinish = (values: any) => {
        // userLogin({
        //     mobile: values.username,
        //     code: values.password,
        // })
        //     .then((res: any) => {
        //         global.setCookie("_WEB_TOKEN_", res.data.token);
        //         navigation("/", {
        //             replace: true,
        //             state: {},
        //         });
        //         message.success("登录成功");
        //     })
        //     .catch((e: any) => {
        //         message.error(e?.response?.data?.message);
        //     });

        // loginStore.setToken({
        //     mobile: values.username,
        //     code: values.password,
        // });
    };
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
                            username: 13811111111,
                            password: 246810,
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
