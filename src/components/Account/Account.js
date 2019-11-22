import React, { Component } from "react";
import { Redirect } from "react-router";
import axios from "axios";
import "./Account.css";
import Header from "../Header/Header";

export default class Account extends Component {
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
      age: 0,
      energy_levels: [
        { level: 1, description: "Very Low" },
        { level: 2, description: "Low" },
        { level: 3, description: "Middle of the Road" },
        { level: 4, description: "High" },
        { level: 5, description: "Very High" },
        { level: 6, description: "Crazy" }
      ],
      energy_level: 0,
      dogsInput: false,
      breedValue: [{}],
      dogMessage: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
    this.modalDelete = this.modalDelete.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.toggleDogs = this.toggleDogs.bind(this);
    this.handleDog = this.handleDog.bind(this);
    this.handleEnergy = this.handleEnergy.bind(this);
    this.updateDog = this.updateDog.bind(this);
    this.deleteDog = this.deleteDog.bind(this);
  }
  handleChange = e => {
    if (e.target.name === "age") {
      const ageInt = parseInt(e.target.value);
      console.log(ageInt);
      this.setState({ age: ageInt });
    } else this.setState({ [e.target.name]: e.target.value });
  };
  handleDog = e => {
    for (let i = 0; i < this.props.breeds.length; i++) {
      console.log(e.target.value);
      if (this.props.breeds[i].name === e.target.value) {
        let specificBreed = this.state.breedValue[0];
        console.log(specificBreed);
        specificBreed.name = e.target.value;
        specificBreed.temperament = this.props.breeds[i].temperament;
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
        const levelInt = parseInt(e.target.value);
        this.setState({
          energy_level: levelInt
        });
      }
    }
  };
  updatePassword = e => {
    e.preventDefault();
    const url = `${this.props.baseUrl}/users/update/${this.state.user._id}`;
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
  updateDog = e => {
    e.preventDefault();
    const url = `${this.props.baseUrl}/users/${this.state.user._id}/dogs/create`;

    axios
      .post(url, {
        breed: this.state.breedValue,
        petName: this.state.petName,
        energy_level: this.state.energy_level,
        age: this.state.age
      })
      .then(res => {
        console.log(res);
        this.getUserInfo();
      })
      .catch(err => console.log(err));

    this.setState({ dogMessage: "Added Dog" });
  };

  deleteDog = e => {
    e.preventDefault();
    console.log(e.target.value);
    axios
      .delete(
        `${this.props.baseUrl}/users/${this.state.user._id}/dogs/delete/${e.target.value}`
      )
      .then(res => {
        console.log(res);
        this.getUserInfo();
      })
      .catch(err => console.log(err));
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
      .delete(`${this.props.baseUrl}/users/delete/${this.state.user._id}`)
      .then(res => {
        console.log(res);
        this.setState({ deleted: true });
      })
      .catch(err => console.log(err));
  };
  getUserInfo = () => {
    if (this.props.username === "") {
      this.setState({ deleted: true });
    } else {
      axios
        .get(
          `${this.props.baseUrl}/users/${this.props.username}/${this.props.password}`
        )
        .then(res => {
          const userJson = { ...res.data[0] };
          console.log("res.data[0]", res.data[0]);
          this.setState({
            user: userJson,
            dogs: res.data[0].dogs,
            isLoaded: true
          });
          console.log("component did mount");
        })
        .catch(err => {
          console.log(err);
        });
    }
  };
  componentDidMount() {
    this.getUserInfo();
  }

  render() {
    console.log("render", this.state.isLoaded);
    // console.log(this.state);
    if (this.state.deleted) {
      return <Redirect to="/" />;
    }

    if (this.state.isLoaded) {
      return (
        <div className="account">
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
                    <li key={dog._id} className="dog">
                      <p>
                        {dog.petName}
                        <br />
                        -Energy Level: {dog.energy_level}
                        <br />
                        -Age: {dog.age}
                        <br />
                        -Breed :{dog.breed[0].name}
                      </p>
                      <button onClick={this.deleteDog} value={dog._id}>
                        Delete This Dog
                      </button>
                    </li>
                  ))}
                </ul>
                <button onClick={this.toggleDogs}>Add A Dog</button>
                <p>{this.state.dogMessage}</p>
                {this.state.dogsInput ? (
                  <form onSubmit={this.updateDog}>
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
                      {this.props.breeds.map(breed => {
                        return (
                          <option key={breed._id} value={breed.name}>
                            {breed.name}
                          </option>
                        );
                      })}
                    </select>
                    <input type="submit" value="Add Dog" />
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
                    <div className="modal-wrap">
                      <h3>Are You Sure?</h3>
                      <div className="modal-button">
                        <button onClick={this.handleDelete}>Yes</button>
                        <button onClick={() => this.setState({ modal: false })}>
                          NO
                        </button>
                      </div>
                    </div>
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
