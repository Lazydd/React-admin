import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout/index.tsx";
import Login from "./pages/Login/index.tsx";
import Home from './pages/Home/index.tsx'
import Publish from './pages/Publish/index.tsx'
import AuthComponent from "./components/AuthComponents.tsx";
import "./App.css";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={
                    <AuthComponent>
                        <Layout />
                    </AuthComponent>
                }>
                    <Route index element={<Home />}></Route>
                    <Route path="/publish" element={<Publish />}></Route>
                    <Route path="/publish2" element={<Publish />}></Route>
                    <Route path="/publish3" element={<Publish />}></Route>
                </Route>
                <Route path="/login" element={<Login />}>
                    登录
                </Route>
            </Routes>
        </div>
    );
}

export default App;
