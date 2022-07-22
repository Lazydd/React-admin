import React, { useEffect, useState } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import global from "utils/global";
import { getWeather, getLocalPosition, getUserInfo, userLogout } from "api";
import "./index.scss";
import { Menu, Avatar, Dropdown, Space, message, Button } from "antd";
import {
    createFromIconfontCN,
    BugOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    HomeOutlined,
    UserOutlined,
    TeamOutlined,
    LockOutlined,
    ExceptionOutlined,
    ScheduleOutlined,
} from "@ant-design/icons";
const IconFont = createFromIconfontCN({
    scriptUrl: [
        "//at.alicdn.com/t/font_1788044_0dwu4guekcwr.js", // icon-javascript, icon-java, icon-shoppingcart (overrided)
        "//at.alicdn.com/t/font_1788592_a5xf2bdic3u.js", // icon-shoppingcart, icon-python
    ],
});
export default function Layout() {
    const navigation = useNavigate();
    const { pathname } = useLocation();

    const [weather, setWeather] = useState({ temperature: "", weather: "" });
    const [openKeys, setOpenKeys] = useState(["/"]);
    const [userInfo, setUserInfo] = useState({} as any);

    const items = [
        { label: "首页", key: "/", icon: <HomeOutlined /> }, // 菜单项务必填写 key
        {
            label: "角色管理",
            key: "/role",
            icon: <UserOutlined />,
        },
        {
            label: "用户管理",
            key: "/user",
            icon: <TeamOutlined />,
        },
        {
            label: "权限管理",
            key: "/authority",
            icon: <LockOutlined />,
        },
        {
            label: "日志管理",
            key: "/log",
            icon: <ExceptionOutlined />,
        },
        {
            label: "任务管理",
            key: "/task",
            icon: <ScheduleOutlined />,
        },
    ];
    function exitClick() {
        userLogout().then((res: any) => {
            if (res.code == 200) {
                if (res.data) {
                    message.success("退出成功");
                    navigation("/login", {
                        replace: true,
                        state: {},
                    });
                } else {
                    message.error("退出失败");
                }
            } else {
                message.error(res.error);
            }
        });
        //由java控制
        // global.delStorage("tokenName");
        // global.delStorage("tokenValue");
    }
    function onSelect(item: any) {
        navigation(item.key);
    }
    function TopListChange(path: any) {
        navigation(path);
    }
    const [collapsed, setCollapsed] = useState(false);

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };
    useEffect(() => {
        getUserInfo().then((res: any) => {
            if (res.code == 200) {
                setUserInfo(res.data);
            } else {
                message.error(res.error);
            }
        });
        getLocalPosition().then((res: any) => {
            if (res.adcode) {
                getWeather(res.adcode).then((res: any) => {
                    setWeather(res.lives[0]);
                });
            }
        });
        // getUserInfo()
        //     .then((res: any) => {
        //         setUserInfo(res.data);
        //     })
        //     .catch((err: any) => {
        //         message.error(err);
        //     });
    }, []);
    useEffect(() => {
        setOpenKeys([pathname]);
    }, [pathname]);
    const menu = (
        <Menu
            theme="dark"
            onClick={exitClick}
            items={[{ label: "退出登录", key: "exit" }]}
        />
    );
    return (
        <div className="Layout">
            <header>
                <BugOutlined />
                <div className="weather">
                    天气：{weather.temperature}℃ {weather.weather}
                </div>
                <ul>
                    <li className="navList" onClick={() => TopListChange("/")}>
                        首页
                    </li>
                    <li className="navList">指南</li>
                    <li className="navList">组件</li>
                    <li
                        className="navList"
                        onClick={() =>
                            window.open(
                                "http://192.168.2.13:3000/v1_0/doc.html"
                            )
                        }
                    >
                        文档
                    </li>
                </ul>
                <Dropdown overlay={menu}>
                    <a onClick={(e) => e.preventDefault()}>
                        <Space>
                            <Avatar
                                style={{
                                    backgroundColor: "#f56a00",
                                    verticalAlign: "middle",
                                }}
                                size="large"
                            >
                                {userInfo?.username}
                            </Avatar>
                        </Space>
                    </a>
                </Dropdown>
            </header>
            <div className="page">
                <div
                    className="menu-box"
                    style={{ width: collapsed ? "80px" : "240px" }}
                >
                    <div className="menu">
                        <Menu
                            className="menuList"
                            theme="dark"
                            mode="inline"
                            selectedKeys={openKeys}
                            items={items}
                            inlineCollapsed={collapsed}
                            onSelect={onSelect}
                            defaultSelectedKeys={openKeys}
                        />
                    </div>
                    <Button
                        type="primary"
                        onClick={toggleCollapsed}
                        style={{ marginBottom: 16 }}
                        className="collapsed"
                    >
                        {collapsed ? (
                            <MenuUnfoldOutlined />
                        ) : (
                            <MenuFoldOutlined />
                        )}
                    </Button>
                </div>
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
