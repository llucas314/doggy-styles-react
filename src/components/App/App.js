import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import axios from "axios";
import Search from "../Search/Search";
import Results from "../Results/Results";
import Breed from "../Breed/Breed";
import SignUp from "../SignUp/SignUp";
import Account from "../Account/Account";
import Home from "../Home/Home";
import Login from "../Login/Login";
export default class App extends Component {
  constructor() {
    super();

    this.state = {
      breeds: [],
      isLoaded: false,
      baseUrl: "https://doggystyle-api.herokuapp.com",
      breedsIds: [],
      username: "",
      password: "",
      message: "",
      loggedIn: false
    };
    this.loginChange = this.loginChange.bind(this);
    this.loginSubmit = this.loginSubmit.bind(this);
  }
  loginSubmit = e => {
    e.preventDefault();

    axios
      .get(
        `${this.state.baseUrl}/users/${this.state.username}/${this.state.password}`
      )
      .then(res => {
        if (res.data.length === 0) {
          this.setState({ message: "Try Again" });
          this.setState({ loggedIn: false });
        } else {
          this.setState({ loggedIn: true });
        }
      });
  };
  loginChange = e => {
    this.setState({ message: "" });
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidMount() {
    axios
      .get(`${this.state.baseUrl}/breeds`)
      .then(res =>
        this.setState({
          breeds: res.data,
          isLoaded: true,
          breedsIds: res.data.map(breed => breed.id)
        })
      )

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
          render={props => (
            <SignUp
              {...props}
              {...this.state}
              loginChange={this.loginChange}
              loginSubmit={this.loginSubmit}
            />
          )}
        ></Route>
        <Route
          path="/account"
          render={props => <Account {...props} {...this.state} />}
        ></Route>
        <Route
          path="/login"
          render={props => (
            <Login
              {...props}
              {...this.state}
              loginChange={this.loginChange}
              loginSubmit={this.loginSubmit}
            />
          )}
        ></Route>
      </Switch>
    );
  }
}
