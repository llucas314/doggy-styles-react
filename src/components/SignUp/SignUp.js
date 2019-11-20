import React, { Component } from "react";
import { Redirect } from "react-router";
import axios from "axios";
import Header from "../Header/Header";
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
    console.dir(e.target);
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const url =
      "https://cors-anywhere.herokuapp.com/localhost:8080/users/create";
    if (this.state.password === this.state.confirm) {
      axios
        .post(url, {
          email: this.state.email,
          username: this.state.username,
          password: this.state.password,
          firstName: this.state.firstName,
          lastName: this.state.lastName
        })
        .then(res => {
          console.log(res);
        })
        .then(this.setState({ submitted: true }))
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
    if (this.state.submitted) {
      return <Redirect to="/about" />;
    }
    return (
      <div className="sign-up">
        <Header login={false} />
        <main>
          <div className="text-wrap">
            <h1>Sign Up</h1>
            <h2>{this.state.message}</h2>
            <form onSubmit={this.handleSubmit}>
              <label>
                First Name:
                <input
                  type="text"
                  name="firstName"
                  onChange={this.handleChange}
                />
              </label>
              <label>
                Last Name:
                <input
                  type="text"
                  name="lastName"
                  onChange={this.handleChange}
                />
              </label>
              <label>
                Email:
                <input type="text" name="email" onChange={this.handleChange} />
              </label>
              <label>
                Username:
                <input
                  type="text"
                  name="username"
                  onChange={this.handleChange}
                />
              </label>
              <label>
                Password:
                <input
                  type={this.state.hidden ? "password" : "text"}
                  name="password"
                  onChange={this.handleChange}
                />
              </label>
              <label>
                Confirm Password:
                <input
                  type={this.state.hidden ? "password" : "text"}
                  name="confirm"
                  onChange={this.handleChange}
                />
                <button onClick={this.toggleShow}>Show / Hide</button>
              </label>
              <input type="submit" value="Submit" />
            </form>
          </div>
        </main>
      </div>
    );
  }
}
