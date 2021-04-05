import React from "react";
import Button from "../Button/Button";
import "./MoviesList.css";
import Movie from "../Movie/Movie";

export default function MoviesList({ type, movies }) {
  const mapMovies = () => {
    if (movies) {
      const mappedMovies = movies.map((item, index) => {
        return <Movie type={type} item={item} key={index} />;
      });

      return (
        <ul className="movies-list__container movies-list__container_full">
          {mappedMovies}
        </ul>
      );
    } else {
      return (
        <div className="movies-list__container movies-list__container_empty">
          Похоже, список фильмов пуст
        </div>
      );
    }
  };

  return (
    <div className="movies-list">
      {mapMovies()}
      {type === "movies" && (
        <Button className="movies-list__button" text="Ещё" onClick={() => {}} />
      )}
    </div>
  );
}
