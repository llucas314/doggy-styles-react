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
      pwChanged: false,
      dogs: [{}],
      modal: false,
      delete: false,
      message: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
    this.modalDelete = this.modalDelete.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  handleChange = e => {
    console.dir(e.target);
    this.setState({ [e.target.name]: e.target.value });
  };

  updatePassword = e => {
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
      this.setState({ message: "- Passwords do not match" });
    }
  };
  toggleShow = e => {
    e.preventDefault();
    this.setState({ hidden: !this.state.hidden });
  };

  modalDelete = e => {
    e.preventDefault();
    this.setState({ modal: true });
  };
  handleDelete = e => {
    e.preventDefault();
    axios
      .delete(
        `https://doggystyle-api.herokuapp.com/users/delete/${this.state.user[0]._id}`
      )
      .then(res => {
        this.setState({ user: res.data });
        this.setState({ dogs: res.data[0].dogs });
      })
      .catch(err => console.log(err));
  };

  componentDidMount() {
    axios
      .get(
        `https://doggystyle-api.herokuapp.com/users/${this.props.location.state.username}/${this.props.location.state.password}`
      )
      .then(res => {
        this.setState({ user: res.data });
        this.setState({ dogs: res.data[0].dogs });
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
              <h4>Dogs</h4>
              <ul className="dog-list">
                {this.state.dogs.map((dog, i) => (
                  <li key={i} className="dog">
                    <p>
                      {dog.petName}
                      <br />
                      -Energy Level: {dog.energy_level}
                      <br />
                      -Age: {dog.age}
                      {/* <br />
                      -Breed :{name} */}
                    </p>
                  </li>
                ))}
              </ul>
              <h4>Add A Dog</h4>
              <h4>
                {this.state.pwChanged
                  ? "Password Updated"
                  : `Change password ${this.state.message}`}
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
              <h4>Delete Account</h4>
              <button onClick={this.modalDelete}>Delete</button>
              {this.state.modal ? (
                <div className="delete-modal">
                  <h3>Are You Sure?</h3>
                  <button onClick={this.handleDelete}>Yes</button>
                  <button onClick={() => this.setState({ modal: false })}>
                    NO
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
          </main>
        ) : (
          ""
        )}
      </div>
    );
  }
}
