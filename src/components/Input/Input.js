import React from "react";

import "./Input.css";

export default function Input({
  value,
  handleChange,
  errors,
  type = "text",
  minLength,
  maxLength,
  required,
  label,
  id,
}) {
  return (
    <div className="input__container">
      <label className="input__label">{label}</label>
      <input
        id={id}
        value={value}
        type={type}
        className="input"
        minLength={minLength}
        maxLength={maxLength}
        required={required}
        onChange={(e) => handleChange(e)}
      />
      <span className="input__error-message">{errors[id]}</span>
    </div>
  );
}
