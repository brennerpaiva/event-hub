import { Routes, Route, } from "react-router-dom";
import Login from '../pages/login'
import NewUser from '../pages/new-user'
import Home from '../pages/home'
import RecoverPassword from "../pages/recover-password";
import PostEvents from "../pages/post-events";
import DetailEvents from "../pages/detail-events";


export default function RoutesApp() {
    return (
            <Routes>
                <Route path="/home" element={<Home/>} />
                <Route path="/events/:parameter" element={<Home />} />
                <Route path="/" element={<Login/>} />
                <Route path="/newuser" element={<NewUser/>} />
                <Route path="/recoverpassword" element={<RecoverPassword/>} />
                <Route path="/postevents" element={<PostEvents/>} />
            </Routes>
    )   
}