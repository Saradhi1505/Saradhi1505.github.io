import React, { useState, useRef } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.svg";
import menu_open from '../../assets/menu_open.svg';
import menu_close from '../../assets/menu_close.svg';

const Navbar = () => {
    const [menu, setMenu] = useState("home");
    const menuRef = useRef();

    const openMenu = () => {
        menuRef.current.style.right = "0";
    };

    const closeMenu = () => {
        menuRef.current.style.right = "-350px";
    };

    return (
        <div className="navbar">
            <img src={logo} alt="Logo" className="logo" />
            <img src={menu_open} onClick={openMenu} alt="Open Menu" className="nav-mob-open" />
            <ul ref={menuRef} className="nav-menu">
                <img src={menu_close} onClick={closeMenu} alt="Close Menu" className="nav-mob-close" />
                <li><a href="#home" onClick={() => { setMenu("home"); closeMenu(); }}>Home</a></li>
                <li><a href="#about" onClick={() => { setMenu("about"); closeMenu(); }}>About Me</a></li>
                <li><a href="#services" onClick={() => { setMenu("services"); closeMenu(); }}>Services</a></li>
                <li><a href="#work" onClick={() => { setMenu("work"); closeMenu(); }}>Portfolio</a></li>
                <li><a href="#contact" onClick={() => { setMenu("contact"); closeMenu(); }}>Contact</a></li>
            </ul>
            <ul className="nav-connect">
                <li><a href="#contact" onClick={() => { setMenu("contact"); closeMenu(); }}>Connect With Me</a></li>
            </ul>
        </div>
    );
};

export default Navbar;