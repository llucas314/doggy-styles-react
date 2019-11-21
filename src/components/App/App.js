import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import axios from "axios";
import Search from "../Search/Search";
import Results from "../Results/Results";
import Breed from "../Breed/Breed";
import SignUp from "../SignUp/SignUp";
import About from "../Account/Account";
import Home from "../Home/Home";
export default class App extends Component {
  constructor() {
    super();

    this.state = {
      breeds: [{}],
      isLoaded: false,
      baseUrl: "https://doggystyle-api.herokuapp.com"
    };
  }

  componentDidMount() {
    axios
      .get(`${this.state.baseUrl}/breeds`)
      .then(res => this.setState({ breeds: res.data, isLoaded: true }))
      .catch(err => console.log(err));
  }
  render() {
    return (
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route
          path="/search"
          exact
          render={props => <Search {...props} {...this.state} />}
        ></Route>
        <Redirect from="/breeds" exact to="/search" />>
        <Redirect from="/results" exact to="/search" />>
        <Route
          path="/search/results/:breed"
          render={props => <Results {...props} {...this.state} />}
        ></Route>
        <Route
          path="/breeds/:id"
          render={props => <Breed {...props} breeds={this.state.breeds} />}
        ></Route>
        <Route
          path="/signup"
          render={props => <SignUp {...props} {...this.state} />}
        ></Route>
        <Route
          path="/about"
          render={props => <About {...props} {...this.state} />}
        ></Route>
      </Switch>
    );
  }
}
