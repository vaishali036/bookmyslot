import React, { useState, useEffect } from 'react';
import s from './layout.module.css'
// import image from './../assets/images/back-1_1.jpeg';
import image from '../components/images/bookmyslot_logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBarChart, faDashboard, faHome } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export const Sidebar = (props) => {
    const { sidebarVisibility, navToggle } = props;

    const menuItem = (name, url, icon) => {
        if (sidebarVisibility) {
            return <Link to={url}>
                <div className={`${s.flex} ${s.w_full} ${s.navItems}`} >
                    <div className={`${s.navIcon} ${s.center}`}>
                        {icon}
                    </div>
                </div>
            </Link>
        } else {
            return <Link to={url}>
                <div className={`${s.flex} ${s.navItems}`}>
                    <div className={`${s.navIcon}`}>
                        {icon}
                    </div>
                    <div className={`${s.navItem} ${s.animmove}`} >
                        {name}
                    </div>
                </div>
            </Link>
        }
    }
    return (
        <div
            className={s.sidebar}
            style={{ width: sidebarVisibility ? '100px' : '200px',transition:'.3s all ease-in-out'}}
            onMouseEnter={() => {
                sidebarVisibility && navToggle()
            }}
            onMouseLeave={() => {
                // console.log("Event:MouseLeave");
                sidebarVisibility && navToggle()
            }}
        >
            <div className={s.side_bar_user_icon_area}>
                <img src={image} alt="tag_team_member" className={s.side_bar_user_icon} />
            </div>
            <div className={s.sidebar_links} style={{ cursor: 'pointer' }}>
                {menuItem('Home','/tag/tecktrack', <FontAwesomeIcon icon={faHome} />)}
            </div>
            <div className={s.sidebar_links} style={{ cursor: 'pointer' }}>
                {menuItem('Dashboard', '/tag/dashboard', <FontAwesomeIcon icon={faDashboard} />)}
            </div>
            <div className={s.sidebar_links} style={{ cursor: 'pointer' }}>
                {menuItem('Reports', '/tag/reports', <FontAwesomeIcon icon={faBarChart} />)}
            </div>
        </div>
    )
}