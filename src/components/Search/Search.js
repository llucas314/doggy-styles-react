import React, { Component } from "react";
import Header from "../Header/Header";
import { Link } from "react-router-dom";
import axios from "axios";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import Dog from '../../storybook/Dog/Dog';
import "./Search.css";

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
      .get("https://doggystyle-api.herokuapp.com/breeds")
      .then(res => this.setState({ breeds: res.data }))
      .then(this.setState({ isLoaded: true }))
      .catch(err => console.log(err));
  }
  render() {
    return (
      <div className="search">
        <Header login={true} />
        <Breadcrumbs links={["Search"]} />
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
                  <Dog />
                </Link>
              ) : (
                <Link
                  to={{
                    pathname: `/breeds/${this.state.value}`,
                    state: { breeds: this.state.breeds }
                  }}
                >
                  <Dog />
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
