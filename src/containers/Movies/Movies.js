import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import ContentBlock from "../../components/ContentBlock/ContentBlock";
import Search from "../../components/Search/Search";
import Footer from "../../components/Footer/Footer";
import MoviesList from "../../components/MoviesList/MoviesList";
import Button from "../../components/Button/Button";
import Preloader from "../../components/Preloader/Preloader";

import "./Movies.css";

export default function Movies({
  onFormSubmit,
  movies,
  shouldShowPreloader,
  isLoggedIn,
  handleSaveMovie,
  handleDeleteMovie,
  cleanUp,
}) {
  const [moviesListStatus, setMoviesListStatus] = useState("");
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
      cleanUp();
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
      renderMovies(index, storedMovies);
    } else {
      renderMovies(index, movies);
    }
  };
  const shouldShowButton = () =>
    moviesList.length > 0 &&
    (moviesList.length < movies.length ||
      moviesList.length < JSON.parse(localStorage.getItem("movies"))?.length);

  return (
    <>
      <Header type="application" hasNavigation={true} isLoggedIn={isLoggedIn} />
      <ContentBlock type="movies">
        <div className="movies">
          <Search
            onFormSubmit={onFormSubmit}
            setResultStatus={setMoviesListStatus}
          />
          {shouldShowPreloader ? (
            <Preloader />
          ) : (
            <>
              <MoviesList
                type={"movies"}
                movies={moviesList}
                moviesListStatus={moviesListStatus}
                shouldShowPreloader={shouldShowPreloader}
                handleSaveMovie={handleSaveMovie}
                handleDeleteMovie={handleDeleteMovie}
              />
              {shouldShowButton() && (
                <Button
                  className="movies__button"
                  text="Ещё"
                  onClick={() => handleButtonClick(currentEndIndex)}
                />
              )}
            </>
          )}
        </div>
      </ContentBlock>
      <Footer />
    </>
  );
}
