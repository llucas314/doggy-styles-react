import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import goodDog from '../../images/good_dog.png';
import "./Breed.css";

export default class Breed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      breeds: this.props.location.state.breeds,
      dogBreed: "",
      isLoaded: false
    };
  }
  componentDidMount() {
    console.log("component did mount");
    this.state.breeds.forEach(breed => {
      if (breed.name === this.props.match.params.id) {
        this.setState({ breeds: breed });
        axios
          .get(
            `https://api.thedogapi.com/v1/images/search?breed_ids=${breed.id}&api_key=22ea4027-cfc1-464e-89c4-aed63db671ad`
          )
          .then(res => this.setState({ dogBreed: res.data[0] }))
          .then(this.setState({ isLoaded: true }))
          .catch(err => console.log(err));
      }
    });
  }
  render() {
    return (
      <div className="breed-page">
        <Header login={true} />
        <Breadcrumbs links={["Search", "Breeds"]} />
        <main>
          <h1>{this.state.breeds.name}</h1>
          <img src={this.state.dogBreed ? this.state.dogBreed.url : goodDog} alt={this.state.breeds.name} />
          <h3>Temperament: {this.state.breeds.temperament}</h3>
          <div className="link-wrap">
            <Link to="/search" className="breed-link">
              Back to Search
            </Link>{" "}
            |{" "}
            <Link
              to={`/search/results/${this.state.breeds.name}`}
              className="breed-link"
            >
              {" "}
              See Dogs With Similar Styles
            </Link>
          </div>
        </main>
      </div>
    );
  }
}
