import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";

function App() {
  return (
    <Switch>
      <Route path="/" render={() => <Header nav={true} />}></Route>
    </Switch>
  );
}

export default App;
