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
  const [storedMovies, setStoredMovies] = useState([]);

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
        })
        .catch((err) => console.log(new Error(err)));
    } else {
      const token = localStorage.getItem("token");
      if (token) {
        mainApiRequest
          .getCurrentUserData()
          .then(() => {
            setIsLoggedIn(() => true);

            history.push("/");
          })
          .catch((err) => console.log(new Error(err)));
      }
    }
  }, [isLoggedIn]);

  //???????????????????? ??????????????????

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

  //???????????????????? ?????????????? ?? ??????????????

  const resetMovies = () => {
    setMovies(() => []);
  };

  const resetStoredMovies = () => {
    setStoredMovies(() => []);
  };

  const submitUserData = (userData) => {
    closeModals();
    mainApiRequest
      .updateCurrentUserData(userData)
      .then((res) => {
        setCurrentUser((currentUser) => ({ ...currentUser, ...res }));
        openNotificationModal({
          type: "success",
          message: "???????????? ?????????????? ??????????????????",
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

  //localStorage.removeItem("movies");

  const onLogOut = () => {
    window.localStorage.removeItem("token");
    setIsLoggedIn(false);
    setCurrentUser(() => ({}));
    resetMovies();
    localStorage.removeItem("movies");
    history.push("/");
    openNotificationModal({
      type: "success",
      message: "???? ?????????????? ?????????? ???? ????????????????",
    });
  };

  const onSearchFormSubmit = (data, statusCallback) => {
    setShouldShowPreloader(() => true);
    resetMovies();

    const localStaragedMovies = JSON.parse(localStorage.getItem("movies"));

    if (localStaragedMovies) {
      const filteredMoviesList = filterMoviesList(localStaragedMovies, data);

      if (filteredMoviesList.length === 0) {
        statusCallback(() => "???????????? ???? ??????????????");
      } else {
        setMovies(() => filteredMoviesList);
      }

      setTimeout(() => setShouldShowPreloader(() => false), 3000);
    } else {
      moviesApiRequest
        .getMovies()
        .then((res) => {
          const preparedMoviesList = prepareMoviesList(res, data);

          localStorage.setItem("movies", JSON.stringify(preparedMoviesList));

          const filteredMoviesList = filterMoviesList(preparedMoviesList, data);

          if (filteredMoviesList.length === 0) {
            statusCallback(() => "???????????? ???? ??????????????");
          } else {
            setMovies(() => filteredMoviesList);
          }
        })
        .catch((err) => {
          console.log(new Error(err));
          statusCallback(
            () =>
              "???? ?????????? ?????????????? ?????????????????? ????????????. ????????????????, ???????????????? ?? ?????????????????????? ?????? ???????????? ????????????????????. ?????????????????? ?????????????? ?? ???????????????????? ?????? ??????"
          );
        })
        .finally(() => {
          setTimeout(() => setShouldShowPreloader(() => false), 3000);
        });
    }
  };

  const onSearchSavedMoviesSubmit = (data, statusCallback) => {
    setStoredMovies(() => []);
    const searchResult = filterMoviesList(savedMovies, data);

    if (searchResult.length > 0) {
      setStoredMovies(() => searchResult);
    } else {
      statusCallback(() => "???????????? ???? ??????????????");
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
          message: "???? ?????????????? ?????????? ?? ??????????????",
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
    mainApiRequest
      .saveMovie(movieData)
      .then((res) => {
        openNotificationModal({
          type: "success",
          message: `?????????? ??${res.nameRU}?? ?????????????? ???????????????? ?? ??????????????????!`,
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
    mainApiRequest
      .deleteMovie(id)
      .then((res) => {
        const newSavedMovies = savedMovies.filter(
          (item) => item.movieId !== res.movieId
        );
        setSavedMovies(() => newSavedMovies);
        openNotificationModal({
          type: "success",
          message: `?????????? ??${res.nameRU}?? ?????????????? ???????????? ???? ????????????????????!`,
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
                storedMovies={storedMovies}
                cleanUp={resetStoredMovies}
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
