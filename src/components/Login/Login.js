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
      message: "",
      response: null
    };
    this.toggleShow = this.toggleShow.bind(this);
  }
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
      <div className="login">
        <Header login={false} />
        <Breadcrumbs links={["Home"]} />
        <main>
          <h1>Doggy Styles</h1>
          <p>{this.props.message}</p>
          <form onSubmit={this.props.loginSubmit}>
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
            <button onClick={this.toggleShow}>Show / Hide</button>
            <SubmitInput />
          </form>
        </main>
      </div>
    );
  }
}
