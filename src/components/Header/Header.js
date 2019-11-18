import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/bone.png";
import "./Header.css";
import Navigation from "../Navigation/Navigation";

function Header(props) {
  return (
    <div className="header">
      <Link to="/" className="logo-wrap">
        <img src={logo} alt="Logo" />
        <h2>Doggy Styles</h2>
      </Link>
      {props.nav ? <Navigation /> : ""}
    </div>
  );
}

export default Header;
