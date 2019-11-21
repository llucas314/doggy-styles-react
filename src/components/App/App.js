import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import Search from "../Search/Search";
import Results from "../Results/Results";
import Breed from "../Breed/Breed";
import SignUp from "../SignUp/SignUp";
import About from "../Account/Account";
import Home from "../Home/Home";

function App() {
  return (
    <Switch>
      <Route path="/" exact component={Home}></Route>
      <Route path="/search" exact component={Search}></Route>
      <Redirect from="/breeds" exact to="/search" />>
      <Redirect from="/results" exact to="/search" />>
      <Route
        path="/search/results/:breed"
        render={props => <Results {...props} />}
      ></Route>
      <Route path="/breeds/:id" render={props => <Breed {...props} />}></Route>
      <Route path="/signup" render={props => <SignUp {...props} />}></Route>
      <Route path="/about" render={props => <About {...props} />}></Route>
    </Switch>
  );
}

export default App;
