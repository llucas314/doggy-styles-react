import React from "react";
import Header from "../Header/Header";
import "./Login.css";
// import goodDog from "../../images/good_dog.png";
// import badDog from "../../images/bad_dog.png";
function Login() {
  return (
    <div className="login">
      <Header nav={true} />
      <main>
        {/* <div className="img-wrap">
          <img src={goodDog} alt="Good Dog" />
        </div> */}
        <div className="text-wrap">
          <h1>Doggy Styles</h1>
          <h3>A friend for your dog, no matter their style.</h3>
        </div>
        {/* <div className="img-wrap">
          <img src={badDog} alt="Bad Dog" />
        </div> */}
      </main>
    </div>
  );
}

export default Login;
