import React from "react";
import logo from "../../images/bone.png";
import "./Header.css";

function Header(props) {
  return (
    <div className="header">
      <div className="logo-wrap">
        <img src={logo} alt="Logo" />
        <h2>Doggy Styles</h2>
      </div>
    </div>
  );
}

export default Header;
