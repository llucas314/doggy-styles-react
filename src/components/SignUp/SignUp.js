import React, { Component } from "react";
import { Redirect } from "react-router";
import axios from "axios";
import Header from "../Header/Header";
import SubmitInput from "../../storybook/Input/SubmitInput";
import TextInput from "../../storybook/Input/TextInput";
import "./SignUp.css";

export default class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "Enter your information and submit.",
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
      confirm: "",
      hidden: true,
      submitted: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
  }
  handleChange = e => {
    // console.dir(e.target);
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const url = " https://doggystyle-api.herokuapp.com/users/create";
    if (this.props.password === this.state.confirm) {
      axios
        .post(url, {
          email: this.state.email,
          username: this.props.username,
          password: this.props.password,
          firstName: this.state.firstName,
          lastName: this.state.lastName
        })
        .then(res => {
          console.log(res);
        })
        .then(this.props.setLoggedIn)

        .catch(err => console.log(err));
    } else {
      this.setState({ message: "Passwords do not match" });
    }
  };
  toggleShow = e => {
    e.preventDefault();
    this.setState({ hidden: !this.state.hidden });
  };
  render() {
    if (this.props.loggedIn) {
      return (
        <Redirect
          to={{
            pathname: "/account",

            state: {
              username: this.state.username,
              password: this.state.password
            }
          }}
        />
      );
    }
    return (
      <div className="sign-up">
        <Header login={false} />
        <main>
          <div className="text-wrap">
            <h1>Sign Up</h1>
            <h4>{this.state.message}</h4>
          </div>
          <form onSubmit={this.handleSubmit}>
            <TextInput
              name={"firstName"}
              placeholder={"First Name"}
              onChange={this.handleChange}
            />
            <TextInput
              name={"lastName"}
              placeholder={"Last Name"}
              onChange={this.handleChange}
            />
            <TextInput
              name={"email"}
              placeholder={"Email"}
              onChange={this.handleChange}
            />
            <TextInput
              name={"username"}
              placeholder={"Username"}
              onChange={this.props.loginChange}
            />

            <input
              type={this.state.hidden ? "password" : "text"}
              name="password"
              placeholder="Password"
              onChange={this.props.loginChange}
            />
            <input
              type={this.state.hidden ? "password" : "text"}
              name="confirm"
              placeholder="Confirm Password"
              onChange={this.handleChange}
            />
            <button onClick={this.toggleShow}>Show / Hide</button>
            <SubmitInput />
          </form>
        </main>
      </div>
    );
  }
}
