import React, { Suspense } from 'react'
import { useRoutes } from "react-router-dom";
import Loading from './components/Loading.tsx'
import "./App.css";

import routes from './router/index.js'
function App() {
    const element = useRoutes(routes)
    return (
        <div className="App">
            <Suspense fallback={<Loading />}>
                {element}
            </Suspense>
        </div>
    );
}

export default App;
