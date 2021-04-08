import React from "react";
import Header from "../../components/Header/Header";
import ContentBlock from "../../components/ContentBlock/ContentBlock";
import Search from "../../components/Search/Search";
import MoviesList from "../../components/MoviesList/MoviesList";
import Footer from "../../components/Footer/Footer";

export default function SavedMovies() {
  return (
    <>
      <Header type="application" hasNavigation={true} />
      <ContentBlock type="movies">
        <Search />
        <MoviesList type={"saved-movies"} movies={[]} />
      </ContentBlock>
      <Footer />
    </>
  );
}
