import React, { Component } from "react";
import axios from "axios";
import "./About.css";
import Header from "../Header/Header";

export default class About extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: [{}],
      isLoaded: false,
      hidden: true,
      password: "",
      confirm: "",
      pwChanged: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
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
          password: this.state.password
        })
        .then(res => {
          console.log(res);
        })
        .then(this.setState({ pwChanged: true }))
        .catch(err => console.log(err));
    } else {
      this.setState({ message: "Passwords do not match" });
    }
  };
  toggleShow = e => {
    e.preventDefault();
    this.setState({ hidden: !this.state.hidden });
  };
  updatePassword = e => {
    e.preventDefault();
  };
  componentDidMount() {
    axios
      .get(`http://localhost:8080/users/llucas314/123456`)
      .then(res => {
        this.setState({ user: res.data });
      })
      .then(this.setState({ isLoaded: true }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="about">
        <Header login={true} />
        {this.state.isLoaded ? (
          <main>
            <div className="text-wrap">
              <h1>Hello, {this.state.user[0].firstName}</h1>
              <h2>Would you like to update your account?</h2>
              <h4>
                {this.state.pwChanged ? "Password Updated" : "Change password"}
              </h4>
              <form onSubmit={this.updatePassword}>
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
        ) : (
          ""
        )}
      </div>
    );
  }
}
