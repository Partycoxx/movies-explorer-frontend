import React, { useState } from "react";
import { Link } from "react-router-dom";
import { handleValidation } from "../../utils/helpers";
import Button from "../Button/Button";
import Input from "../Input/Input";

import "./Authorization.css";

export default function Authorization({ type, handleSignIn, handleSignUp }) {
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
      onClick: (data) => handleSignIn(data),
    },
    register: {
      button: "Зарегистрироваться",
      text: "Уже зарегистрированы?",
      linkText: "Войти",
      link: "/signin",
      onClick: (data) => handleSignUp(data),
    },
  };

  const renderButtons = () => {
    return (
      <>
        <Button
          onClick={() => buttonTexts[type].onClick(inputValues)}
          text={buttonTexts[type].button}
          className="authorization__button"
          type="primary"
          disabled={!isFormValid()}
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
      target: { id, value },
    } = e;

    setInputValues(() => ({ ...inputValues, [id]: value }));

    const validationResult = handleValidation(e);

    if (!validationResult.valid) {
      setErrors(() => ({ ...errors, [id]: validationResult.message }));
    } else {
      setErrors(() => ({ ...errors, [id]: "" }));
    }
  };

  const hasErrors = () => Object.values(errors).some((item) => item.length > 0);
  const hasData = () => {
    if (type === "login") {
      return Object.entries(inputValues)
        .filter((item) => item[0] !== "name")
        .every((item) => item[1].length > 0);
    } else {
      return Object.values(inputValues).every((item) => item.length > 0);
    }
  };

  const isFormValid = () => !hasErrors() && hasData();

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
            required={true}
            handleChange={handleInputChange}
            value={inputValues.email}
            errors={errors}
          />
          <Input
            label="Пароль"
            id="password"
            type="password"
            minLength="8"
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
