import React from "react";
import "./Slider.css";

export default function Slider({ value, clickHandler }) {
  return (
    <>
      <div className="slider">
        <input
          id="slider-input"
          className="slider__input"
          type="checkbox"
          checked={value}
          onChange={clickHandler}
        />
        <label className="slider__toggle-item" htmlFor="slider-input"></label>
        <span className="slider__text">Короткометражки</span>
      </div>
    </>
  );
}
