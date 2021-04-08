import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import ProtectedRoute from "../../components/ProtectedRoute/ProtectedRoute";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import { mainApiRequest } from "../../utils/MainApi";
import { moviesApiRequest } from "../../utils/MoviesApi";

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
import { filterMoviesList, prepareMoviesList } from "../../utils/helpers";

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
  const [shouldShowPreloader, setShouldShowPreloader] = useState(false);

  const history = useHistory();

  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([mainApiRequest.getCurrentUserData()]) // Добавить получение данные с бэка Яндекса.
        .then(([userData]) => {
          setCurrentUser(() => ({
            name: userData.name,
            email: userData.email,
          }));
        })
        .catch((err) => console.log(new Error(err)));
    } else {
      const token = localStorage.getItem("token");
      if (token) {
        mainApiRequest
          .getCurrentUserData()
          .then(() => {
            setIsLoggedIn(() => true);
            history.push("/movies");
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
    setMovies(() => []);
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

  const onSignIn = ({ email, password }) => {
    mainApiRequest
      .loginUser({ email, password })
      .then((res) => {
        const { token } = res;
        localStorage.setItem("token", token);
        setIsLoggedIn(true);
        openNotificationModal({
          type: "success",
          message: "Вы успешно зарегистрировались",
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
    mainApiRequest
      .registerUser(authData)
      .then((res) => {
        console.log(res);
        setCurrentUser((prev) => ({ ...prev, res }));
        openNotificationModal({
          type: "success",
          message: "Вы успешно зарегистрировались",
        });
        history.push("/signin");
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

  return (
    <Layout>
      <CurrentUserContext.Provider value={currentUser}>
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
            />
          </ProtectedRoute>

          <ProtectedRoute exact path="/saved-movies" isLoggedIn={isLoggedIn}>
            <SavedMovies />
          </ProtectedRoute>

          <ProtectedRoute exact path="/profile" isLoggedIn={isLoggedIn}>
            <Profile
              handleOpenModal={() => openEditProfileModal()}
              handleSignOut={onLogOut}
            />
          </ProtectedRoute>

          <Route exact path="/" component={Main} />

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
      </CurrentUserContext.Provider>
    </Layout>
  );
}

export default App;
