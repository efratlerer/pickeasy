import React from "react";
import NavBar from './navBar/NavBar'
import Footer from './footer/Footer'

export default function Layout({ children }) {
  return (
    <>
      <NavBar></NavBar>
      {children }
      <Footer></Footer>
    </>
  );
}
