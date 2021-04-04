import React from "react";
import Button from "../Button/Button";
import Slider from "../Slider/Slider";
import "./Search.css";

export default function Search() {
  return (
    <div className="search">
      <input className="search__input" placeholder="Фильм" />
      <Button
        className="search__button"
        onClick={() => {}}
        text="Найти"
        type="primary"
      />
      <Slider />
    </div>
  );
}
