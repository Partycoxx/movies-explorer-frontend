import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import ProtectedRoute from "../../components/ProtectedRoute/ProtectedRoute";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { SavedMoviesContext } from "../../contexts/SavedMoviesContext";

import { mainApiRequest } from "../../utils/MainApi";
import { moviesApiRequest } from "../../utils/MoviesApi";
import { filterMoviesList, prepareMoviesList } from "../../utils/helpers";

import Layout from "../../components/Layout/Layout";
import Main from "../Main/Main";
import Login from "../Login/Login";
import Register from "../Register/Register";
import ErrorPage from "../ErrorPage/ErrorPage";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";

import NotificationModal from "../../components/NotificationModal/NotificationModal";
import EditProfileModal from "../../components/EditProfileModal/EditProfileModal";

import "./App.css";

function App() {
  const [notificationModal, setNotisicationModal] = useState({
    isOpen: false,
    type: "",
    message: "",
  });
  const [editProfileModal, setEditProfileModal] = useState({ isOpen: false });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [shouldShowPreloader, setShouldShowPreloader] = useState(false);

  const history = useHistory();

  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([
        mainApiRequest.getCurrentUserData(),
        mainApiRequest.getSavedMovies(),
      ])
        .then(([userData, savedMovies]) => {
          setCurrentUser(() => ({
            name: userData.name,
            email: userData.email,
          }));
          setSavedMovies(() => savedMovies);
          console.log("savedMovies", savedMovies);
        })
        .catch((err) => console.log(new Error(err)));
    } else {
      const token = localStorage.getItem("token");
      if (token) {
        mainApiRequest
          .getCurrentUserData()
          .then(() => {
            setIsLoggedIn(() => true);

            history.goBack();
          })
          .catch((err) => console.log(new Error(err)));
      }
    }
  }, [isLoggedIn]);

  //Управление модалками

  const closeModals = () => {
    setNotisicationModal((notificationModal) => ({
      ...notificationModal,
      isOpen: false,
    }));
    setEditProfileModal((editProfileModal) => ({
      ...editProfileModal,
      isOpen: false,
    }));
  };

  const openNotificationModal = ({ type, message }) =>
    setNotisicationModal((notificationModal) => ({
      ...notificationModal,
      isOpen: true,
      type,
      message,
    }));

  const openEditProfileModal = () =>
    setEditProfileModal((editProfileModal) => ({
      ...editProfileModal,
      isOpen: true,
    }));

  //Управление работой с данными

  const resetMovies = () => {
    setMovies(() => []);
  };

  const submitUserData = (userData) => {
    closeModals();
    mainApiRequest
      .updateCurrentUserData(userData)
      .then((res) => {
        setCurrentUser((currentUser) => ({ ...currentUser, ...res }));
        openNotificationModal({
          type: "success",
          message: "Данные успешно обновлены",
        });
      })
      .catch((err) => {
        console.log(new Error(err));
        openNotificationModal({
          type: "fail",
          message: err,
        });
      });
  };

  const onLogOut = () => {
    window.localStorage.removeItem("token");
    setIsLoggedIn(false);
    setCurrentUser(() => ({}));
    resetMovies();
    localStorage.removeItem("movies");
    history.push("/");
    openNotificationModal({
      type: "success",
      message: "Вы успешно вышли из аккаунта",
    });
  };

  const onSearchFormSubmit = (data, statusCallback) => {
    console.log("Submitted:", data);
    setShouldShowPreloader(() => true);
    localStorage.removeItem("movies");
    resetMovies();
    moviesApiRequest
      .getMovies()
      .then((res) => {
        console.log(res);
        const preparedMoviesList = prepareMoviesList(res, data);

        if (preparedMoviesList.length === 0) {
          statusCallback(() => "Ничего не найдено");
        } else {
          setMovies(() => preparedMoviesList);
          console.log(preparedMoviesList);
          localStorage.setItem("movies", JSON.stringify(preparedMoviesList));
        }
      })
      .catch((err) => {
        console.log(new Error(err));
        statusCallback(
          () =>
            "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
        );
      })
      .finally(() => {
        setTimeout(() => setShouldShowPreloader(() => false), 3000);
      });
  };

  const onSearchSavedMoviesSubmit = (data, statusCallback) => {
    console.log("Submitted:", data);
    setShouldShowPreloader(() => true);

    const searchResult = filterMoviesList(savedMovies, data);

    if (searchResult.length > 0) {
    }
  };

  const onSignIn = ({ email, password }) => {
    mainApiRequest
      .loginUser({ email, password })
      .then((res) => {
        const { token } = res;
        localStorage.setItem("token", token);
        setIsLoggedIn(true);
        openNotificationModal({
          type: "success",
          message: "Вы успешно вошли в аккаунт",
        });
        setTimeout(() => {
          history.push("/movies");
        }, 2000);
      })
      .catch((err) => {
        console.log(new Error(err));
        openNotificationModal({
          type: "fail",
          message: err,
        });
      });
  };

  const onSignUp = (authData) => {
    const { password } = authData;
    mainApiRequest
      .registerUser(authData)
      .then((res) => {
        setCurrentUser(() => ({ ...res }));
        onSignIn({ ...res, password });
      })
      .catch((err) => {
        setCurrentUser(() => ({}));
        console.log(new Error(err));
        openNotificationModal({
          type: "fail",
          message: err,
        });
      });
  };

  const onSaveMovie = (movieData) => {
    console.log("Posted:", movieData);

    mainApiRequest
      .saveMovie(movieData)
      .then((res) => {
        console.log(res);
        openNotificationModal({
          type: "success",
          message: `Фильм «${res.nameRU}» успешно добавлен в избранное!`,
        });
        setSavedMovies((savedMovies) => [...savedMovies, res]);
      })
      .catch((err) => {
        console.log(new Error(err));
        openNotificationModal({
          type: "fail",
          message: err,
        });
      });
  };

  const onDeleteMovie = (id) => {
    console.log("Posted", id);

    mainApiRequest
      .deleteMovie(id)
      .then((res) => {
        console.log(res);
        const newSavedMovies = savedMovies.filter(
          (item) => item.movieId !== res.movieId
        );
        setSavedMovies(() => newSavedMovies);
        openNotificationModal({
          type: "success",
          message: `Фильм «${res.nameRU}» успешно удалён из избранного!`,
        });
      })
      .catch((err) => {
        console.log(new Error(err));
        openNotificationModal({
          type: "fail",
          message: err,
        });
      });
  };

  return (
    <Layout>
      <CurrentUserContext.Provider value={currentUser}>
        <SavedMoviesContext.Provider value={savedMovies}>
          <Switch>
            <Route exact path="/signin">
              <Login handleSignIn={(data) => onSignIn(data)} />
            </Route>

            <Route exact path="/signup">
              <Register handleSignUp={(data) => onSignUp(data)} />
            </Route>

            <ProtectedRoute exact path="/movies" isLoggedIn={isLoggedIn}>
              <Movies
                onFormSubmit={onSearchFormSubmit}
                movies={movies}
                shouldShowPreloader={shouldShowPreloader}
                isLoggedIn={isLoggedIn}
                handleSaveMovie={onSaveMovie}
                handleDeleteMovie={onDeleteMovie}
                cleanUp={resetMovies}
              />
            </ProtectedRoute>

            <ProtectedRoute exact path="/saved-movies" isLoggedIn={isLoggedIn}>
              <SavedMovies
                isLoggedIn={isLoggedIn}
                savedMovies={savedMovies}
                handleDeleteMovie={onDeleteMovie}
                handleSearchSavedMovies={onSearchSavedMoviesSubmit}
              />
            </ProtectedRoute>

            <ProtectedRoute exact path="/profile" isLoggedIn={isLoggedIn}>
              <Profile
                handleOpenModal={() => openEditProfileModal()}
                handleSignOut={onLogOut}
                isLoggedIn={isLoggedIn}
              />
            </ProtectedRoute>

            <Route exact path="/">
              <Main isLoggedIn={isLoggedIn} />
            </Route>

            <Route path="*" component={ErrorPage} />
          </Switch>
          <NotificationModal
            isOpen={notificationModal.isOpen}
            type={notificationModal.type}
            message={notificationModal.message}
            onClose={closeModals}
          />
          <EditProfileModal
            isOpen={editProfileModal.isOpen}
            onClose={closeModals}
            handleSubmit={(userData) => submitUserData(userData)}
          />
        </SavedMoviesContext.Provider>
      </CurrentUserContext.Provider>
    </Layout>
  );
}

export default App;
