import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Login from "../Login/Login";

function App() {
  return (
    <Switch>
      <Route path="/" component={Login}></Route>
    </Switch>
  );
}

export default App;
