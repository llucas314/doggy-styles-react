import React from "react";
import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import HeaderLogo from "../../storybook/HeaderLogo/HeaderLogo";
import "./Header.css";

function Header(props) {
  return (
    <div className="header">
      <Link to="/" className="logo-wrap">
        <HeaderLogo />
      </Link>
      <Navigation login={props.login} name={props.name} logOut={props.logOut} />
    </div>
  );
}

export default Header;
