import React, { Component } from "react";
import { Redirect } from "react-router";
import axios from "axios";
import "./About.css";
import Header from "../Header/Header";

export default class About extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      isLoaded: false,
      hidden: true,
      password: "",
      confirm: "",
      pwChanged: false,
      dogs: [{}],
      modal: false,
      delete: false,
      message: "",
      deleted: false,
      breeds: [{}],
      petName: "",
      age: "",
      energy_levels: [
        { level: 1, description: "Very Low" },
        { level: 2, description: "Low" },
        { level: 3, description: "Middle of the Road" },
        { level: 4, description: "High" },
        { level: 5, description: "Very High" },
        { level: 6, description: "Crazy" }
      ],
      energy_level: [{}],
      dogsInput: false,
      breedValue: [{}]
    };
    this.handleChange = this.handleChange.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
    this.modalDelete = this.modalDelete.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.toggleDogs = this.toggleDogs.bind(this);
    this.handleDog = this.handleDog.bind(this);
    this.handleEnergy = this.handleEnergy.bind(this);
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleDog = e => {
    for (let i = 0; i < this.state.breeds.length; i++) {
      console.log(e.target.value);
      if (this.state.breeds[i].name === e.target.value) {
        let specificBreed = this.state.breedValue[0];
        console.log(specificBreed);
        specificBreed.name = e.target.value;
        specificBreed.temperament = this.state.breeds[i].temperament;
        this.setState({
          breedValue: [specificBreed]
        });
      }
    }
  };
  handleEnergy = e => {
    for (let i = 0; i < this.state.energy_levels.length; i++) {
      console.log(e.target.value);
      if (this.state.energy_levels[i].level === parseInt(e.target.value)) {
        let specificEnergy = this.state.energy_level[0];
        console.log(specificEnergy);
        specificEnergy.level = e.target.value;
        specificEnergy.description = this.state.energy_levels[i].description;
        this.setState({
          energy_level: [specificEnergy]
        });
      }
    }
  };
  updatePassword = e => {
    e.preventDefault();
    const url = `https://doggystyle-api.herokuapp.com/users/update/${this.state.user._id}`;
    if (this.state.password === this.state.confirm) {
      axios
        .put(url, {
          password: this.state.password
        })
        .then(res => {
          console.log(res);
        })
        .then(() => {
          const user = { ...this.state.user };
          user.password = this.state.password;
          this.setState({ user });
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
  toggleDogs = e => {
    e.preventDefault();
    this.setState({ dogsInput: !this.state.dogsInput });
  };

  modalDelete = e => {
    e.preventDefault();
    this.setState({ modal: true });
  };
  handleDelete = e => {
    e.preventDefault();
    axios
      .delete(
        `https://doggystyle-api.herokuapp.com/users/delete/${this.state.user._id}`
      )
      .then(res => {
        console.log(res);
        this.setState({ deleted: true });
      })
      .catch(err => console.log(err));
  };

  componentDidMount() {
    axios
      .get(
        `https://doggystyle-api.herokuapp.com/users/${this.props.location.state.username}/${this.props.location.state.password}`
      )
      .then(res => {
        const userJson = { ...res.data[0] };
        this.setState({ user: userJson });
        this.setState({ dogs: res.data[0].dogs });
        this.setState({ isLoaded: true });
      })
      .catch(err => console.log(err));
    axios
      .get("https://doggystyle-api.herokuapp.com/breeds")
      .then(res => this.setState({ breeds: res.data }))
      .catch(err => console.log(err));
  }

  render() {
    if (this.state.deleted) {
      return <Redirect to="/" />;
    } else if (this.state.isLoaded) {
      return (
        <div className="about">
          <Header login={true} />
          {this.state.isLoaded ? (
            <main>
              <div className="text-wrap">
                <h1>Hello, {this.state.user.firstName}</h1>
                <h2>Would you like to update your account?</h2>
                {/* list of dogs */}
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
                <button onClick={this.toggleDogs}>Add A Dog</button>
                {this.state.dogsInput ? (
                  <form>
                    <input
                      type="text"
                      name="petName"
                      placeholder="Dog's Name"
                      onChange={this.handleChange}
                    />{" "}
                    <input
                      type="text"
                      name="age"
                      placeholder="Dog's Age"
                      onChange={this.handleChange}
                    />{" "}
                    <select name="energy_level" onChange={this.handleEnergy}>
                      <option>Choose your dog's energy level</option>
                      {this.state.energy_levels.map(energy_level => (
                        <option
                          key={energy_level.level}
                          value={energy_level.level}
                        >
                          {energy_level.description} ({energy_level.level})
                        </option>
                      ))}
                    </select>
                    <select name="breedValue" onChange={this.handleDog}>
                      <option>Choose a breed</option>
                      {this.state.breeds.map(breed => {
                        return (
                          <option key={breed._id} value={breed.name}>
                            {breed.name}
                          </option>
                        );
                      })}
                    </select>
                  </form>
                ) : (
                  ""
                )}
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
    return (
      <div className="about">
        <Header login={true} />
        <main>
          <div className="text-wrap">Loading...</div>
        </main>
      </div>
    );
  }
}
