import React, { useState } from "react";
import Header from "../../components/Header/Header";
import ContentBlock from "../../components/ContentBlock/ContentBlock";
import Search from "../../components/Search/Search";
import Footer from "../../components/Footer/Footer";
import MoviesList from "../../components/MoviesList/MoviesList";

export default function Movies({ onFormSubmit, movies, shouldShowPreloader }) {
  const [moviesListStatus, setMoviesListStatus] = useState("");
  return (
    <>
      <Header type="application" hasNavigation={true} />
      <ContentBlock type="movies">
        <Search
          onFormSubmit={onFormSubmit}
          setResultStatus={setMoviesListStatus}
        />
        <MoviesList
          type={"movies"}
          movies={movies}
          moviesListStatus={moviesListStatus}
          shouldShowPreloader={shouldShowPreloader}
        />
      </ContentBlock>
      <Footer />
    </>
  );
}
