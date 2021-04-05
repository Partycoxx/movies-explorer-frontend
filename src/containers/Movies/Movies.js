import React from "react";
import Header from "../../components/Header/Header";
import ContentBlock from "../../components/ContentBlock/ContentBlock";
import Search from "../../components/Search/Search";
import Footer from "../../components/Footer/Footer";
import MoviesList from "../../components/MoviesList/MoviesList";
import { movies } from "../../utils/mockMoviesData";

export default function Movies({ onFormSubmit }) {
  return (
    <>
      <Header type="application" hasNavigation={true} />
      <ContentBlock type="movies">
        <Search onFormSubmit={onFormSubmit} />
        <MoviesList type={"movies"} movies={movies} />
      </ContentBlock>
      <Footer />
    </>
  );
}
