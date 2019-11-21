import React, { Component } from "react";
import Header from "../Header/Header";
import { Link } from "react-router-dom";
import axios from "axios";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import dogs from "../../images/bone.png";
import "./Results.css";

export default class Results extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let currBreed = this.props.breeds.filter(breed => breed.name === this.props.match.params.breed);
    console.log(currBreed);
    return (
      <div className="results">
        <Header login={true} />
        <Breadcrumbs links={["Search", "Breeds", "Results"]} />
        <main>
          <h1>Doggy styles similar to {this.props.match.params.breed}s</h1>
          <div className="breeds">
            {currBreed.length ?
              currBreed[0].compatibleWith.map(compatBreed => {
                return (
                  <Link
                    to={{
                      pathname: `/breeds/${compatBreed}`,
                    }}
                    className="breed"
                  >
                    <img src={dogs} alt="icon" />
                    <h3> {compatBreed} </h3>
                  </Link>
                )
              }) : []
            }
          </div>
        </main>
      </div>
    );
  }
}
