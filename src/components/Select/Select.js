import React from "react";
import "./Select.css";

export default function Select(props) {
  return (
    <select value={props.default} onChange={props.handleChange}>
      <option value="">{props.selectOptions}</option>
      {props.array.map((item, index) => (
        <option key={index} value={item.name}>
          {item.name}
        </option>
      ))}
    </select>
  );
}
