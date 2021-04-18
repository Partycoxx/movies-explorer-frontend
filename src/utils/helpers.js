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

const baseUrl = "https://api.nomoreparties.co";

const shouldUseBaseUrl = (field) => {
  if (typeof field !== "string") {
    return true;
  } else {
    return false;
  }
};

export const prepareMoviesList = (items) =>
  items.map((item) => {
    return {
      country: item.country,
      director: item.director,
      duration: item.duration,
      year: item.year,
      description: item.description,
      image: shouldUseBaseUrl(item.image)
        ? `${baseUrl}${item.image?.url}`
        : item.image,
      thumbnail: shouldUseBaseUrl(item.thumbnail)
        ? `${baseUrl}${item.image?.formats?.thumbnail?.url}`
        : item.thumbnail,
      trailer: item.trailerLink,
      movieId: item.id,
      nameEN: item.nameEN,
      nameRU: item.nameRU,
    };
  });

const checkEmailValidity = (email) => /^\S+@\S+\.\S+$/.test(email);

export const handleValidation = (event) => {
  const validationResult = {
    valid: false,
    message: "",
  };

  const { minLength, maxLength, required, value, type } = event.target;

  if (minLength > 0 && value.length < minLength) {
    validationResult.message = `Текст слишком короткий. Минимальная длина: ${minLength}`;
  } else if (maxLength > 0 && value.length > maxLength) {
    validationResult.message = `Текст слишком длинный. Максимальная длина: ${maxLength}`;
  } else if (required && value.length === 0) {
    validationResult.message = "Это обязательное поле";
  } else if (type === "email") {
    if (checkEmailValidity(value)) {
      validationResult.valid = true;
      return validationResult;
    } else {
      validationResult.message = "Адрес электронной почты некорректен";
    }
  } else {
    validationResult.valid = true;
  }

  return validationResult;
};
