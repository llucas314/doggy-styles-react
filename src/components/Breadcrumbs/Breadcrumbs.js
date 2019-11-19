import React from "react";
import "./Breadcrumbs.css";
import { Link } from "react-router-dom";
function Breadcrumbs() {
  return (
    <div className="breadcrumbs">
      <div className="home-wrap">
        <Link to="/" className="home-link">
          <i className="fas fa-paw"></i>
        </Link>
      </div>
      <Link to="/search" className="home-link">
        {" "}
        > <span> Search</span>
      </Link>
    </div>
  );
}

export default Breadcrumbs;
