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

    this.state = {
      isLoaded: false,
      breeds: []
    };
  }
  componentDidMount() {
    axios
      .get(`http://localhost:8080/breeds`)
      .then(res => this.setState({ breeds: res.data }))
      .then(this.setState({ isLoaded: true }))
      .catch(err => console.log(err));
  }
  render() {
    return (
      <div className="results">
        <Header nav={true} />
        <Breadcrumbs />
        <main>
          <h1>Doggy styles similar to {this.props.match.params.breed}s</h1>
          <div className="breeds">
            <Link
              to={{
                pathname: `/breeds/Poodle%20(Toy)`,
                state: { breeds: this.state.breeds }
              }}
              className="breed"
            >
              <img src={dogs} alt="icon" />
              <h3> Breed: Poodle | Temperament: Playful | 97% Match </h3>
            </Link>
            <Link
              to={{
                pathname: `/breeds/Labrador%20Retriever`,
                state: { breeds: this.state.breeds }
              }}
              className="breed"
            >
              <img src={dogs} alt="icon" />
              <h3> Breed: Lab | Temperament: Erratic | 93% Match </h3>
            </Link>
            <Link
              to={{
                pathname: `/breeds/American%20Pit%20Bull%20Terrier`,
                state: { breeds: this.state.breeds }
              }}
              className="breed"
            >
              <img src={dogs} alt="icon" />
              <h3> Breed: Pitbull | Temperament: Crazy | 90% Match </h3>
            </Link>
          </div>
        </main>
      </div>
    );
  }
}
