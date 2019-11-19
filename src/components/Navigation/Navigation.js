import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";

function Navigation() {
  return (
    <nav className="navigation">
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
    </nav>
  );
}

export default Navigation;
