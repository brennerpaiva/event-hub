import { Routes, Route } from "react-router-dom";
import Login from '../pages/login'
import NewUser from '../pages/new-user'
import Home from '../pages/home'


export default function RoutesApp() {
    return (
        <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/newuser" element={<NewUser/>} />
            <Route path="/home" element={<Home/>} />
        </Routes>
    )
}