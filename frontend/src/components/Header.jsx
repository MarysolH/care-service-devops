import React from "react";
import "./Header.css"; 
import logo from "../assets/Logo.jpg";


function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <img
            src={logo}
            alt="Logo"
            className="logo"
            />
        <span className="app-title"></span>
      </div>

      <div className="header-right">
        <div className="user-circle">A</div>
        <span className="username">Admin</span>

        <button className="logout-btn">
          Salir
        </button>
      </div>
    </header>
  );
}

export default Header;
