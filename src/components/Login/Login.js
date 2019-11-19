import React from "react";
import Header from "../Header/Header";
import "./Login.css";

function Login() {
  return (
    <div className="login">
      <Header nav={true} />
      <main>
        <div className="text-wrap">
          <h1>Doggy Styles</h1>
          <h3>A friend for your dog, no matter their style.</h3>
        </div>
      </main>
    </div>
  );
}

export default Login;
