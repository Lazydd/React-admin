import React, { lazy } from 'react'

const Layout = lazy(() => import("pages/Layout/index.tsx"));
const Login = lazy(() => import("pages/Login/index.tsx"));
const Home = lazy(() => import("pages/Home/index.tsx"));
const Role = lazy(() => import("pages/Role/index.tsx"));
const User = lazy(() => import("pages/User/index.tsx"));
const Authority = lazy(() => import("pages/Authority/index.tsx"));
const Log = lazy(() => import("pages/Log/index.tsx"));
const Task = lazy(() => import("pages/Task/index.tsx"));
const AuthComponent = lazy(() => import("components/AuthComponents.tsx"));

export default [
    {
        path: '/',
        element: <AuthComponent > <Layout /></AuthComponent>,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/role',
                element: <Role />,
            },
            {
                path: '/user',
                element: <User />,
            },
            {
                path: '/authority',
                element: <Authority />,
            },
            {
                path: '/log',
                element: <Log />,
            },
            {
                path: '/task',
                element: <Task />,
            },
        ]
    },
    {
        path: '/login',
        element: <Login />,
    }
]