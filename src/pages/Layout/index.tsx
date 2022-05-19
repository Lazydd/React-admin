import React, { useEffect, useState } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import global from "../../utils/global";
import { getUserInfo } from "../../api/index";
import "./index.scss";
import {
    Menu,
    MenuProps,
    Avatar,
    Dropdown,
    Space,
    message,
    Button,
} from "antd";
import {
    RedditOutlined,
    SettingOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from "@ant-design/icons";
export default function Layout() {
    const navigation = useNavigate();
    const { pathname } = useLocation();

    const rootSubmenuKeys = ["/", "sub1", "sub2", "sub3"];
    const [openKeys, setOpenKeys] = useState(["sub3"]);
    const [userInfo, setUserInfo] = useState({} as any);
    const onOpenChange: MenuProps["onOpenChange"] = (keys) => {
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };

    const items = [
        { label: "首页", key: "/", icon: <SettingOutlined /> }, // 菜单项务必填写 key
        {
            label: "文章管理",
            key: "sub1",
            icon: <SettingOutlined />,
            children: [
                {
                    label: "文章管理",
                    key: "/publish2",
                    icon: <SettingOutlined />,
                },
            ],
        },
        {
            label: "网址管理",
            key: "sub2",
            icon: <SettingOutlined />,
            children: [{ label: "网址管理", key: "/publish" }],
        },
        {
            label: "系统维护",
            key: "sub3",
            icon: <SettingOutlined />,
            children: [{ label: "菜单管理", key: "/menuMaintain" }],
        },
    ];
    function exitClick() {
        global.delCookie("_Bearer_TOKEN_");
        message.success("退出成功");
        navigation("/login", {
            replace: true,
            state: {},
        });
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
        getUserInfo()
            .then((res: any) => {
                console.log(res.data);
                setUserInfo(res.data);
            })
            .catch((err: any) => {
                message.error(err);
            });
    }, []);
    // function getScrollY() {
    //     if (window.scrollY > 0) {
    //         setStick(true);
    //     } else {
    //         setStick(false);
    //     }
    // }
    // const [stick, setStick] = useState(false);
    // useEffect(() => {
    //     window.addEventListener("scroll", getScrollY);
    //     return () => {
    //         window.removeEventListener("scroll", getScrollY);
    //     };
    // }, [stick]);
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
                <RedditOutlined />
                <ul>
                    <li className="navList" onClick={() => TopListChange("/")}>
                        首页
                    </li>
                    <li className="navList">指南</li>
                    <li className="navList">组件</li>
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
                                {userInfo.username}
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
                            theme="dark"
                            mode="inline"
                            openKeys={openKeys}
                            onOpenChange={onOpenChange}
                            items={items}
                            inlineCollapsed={collapsed}
                            onSelect={onSelect}
                            className="menuList"
                            defaultSelectedKeys={[pathname]}
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
