import React, { useState, useEffect } from "react";
import Button from "../Button/Button";
import "./MoviesList.css";
import Movie from "../Movie/Movie";
import Preloader from "../Preloader/Preloader";

export default function MoviesList({
  type,
  movies,
  moviesListStatus,
  shouldShowPreloader,
}) {
  const [currentScreenSize, setCurrentScreenSize] = useState(0);
  const [moviesList, setMoviesList] = useState([]);
  const [endIndex, setEndIndex] = useState(0);
  const [amountIndex, setAmountIndex] = useState(0);
  const [currentEndIndex, setCurrentEndIndex] = useState(0);

  const resize = () => setCurrentScreenSize(() => window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", resize);
    resize();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  useEffect(() => {
    if (currentScreenSize < 768) {
      setAmountIndex(() => 5);
      setEndIndex(() => 2);
    } else if (currentScreenSize >= 768 && currentScreenSize < 1280) {
      setAmountIndex(() => 8);
      setEndIndex(() => 2);
    } else {
      setAmountIndex(() => 12);
      setEndIndex(() => 3);
    }
  }, [currentScreenSize]);

  useEffect(() => {
    if (checkMoviesInLocalStorage() && movies.length === 0) {
      const storedMovies = JSON.parse(localStorage.getItem("movies"));
      renderMovies(amountIndex, storedMovies);
    } else {
      renderMovies(endIndex, movies);
    }
  }, [amountIndex, movies, endIndex]);

  const renderMovies = (index, dataMovies) => {
    setMoviesList(() => dataMovies.slice(0, index));
    setCurrentEndIndex(() => endIndex + index);
  };

  const checkMoviesInLocalStorage = () =>
    localStorage.getItem("movies") ? true : false;

  const handleButtonClick = (index) => {
    if (checkMoviesInLocalStorage() && movies.length === 0) {
      const storedMovies = JSON.parse(localStorage.getItem("movies"));
      console.log("triggered");
      renderMovies(index, storedMovies);
    } else {
      console.log("triggered2");
      renderMovies(index, movies);
    }
  };

  const mapMovies = () => {
    if (moviesList.length > 0) {
      const mappedMovies = moviesList.map((item, index) => {
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
          {moviesListStatus}
        </div>
      );
    }
  };

  const shouldShowButton = () =>
    moviesList.length > 0 &&
    (moviesList.length < movies.length ||
      moviesList.length < JSON.parse(localStorage.getItem("movies"))?.length);

  console.log("moviesList.length", moviesList.length);

  return (
    <div className="movies-list">
      {shouldShowPreloader ? (
        <Preloader />
      ) : (
        <>
          {mapMovies()}
          {shouldShowButton() && (
            <Button
              className="movies-list__button"
              text="Ещё"
              onClick={() => handleButtonClick(currentEndIndex)}
            />
          )}
        </>
      )}
    </div>
  );
}
