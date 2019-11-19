import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Login from "../Login/Login";
import Search from "../Search/Search";

function App() {
  return (
    <Switch>
      <Route path="/" exact component={Login}></Route>
      <Route path="/search" exact component={Search}></Route>
      <Route path="/search/results/:breed" component={Search}></Route>
    </Switch>
  );
}

export default App;
