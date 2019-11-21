import React, { Component } from "react";
import Header from "../Header/Header";
import { Link } from "react-router-dom";
import axios from "axios";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import Dog from "../../storybook/Dog/Dog";
import "./Search.css";
import Select from "../Select/Select";

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
    // axios
    //   .get("https://doggystyle-api.herokuapp.com/breeds")
    //   .then(res => this.setState({ breeds: res.data }))
    //   .then(this.setState({ isLoaded: true }))
    //   .catch(err => console.log(err));
  }
  render() {
    return (
      <div className="search">
        <Header login={true} />
        <Breadcrumbs links={["Search"]} />

        <main>
          <h1>Find your dog's breed</h1>
          <form onSubmit={this.handleSubmit}>
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
          </form>
        </main>
      </div>
    );
  }
}
