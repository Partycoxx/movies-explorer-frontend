import React from "react";
import "./MoviesList.css";
import Movie from "../Movie/Movie";

export default function MoviesList({
  type,
  movies,
  handleSaveMovie,
  handleDeleteMovie,
  moviesListStatus = "",
}) {
  const mapMovies = () => {
    if (movies.length > 0) {
      const mappedMovies = movies.map((item, index) => {
        return (
          <Movie
            type={type}
            item={item}
            key={item.movieId}
            onSaveMovie={handleSaveMovie}
            onDeleteMovie={handleDeleteMovie}
          />
        );
      });

      return (
        <ul className="movies-list__container movies-list__container_full">
          {mappedMovies}
        </ul>
      );
    } else {
      return (
        <div className="movies-list__container movies-list__container_empty">
          {moviesListStatus}
        </div>
      );
    }
  };

  return <div className="movies-list">{mapMovies()}</div>;
}
