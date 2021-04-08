import React, { useEffect, useRef, useState } from "react";
import Header from "../../components/Header/Header";
import ContentBlock from "../../components/ContentBlock/ContentBlock";
import Search from "../../components/Search/Search";
import MoviesList from "../../components/MoviesList/MoviesList";
import Footer from "../../components/Footer/Footer";
import "./SavedMovies.css";

export default function SavedMovies({
  isLoggedIn,
  savedMovies,
  handleDeleteMovie,
  handleSearchSavedMovies,
  storedMovies,
  cleanUp,
}) {
  const [moviesListStatus, setMoviesListStatus] = useState("");
  const [moviesList, setMoviesList] = useState([]);

  useEffect(() => {
    if (storedMovies.length > 0) {
      setMoviesList(() => storedMovies);
    } else {
      setMoviesList(() => savedMovies);
    }
  }, [savedMovies, storedMovies]);

  useEffect(() => {
    return () => {
      cleanUp();
    };
  }, []);

  return (
    <>
      <Header type="application" hasNavigation={true} isLoggedIn={isLoggedIn} />
      <ContentBlock type="movies">
        <div className="saved-movies">
          <Search
            onFormSubmit={handleSearchSavedMovies}
            setResultStatus={setMoviesListStatus}
          />
          <MoviesList
            type={"saved-movies"}
            movies={moviesList}
            handleDeleteMovie={handleDeleteMovie}
            moviesListStatus={moviesListStatus}
          />
        </div>
      </ContentBlock>
      <Footer />
    </>
  );
}
