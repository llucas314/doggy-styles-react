import React, { Component } from "react";
import Header from "../Header/Header";
import { Link, Redirect } from "react-router-dom";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import Dog from "../../storybook/Dog/Dog";
import "./Search.css";
import Select from "../Select/Select";

export default class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      breeds: this.props.breedsIds,
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
  render() {
    if (this.props.loggedIn === false) {
      return <Redirect to="/" />;
    }
    return (
      <div className="search">
        <Header login={true} logOut={this.props.logOut} />
        <Breadcrumbs links={["Search"]} />

        <main>
          <form onSubmit={this.handleSubmit}>
            <h1>Search for a breed</h1>
            <div className="search-select">
              <Select
                default={this.state.value}
                handleChange={this.handleChange}
                array={this.props.breeds}
                selectOptions={"Choose a Breed"}
              />
              {this.state.value === "" ? (
                <Link to={`/search`}>
                  <Dog />
                </Link>
              ) : (
                <Link
                  to={{
                    pathname: `/breeds/${this.state.value}`
                  }}
                >
                  <Dog />
                </Link>
              )}
            </div>
          </form>
          <div className="img-wrap"></div>
        </main>
      </div>
    );
  }
}
