import React from "react";
import "./Buttons.scss";

const Buttons = ({ children, onClick, selected }) => {
  return <span  onClick={onClick} className="buttons">{children}</span>;
};

export default Buttons;
