import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import './stylesNavBar.css';
import MainForm from "../Form/MainForm";


export default function NavBar() {
    const [scrolling, setScrolling] = useState(false);

    useEffect(() => {
        //בודק את מצב הגלילה של הדפדפן 
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setScrolling(true);
            } else {
                setScrolling(false);
            }
        };
        //כאשר קורה גלילה הפונקציה מופעלת
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <>
         {/* העיצוב משתנה לפי מצב הגלילה */}
            <div className={`navbar-fixed ${scrolling ? 'scrolling' : ''}`}>
                <div className="navBar" >
                    <img className="logo" src="images/לוגו (2).png" alt="Logo" ></img>
                    <div style={{ marginRight: "20%", display: "flex", marginLeft: "10%" }}>
                        <NavLink id="link" to="/" style={({ isActive }) => ({ color: isActive ? '#FAAE3E' : '#0D98A0' })} >Home </NavLink>
                        <NavLink id="link" to="/About" style={({ isActive }) => ({ color: isActive ? '#FAAE3E' : '#0D98A0' })}>About</NavLink>
                        <NavLink id="link" to="/LeaderList" style={({ isActive }) => ({ color: isActive ? '#FAAE3E' : '#0D98A0' })}>Leaders </NavLink>
                        <NavLink id="link" to="/Category" style={({ isActive }) => ({ color: isActive ? '#FAAE3E' : '#0D98A0' })}>Questions </NavLink>
                    </div>
                    {<MainForm></MainForm>}
                </div>
            </div>
        </>
    );
}
