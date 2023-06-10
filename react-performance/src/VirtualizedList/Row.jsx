import React from "react";
import "./Row.css";

const Row = ({ image, number, style }) => {
  return (
    <div style={style} className="list-item">
      <img src={image} alt="" />
      <div>Image #{number + 1}</div>
    </div>
  );
};

export default Row;
