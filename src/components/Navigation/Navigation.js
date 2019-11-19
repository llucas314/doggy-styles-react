import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";

function Navigation(props) {
  return (
    <nav className="navigation">
      {props.login ? (
        <ul>
          <Link className="nav-li" to="/">
            Home
          </Link>
          <Link className="nav-li" to="/search">
            Search
          </Link>
          <Link className="nav-li" to="/">
            Logout
          </Link>
        </ul>
      ) : (
        <ul>
          <Link className="nav-li" to="/">
            Sign Up
          </Link>

          <Link className="nav-li" to="/search">
            Login
          </Link>
        </ul>
      )}
    </nav>
  );
}

export default Navigation;
