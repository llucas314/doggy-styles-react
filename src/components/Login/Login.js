import React, { Component } from "react";
import "./Login.css";
import { Redirect } from "react-router";
import Header from "../Header/Header";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import SubmitInput from "../../storybook/Input/SubmitInput";
import TextInput from "../../storybook/Input/TextInput";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      hidden: true,
      submitted: false,
      message: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
  }
  handleSubmit = e => {
    e.preventDefault();
    this.setState({ message: "Try Again" });
    this.setState({ submitted: true });
  };
  handleChange = e => {
    // console.dir(e.target);
    this.setState({ [e.target.name]: e.target.value });
  };
  toggleShow = e => {
    e.preventDefault();
    this.setState({ hidden: !this.state.hidden });
  };
  render() {
    if (this.state.submitted) {
      return (
        <Redirect
          to={{
            pathname: "/about",

            state: {
              username: this.state.username,
              password: this.state.password
            }
          }}
        />
      );
    }
    return (
      <div className="login">
        <Header login={false} />
        <Breadcrumbs links={["Home"]} />
        <main>
          <h1>Doggy Styles</h1>
          <p>{this.state.message}</p>
          <form onSubmit={this.handleSubmit}>
            <TextInput
              name={"username"}
              placeholder={"Username"}
              onChange={this.handleChange}
            />

            <input
              type={this.state.hidden ? "password" : "text"}
              name="password"
              placeholder="Password"
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