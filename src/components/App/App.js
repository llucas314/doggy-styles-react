import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Login from "../Login/Login";
import Search from "../Search/Search";
import Results from "../Results/Results";

function App() {
  return (
    <Switch>
      <Route path="/" exact component={Login}></Route>
      <Route path="/search" exact component={Search}></Route>
      <Route
        path="/search/results/:breed"
        render={props => <Results {...props} />}
      ></Route>
      <Route
        path="/breeds/:id"
        render={props => <Results {...props} />}
      ></Route>
    </Switch>
  );
}

export default App;
