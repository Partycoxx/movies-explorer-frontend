import "./App.css";
import Layout from "../../components/Layout/Layout";
import { Route, Switch, useHistory } from "react-router-dom";
import Main from "../Main/Main";
import Login from "../Login/Login";
import Register from "../Register/Register";
import ErrorPage from "../ErrorPage/ErrorPage";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";

import { user } from "../../utils/mockUserData";
import { useState } from "react";
import NotificationModal from "../../components/NotificationModal/NotificationModal";
import EditProfileModal from "../../components/EditProfileModal/EditProfileModal";

function App() {
  const [notificationModal, setNotisicationModal] = useState({
    isOpen: false,
    type: "",
    message: "",
  });
  const [editProfileModal, setEditProfileModal] = useState({ isOpen: false });

  const history = useHistory();

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

  const submitUserData = (userData) => {
    console.log("Submitted:", userData);
    closeModals();
  };

  const onLogOut = () => {
    history.push("/");
    openNotificationModal({
      type: "success",
      message: "Вы успешно вышли из аккаунта",
    });
  };

  return (
    <Layout>
      <Switch>
        <Route exact path="/signin" component={Login} />
        <Route exact path="/signup" component={Register} />
        <Route exact path="/movies" component={Movies} />
        <Route exact path="/favorites" component={SavedMovies} />
        <Route
          exact
          path="/profile"
          render={(props) => (
            <Profile
              {...props}
              user={user}
              handleOpenModal={() => openEditProfileModal()}
              handleSignOut={onLogOut}
            />
          )}
        />
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
    </Layout>
  );
}

export default App;
