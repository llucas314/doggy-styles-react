import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";

function App() {
  return (
    <Route>
      <Route path="/" component={Header}></Route>
    </Route>
  );
}

export default App;
