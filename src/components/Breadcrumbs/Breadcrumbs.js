import React from "react";
import "./Breadcrumbs.css";
import { Link } from "react-router-dom";
function Breadcrumbs(props) {
  return (
    <div className="breadcrumbs">
      <div className="home-wrap">
        <Link to="/" className="home-link">
          <i className="fas fa-paw"></i>
        </Link>
      </div>
      {props.links
        ? props.links.map((link, i) => (
            <Link to={`/${link.toLowerCase()}`} key={i} className="home-link">
              {" "}
              > <span> {link}</span>
            </Link>
          ))
        : ""}
    </div>
  );
}

export default Breadcrumbs;
