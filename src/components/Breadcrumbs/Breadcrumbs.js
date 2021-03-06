import React from "react";
import { Link } from "react-router-dom";
import Paw from '../../storybook/Paw/Paw';
import "./Breadcrumbs.css";

function Breadcrumbs(props) {
  return (
    <div className="breadcrumbs">
      <div className="home-wrap">
        <Link to="/" className="home-link">
          <Paw />
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
