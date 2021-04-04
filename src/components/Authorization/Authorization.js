import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import Input from "../Input/Input";

import "./Authorization.css";

export default function Authorization({ type }) {
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [inputValues, setInputValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const buttonTexts = {
    login: {
      button: "Войти",
      text: "Ещё не зарегистрированы?",
      linkText: "Регистрация",
      link: "/signup",
    },
    register: {
      button: "Зарегистрироваться",
      text: "Уже зарегистрированы?",
      linkText: "Войти",
      link: "/signin",
    },
  };
  const renderButtons = () => {
    return (
      <>
        <Button
          onClick={() => {}}
          text={buttonTexts[type].button}
          className="authorization__button"
          type="primary"
        />
        <span className="authorization__text">{buttonTexts[type].text}</span>
        <Link
          className="authorization__link on-hover"
          to={buttonTexts[type].link}
        >
          {buttonTexts[type].linkText}
        </Link>
      </>
    );
  };

  const handleInputChange = (e) => {
    const {
      target: { id, value, validationMessage },
    } = e;

    setInputValues(() => ({ ...inputValues, [id]: value }));

    if (!e.target.validity.valid) {
      setErrors(() => ({ ...errors, [id]: validationMessage }));
    } else {
      setErrors(() => ({ ...errors, [id]: "" }));
    }
  };

  return (
    <section className="authorization">
      <div className="authorization__container">
        <h1 className="authorization__heading">
          {type === "login" ? "Добро пожаловать" : "Рады видеть"}
        </h1>
        <form className="authorization__form">
          {type === "register" && (
            <Input
              label="Имя"
              id="name"
              minLength="2"
              maxLength="30"
              required={true}
              handleChange={handleInputChange}
              value={inputValues.name}
              errors={errors}
            />
          )}
          <Input
            label="E-mail"
            id="email"
            type="email"
            minLength="2"
            maxLength="30"
            required={true}
            handleChange={handleInputChange}
            value={inputValues.email}
            errors={errors}
          />
          <Input
            label="Пароль"
            id="password"
            type="password"
            minLength="2"
            maxLength="30"
            required={true}
            handleChange={handleInputChange}
            value={inputValues.password}
            errors={errors}
          />
        </form>
        <div className="authorization__buttons">{renderButtons()}</div>
      </div>
    </section>
  );
}
