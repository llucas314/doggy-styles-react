import React from "react";
import "./BreedProfile.css";

export default function BreedProfile(props) {
  return (
    <div className="breed-profile">
      <div className="img-wrap">
        <h1 className="dog-name">{props.name}</h1>
        <img src={props.url} alt={props.name} />
      </div>

      {`Temperament: ${props.t}`}
    </div>
  );
}
