import classNames from "classnames";
import React from "react";
import "./Button.css";

export default function Button({
  className,
  onClick,
  text,
  type,
  disabled = false,
}) {
  return (
    <button
      onClick={onClick}
      className={classNames(className, "button", "on-hover", {
        [`button_${type}`]: type,
      })}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
