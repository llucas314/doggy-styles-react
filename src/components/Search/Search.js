import React, { Component } from "react";
import Header from "../Header/Header";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Search.css";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";

export default class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      breeds: [],
      value: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleSubmit = e => {
    e.preventDefault();
  };
  handleChange = e => {
    this.setState({ value: e.target.value });
  };

  componentDidMount() {
    axios
      .get("http://localhost:8080/breeds")
      .then(res => this.setState({ breeds: res.data }))
      .then(this.setState({ isLoaded: true }))
      .catch(err => console.log(err));
  }
  render() {
    return (
      <div className="search">
        <Header nav={true} />
        <Breadcrumbs />
        {this.state.isLoaded ? (
          <main>
            <h1>Find your dog's breed</h1>
            <form onSubmit={this.handleSubmit}>
              <select value={this.state.value} onChange={this.handleChange}>
                <option value="">Choose a breed</option>
                {this.state.breeds.map(breed => (
                  <option key={breed._id} value={breed.name}>
                    {breed.name}
                  </option>
                ))}
              </select>
              {this.state.value === "" ? (
                <Link to={`/search`}>
                  <i class="fas fa-dog"></i>
                </Link>
              ) : (
                <Link to={`/search/results/${this.state.value}`}>
                  <i class="fas fa-dog"></i>
                </Link>
              )}
            </form>
          </main>
        ) : (
          <main>
            <h1>Loading...</h1>
          </main>
        )}
      </div>
    );
  }
}
