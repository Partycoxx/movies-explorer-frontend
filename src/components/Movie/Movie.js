import React from "react";
import Liked from "../Icons/Liked";
import NotLiked from "../Icons/NotLiked";
import DeleteIcon from "../Icons/DeleteIcon";
import "./Movie.css";

// TODO Добавить обработчики лайков/дислайков/удаления;
// TODO Придумать реализацию isLiked после стыка с бэком Практикума;

export default function Movie({ type, item, index }) {
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

  const pickIcon = () => {
    if (type === "movies") {
      return item.isLiked ? <Liked /> : <NotLiked />;
    } else if (type === "saved-movies") {
      return <DeleteIcon />;
    } else {
      return null;
    }
  };

  return (
    <li className="movie" key={index}>
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
