import React from "react";
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
}) {
  return (
    <>
      <Header type="application" hasNavigation={true} isLoggedIn={isLoggedIn} />
      <ContentBlock type="movies">
        <div className="saved-movies">
          <Search />
          <MoviesList
            type={"saved-movies"}
            movies={savedMovies}
            handleDeleteMovie={handleDeleteMovie}
          />
        </div>
      </ContentBlock>
      <Footer />
    </>
  );
}
