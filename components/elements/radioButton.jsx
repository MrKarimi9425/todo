import React from "react";

const RadioButton = ({ changeHandler, value, title, children, checked }) => {
  return (
    <div className={value}>
      <label htmlFor={value}>
        {children}
        {title}
      </label>
      <input
        type="radio"
        name="status"
        id={value}
        value={value}
        onChange={changeHandler}
        checked={checked}
      />
    </div>
  );
};

export default RadioButton;
