import React, { Component } from "react";
import "./Login.css";
import { Redirect } from "react-router";
import Header from "../Header/Header";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import SubmitInput from "../../storybook/Input/SubmitInput";
import TextInput from "../../storybook/Input/TextInput";
import loginImg from "../../images/login.jpg";

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
          <div className="img-wrap">
            {/* <img src={loginImg} alt="Dogs" /> */}
          </div>
          <div className="login-text">
            <h1>Welcome back!</h1>
            <h3>Let's Get Your Dog's Style</h3>
            <p>{this.props.message}</p>
            <form onSubmit={this.props.loginSubmit}>
              <button className="submit-btn" onClick={this.toggleShow}>
                Show / Hide Password
              </button>
              <TextInput
                name={"username"}
                placeholder={"Username"}
                onChange={this.props.loginChange}
              />
              <input
                className="input-text"
                type={this.state.hidden ? "password" : "text"}
                name="password"
                placeholder="Password"
                onChange={this.props.loginChange}
              />

              <SubmitInput />
            </form>
          </div>
        </main>
      </div>
    );
  }
}
