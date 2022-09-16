import React, { useState, useEffect } from "react";
import s from "./layout.module.css";
import image from './../assets/images/back-1_1.jpeg'
import { Container, Navbar, Nav, Dropdown, DropdownButton, NavDropdown, MenuItem } from "react-bootstrap";
import { faAlignJustify, faHome, faHomeUser, faSignOut, faUser, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, Routes, useNavigate } from "react-router-dom";
import NavigateTo from "../components/navigate/NavigateTo";


export const Header = (props) => {
    const { navToggle } = props;
    const  navigate = useNavigate();

    // const logout = () => {
    //     sessionStorage.removeItem("userToken");
    //     sessionStorage.clear();
    // }
    // let user = JSON.parse(sessionStorage.getItem("userToken"));
    // // const history = useNavigate();
    // function logout() {
    //     console.log("logout");
    //     localStorage.clear();
    //     // history.push("./signin")

    // }
    useEffect(() => {
        // alert('sdfgh')
        if (!localStorage.getItem("bookmyslot")) {
            // navigate("../signin", { replace: true });
            navigate("/", { replace: true });
        }
    },[])


    const onLogout = () => {
        // console.log("logout");
        localStorage.removeItem("bookmyslot");
        if(!localStorage.getItem("bookmyslot")){
            navigate("../signin", { replace: true });
        }
    }


    return (<><div className={s.header}>
        <div className={s.nav_toggle}>
            <FontAwesomeIcon icon={faAlignJustify} onClick={() => navToggle()} />
        </div>
        <div className={s.header_user_details}>
            <div className={s.header_user_name}>
                {localStorage.hasOwnProperty("bookmyslot") ?
                (JSON.parse(localStorage.getItem('bookmyslot')).userEmailId.split('@')[0])
                : ''
                }
            </div>
            <div className={s.user_icon_area}>
                {/* <img src={image} alt="tag_team_member" className={s.user_icon}> */}
                {/*                 
            </img> */}
                <DropdownButton align="end" id="dropdown-item-button" title="">
                    {/* <Dropdown.Item as="toggle">
                        <FontAwesomeIcon
                            icon={faUser}>
                        </FontAwesomeIcon>
                        User Profile
                    </Dropdown.Item> */}
                    <Dropdown.Item onClick={onLogout}>
                        <FontAwesomeIcon icon={faSignOut}>
                        </FontAwesomeIcon>
                        Logout
                        {/* <Link to="/signin">Logout</Link> */}
                        {/* <NavigateTo path="/signin">Logout</NavigateTo> */}

                    </Dropdown.Item>
                </DropdownButton>
                {/* <li className="nav-item dropdown"> */}
            </div>
        </div>
    </div></>);
};
