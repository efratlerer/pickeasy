import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import './stylesFooter.css'

export default function Footer() {


    return (
        <div className="footer">
            <div className="footer__container">
                <div className="footer__contact">
                    <h3>Contact Us</h3>
                    <p>Email: pickeasy@gamil.com</p>
                    <p>Phone: 123-456-7890</p>
                    <p>Address: 123 aaa St, bbb, Israel</p>
                </div>
                <nav className="footer__links">
                    <h3 style={{ marginLeft: "14%" }}>Links</h3>
                    <ul>
                        <li> <NavLink id="link" to="/" style={({ isActive }) => ({ color: isActive ? ' #FAAE3E' : 'white' })} >Home</NavLink></li>
                        <li><NavLink id="link" to="/About" style={({ isActive }) => ({ color: isActive ? '#FAAE3E' : 'white' })}>About</NavLink></li>
                        <li><NavLink id="link" to="/Category" style={({ isActive }) => ({ color: isActive ? '#FAAE3E' : 'white' })}>Questions </NavLink></li>
                        <li><NavLink id="link" to="/LeaderList" style={({ isActive }) => ({ color: isActive ? '#FAAE3E' : 'white' })}>Leaders </NavLink></li>
                        <Outlet />
                    </ul>
                </nav>

                <div className="footer__social">
                    <h3>Follow Us</h3>
                    <ul>
                        <li><a href="https://facebook.com">Facebook</a></li>
                        <li><a href="https://twitter.com">Twitter</a></li>
                        <li><a href="https://instagram.com">Instagram</a></li>
                    </ul>
                </div>
            </div>
            <div className="footer__bottom">
                <p>&copy; 2024 pickeasy. All rights reserved to Efrat Lerer.</p>
            </div>
        </div>
    )
}