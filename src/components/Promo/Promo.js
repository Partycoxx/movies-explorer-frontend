import React from "react";
import Button from "../Button/Button";
import Logo from "../Icons/Logo";
import "./Promo.css";

//TODO Клик по кнопке

export default function Promo({ refLink }) {
  const handleRefClick = () => refLink.current.scrollIntoView();

  return (
    <div className="promo">
      <div className="promo__text-container">
        <h1 className="promo__heading">
          Учебный проект студента факультета Веб-разработки.
        </h1>
        <p className="promo__subheading">
          Листайте ниже, чтобы узнать больше про этот проект и его создателя.
        </p>
        <Button
          className="promo__button"
          onClick={handleRefClick}
          text={"Узнать больше"}
        />
      </div>
      <Logo className="promo__logo" />
    </div>
  );
}
