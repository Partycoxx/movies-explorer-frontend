import React, { useContext } from "react";
import { SavedMoviesContext } from "../../contexts/SavedMoviesContext";
import Liked from "../Icons/Liked";
import NotLiked from "../Icons/NotLiked";
import DeleteIcon from "../Icons/DeleteIcon";
import "./Movie.css";

export default function Movie({
  type,
  item,
  index,
  onSaveMovie,
  onDeleteMovie,
}) {
  const savedMoviesList = useContext(SavedMoviesContext);

  const isMovieLiked = () => {
    return savedMoviesList.some((movie) => movie.movieId === item.movieId);
  };

  const formatDuration = (time) => {
    const hours = Math.floor(time / 60);
    const minutes = time - hours * 60;

    if (hours > 0 && minutes > 0) {
      return `${hours}ч ${minutes}м`;
    } else if (!hours && minutes > 0) {
      return `${minutes}м`;
    } else if (hours > 0 && !minutes) {
      return `${hours}ч`;
    } else {
      return "";
    }
  };

  const handleIconClick = (e, func, data) => {
    e.stopPropagation();
    func(data);
  };

  const handleCardClick = (link) => {
    window.open(link, "_blank");
  };

  const pickIcon = () => {
    if (type === "movies") {
      return isMovieLiked() ? (
        <Liked
          onClick={(e) => handleIconClick(e, onDeleteMovie, item.movieId)}
        />
      ) : (
        <NotLiked onClick={(e) => handleIconClick(e, onSaveMovie, item)} />
      );
    } else if (type === "saved-movies") {
      return (
        <DeleteIcon
          onClick={(e) => handleIconClick(e, onDeleteMovie, item.movieId)}
        />
      );
    } else {
      return null;
    }
  };

  return (
    <li
      className="movie"
      key={index}
      onClick={() => handleCardClick(item.trailer)}
    >
      <div className="movie__info-container">
        <div className="movie__info">
          <h2 className="movie__title">{item.nameRU}</h2>
          <span className="movie__duration">
            {formatDuration(item.duration)}
          </span>
        </div>
        {pickIcon()}
      </div>
      <img src={item.image} alt={item.nameRU} className="movie__image" />
    </li>
  );
}
