import React, { Suspense } from 'react'
import { useRoutes } from "react-router-dom";
import Loading from './components/Loading.tsx'
import zh_CN from 'antd/lib/locale-provider/zh_CN';

import { ConfigProvider } from 'antd';
import "./App.css";

import routes from './router/index.js'
function App() {
    const element = useRoutes(routes)
    return (
        <ConfigProvider locale={zh_CN}>
            <div className="App">
                <Suspense fallback={<Loading />}>
                    {element}
                </Suspense>
            </div>
        </ConfigProvider>
    );
}

export default App;
