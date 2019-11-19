import React, { Component } from "react";
import Header from "../Header/Header";
import { Link } from "react-router-dom";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import dogs from "../../images/bone.png";
import "./Results.css";

export default class Results extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="results">
        <Header nav={true} />
        <Breadcrumbs />
        <main>
          <h1>Doggy styles similar to {this.props.match.params.breed}s</h1>
          <div className="breeds">
            <Link to="/breeds/Poodle" className="breed">
              <img src={dogs} alt="icon" />
              <h3> Breed: Poodle | Temperament: Playful | 97% Match </h3>
            </Link>
            <Link to="/breeds/Lab" className="breed">
              <img src={dogs} alt="icon" />
              <h3> Breed: Lab | Temperament: Erratic | 93% Match </h3>
            </Link>
            <Link to="/breeds/Pitbull" className="breed">
              <img src={dogs} alt="icon" />
              <h3> Breed: Pitbull | Temperament: Crazy | 90% Match </h3>
            </Link>
          </div>
        </main>
      </div>
    );
  }
}
