import React, { lazy } from 'react'

const Layout = lazy(() => import("../pages/Layout/index.tsx"));
const Login = lazy(() => import("../pages/Login/index.tsx"));
const Home = lazy(() => import("../pages/Home/index.tsx"));
const User = lazy(() => import("../pages/User/index.tsx"));
const AuthComponent = lazy(() => import("../components/AuthComponents.tsx"));

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
                path: '/user',
                element: <User />,
            },
        ]
    },
    {
        path: '/login',
        element: <Login />,
    }
]