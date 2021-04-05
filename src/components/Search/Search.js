import React, { useState } from "react";
import Button from "../Button/Button";
import Slider from "../Slider/Slider";
import "./Search.css";

export default function Search({ onFormSubmit }) {
  const [searchData, setSearchData] = useState({
    movie: "",
    hasShortFilms: false,
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onFormSubmit(searchData);
  };

  const handleSLiderChange = (e) => {
    setSearchData((searchData) => ({
      ...searchData,
      hasShortFilms: e.target.checked,
    }));
  };

  const handleInputChange = (e) => {
    setSearchData((searchData) => ({
      ...searchData,
      [e.target.name]: e.target.value,
    }));
  };

  const isInputEmpty = () => (searchData.movie.length === 0 ? true : false);

  return (
    <form className="search" onSubmit={handleFormSubmit}>
      <input
        className="search__input"
        placeholder="Фильм"
        name="movie"
        value={searchData.movie}
        onChange={handleInputChange}
        required={true}
      />
      <Button
        className="search__button"
        onClick={handleFormSubmit}
        text="Найти"
        type="primary"
        disabled={isInputEmpty()}
      />
      <Slider
        value={searchData.hasShortFilms}
        clickHandler={handleSLiderChange}
      />
    </form>
  );
}
