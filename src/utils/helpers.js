export const filterMoviesList = (moviesList, searchAttributes) => {
  const { movie, hasShortFilms } = searchAttributes;

  if (hasShortFilms) {
    return moviesList.filter(
      (item) =>
        (item.nameRU?.toLowerCase().includes(movie.toLowerCase()) ||
          item.nameEN?.toLowerCase().includes(movie.toLowerCase())) &&
        item.duration <= 40
    );
  } else {
    return moviesList.filter(
      (item) =>
        (item.nameRU?.toLowerCase().includes(movie.toLowerCase()) ||
          item.nameEN?.toLowerCase().includes(movie.toLowerCase())) &&
        item.duration > 40
    );
  }
};

export const prepareMoviesList = (moviesList, searchAttributes) =>
  filterMoviesList(moviesList, searchAttributes).map((item) => {
    return {
      ...item,
      image: `https://api.nomoreparties.co${item.image?.url}`,
    };
  });
