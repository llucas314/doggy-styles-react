import React from "react";
import "./BreedProfile.css";

export default function BreedProfile(props) {
  return (
    <>
      <h1>{props.name}</h1>
      <img src={props.url} alt={props.name} />

      {`Temperament: ${props.t}`}
    </>
  );
}
