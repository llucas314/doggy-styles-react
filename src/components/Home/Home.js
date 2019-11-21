import React from "react";
import Header from "../Header/Header";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <Header login={false} />
      <main>
        <div className="text-wrap">
          <h1>Doggy Styles</h1>
          <h3>A friend for your dog, no matter their style.</h3>
        </div>
      </main>
    </div>
  );
}

export default Home;
