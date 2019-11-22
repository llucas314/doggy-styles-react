import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";

function Navigation(props) {
  return (
    <nav className="navigation">
      {props.login ? (
        <ul>
          <Link className="nav-li" to="/account">
            {props.name ? "Welcome, " + props.name : "My Account"}
          </Link>
          <Link className="nav-li" to="/search">
            Search
          </Link>
          <Link className="nav-li" to="/" onClick={props.logOut}>
            Logout
          </Link>
        </ul>
      ) : (
        <ul>
          <Link className="nav-li" to="/signup">
            Sign Up
          </Link>

          <Link className="nav-li" to="/login">
            Login
          </Link>
        </ul>
      )}
    </nav>
  );
}

export default Navigation;
