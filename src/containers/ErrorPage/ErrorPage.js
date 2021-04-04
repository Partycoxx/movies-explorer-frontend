import React from "react";
import { useHistory } from "react-router-dom";
import Button from "../../components/Button/Button";
import "./ErrorPage.css";

export default function ErrorPage() {
  const history = useHistory();

  const goBack = () => history.goBack();

  return (
    <section className="error-page">
      <h1 className="error-page__title">404</h1>
      <span className="error-page__subtitle">Страница не найдена</span>
      <Button
        onClick={goBack}
        className="error-page__button"
        text="Назад"
        type="transparent"
      />
    </section>
  );
}
