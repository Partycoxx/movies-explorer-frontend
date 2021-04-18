import React, { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Button from "../../components/Button/Button";
import Header from "../../components/Header/Header";

import "./Profile.css";

export default function Profile({
  handleOpenModal,
  handleSignOut,
  isLoggedIn,
}) {
  const user = useContext(CurrentUserContext);
  return (
    <>
      <Header type="application" hasNavigation={true} isLoggedIn={isLoggedIn} />
      <section className="profile">
        <div className="profile__container">
          <h1 className="profile__title">Привет, {user.name}</h1>
          <div className="profile__data-container">
            <div className="profile__data-item">
              <span className="profile__key">Имя</span>
              <span className="profile__value">{user.name}</span>
            </div>
            <div className="profile__data-item">
              <span className="profile__key">E-mail</span>
              <span className="profile__value">{user.email}</span>
            </div>
          </div>
          <div className="profile__button-container">
            <Button
              onClick={handleOpenModal}
              text="Редактировать"
              className="profile__button"
              type="transparent"
            />
            <Button
              onClick={handleSignOut}
              text="Выйти из аккаунта"
              className="profile__button profile__button_danger"
              type="transparent"
            />
          </div>
        </div>
      </section>
    </>
  );
}
