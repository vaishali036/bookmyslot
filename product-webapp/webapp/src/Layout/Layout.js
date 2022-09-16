import React, { useEffect, useState } from 'react';
import { Navigate, Route, Router, Routes, Outlet, useNavigate } from 'react-router-dom';
import { routes } from './../routes';
import { Header } from './Header';
import s from "./layout.module.css";
import { Sidebar } from './Sidebar';
import { SidebarInterviewer } from './SidebarInterviewer';


export const Layout = (props) => {
    if (localStorage.hasOwnProperty("username")) {
        console.log(JSON.parse(localStorage.getItem('bookmyslot')).userRole)
    }
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("bookmyslot")) {
            // navigate("../signin", { replace: true });
            navigate("/", { replace: true });
        }
    },[])

    const [sidebarVisibility, setSidebarVisibility] = useState(true);
    const role = localStorage.hasOwnProperty("bookmyslot") ? JSON.parse(localStorage.getItem('bookmyslot')).userRole : '';
    return (
        <div className="flex layout-container">
            {
                role.toLowerCase() === 'tag' &&
                <Sidebar sidebarVisibility={sidebarVisibility} navToggle={() => setSidebarVisibility(sidebarVisibility)} />
            }
            {
                role.toLowerCase() === 'interviewer' &&
                <SidebarInterviewer sidebarVisibility={sidebarVisibility} navToggle={() => setSidebarVisibility(sidebarVisibility)} />
            }

            <div className={s.w_full}>
                <Header navToggle={() => setSidebarVisibility(!sidebarVisibility)} />
                <div className={s.content}>
                    <Outlet />
                </div>
                {/* <Footer /> */}
            </div>
        </div>
    )
}