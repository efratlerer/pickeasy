import React from 'react';
import './StyleHomePage.css'
import { NavLink } from "react-router-dom";

function HomePageStatement() {
  return (
    <>
      <section id="homePage-six">
        <h5>ACTIVE COMMUNITY MEMBERS</h5>
        <h1>"The more people participate in the rating process,
          the easier it is to get diverse opinions and make the best choice."</h1>
        <button className='homePage-btn w-btn'>
          <NavLink id="link" to="/LeaderList" style={({ isActive }) => ({ color: isActive ? '#0D98A0' : '#FAAE3E' })}>Go Our Leaders</NavLink>
        </button>
      </section>
    </>
  );
}

export default HomePageStatement;