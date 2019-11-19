import React, { Component } from "react";
import Header from "../Header/Header";
import { Link } from "react-router-dom";
import "./Search.css";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";

export default class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "German Shepard"
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
  render() {
    return (
      <div className="search">
        <Header nav={true} />
        <Breadcrumbs />
        <main>
          <h1>Find your dog's breed</h1>
          <form onSubmit={this.handleSubmit}>
            <select value={this.state.value} onChange={this.handleChange}>
              <option value="german shepard">German Shepard</option>
              <option value="gsp">German Short-haired Pointer</option>
              <option value="poodle">Poodle</option>
              <option value="boxer">Boxer</option>
              <option value="chihuahua">Chihuahua</option>
            </select>

            {/* <button type="submit">
              <i class="fas fa-dog"></i>
            </button> */}
            <Link to={`/search/results/${this.state.value}`}>
              <i class="fas fa-dog"></i>
            </Link>
          </form>
        </main>
      </div>
    );
  }
}
