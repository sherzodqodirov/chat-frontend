import React, {lazy} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import ChatLayout from "../components/ChatLayout";
import Login from "./Login";
import Register from "./Register";
const Dashboard=lazy(()=>import("./Dashboard"))
const UsersChat=lazy(()=>import("./UsersChat"))

const RouterPages = () => {


    return (
        <Routes>
            <Route path={'/'} element={<Navigate to={'/login'} />} />
            <Route path={'/login'} element={<Login />} />
            <Route path={'/register'} element={<Register />} />
            <Route exact path={'/chat/'} element={<ChatLayout />}>
                <Route index element={<Dashboard />} />
                <Route path={'user/:id'} element={<UsersChat />} />
            </Route>
        </Routes>
    );
};

export default RouterPages;
