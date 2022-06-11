import React, { lazy } from 'react'

const Layout = lazy(() => import("../pages/Layout/index.tsx"));
const Login = lazy(() => import("../pages/Login/index.tsx"));
const Home = lazy(() => import("../pages/Home/index.tsx"));
const Publish = lazy(() => import("../pages/Publish/index.tsx"));
const Article = lazy(() => import("../pages/Article/index.tsx"));
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
                path: '/arcticle',
                element: <Article />,
            },
            {
                path: '/publish',
                element: <Publish />,
            }
        ]
    },
    {
        path: '/login',
        element: <Login />,
    }
]