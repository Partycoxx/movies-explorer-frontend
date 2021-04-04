import React from "react";
import image from "../../images/student_image.png";
import "./AboutMe.css";

export default function AboutMe() {
  return (
    <div className="about-me">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__bio-container">
        <div className="about-me__bio">
          <h3 className="about-me__heading">Никита</h3>
          <span className="about-me__subheading">
            Фронтенд-разработчик, 28 лет
          </span>
          <p className="about-me__text">
            Я живу в Петербурге, закончил исторический факультет ВолГУ. Я
            воспитываю кота, люблю Gorillaz и джин-тоник. В мае 2019 года начал
            кодить, а до этого почти 6 лет проработал в vc.ru.{" "}
          </p>
          <ul className="about-me__links">
            <li className="about-me__link-item">
              <a
                href="https://www.facebook.com/nikita.evdokimof"
                target="_blank"
                rel="noreferrer"
                className="about-me__link on-hover"
              >
                Facebook
              </a>
            </li>
            <li className="about-me__link-item">
              <a
                href="https://github.com/Partycoxx"
                rel="noreferrer"
                target="_blank"
                className="about-me__link on-hover"
              >
                Github
              </a>
            </li>
          </ul>
        </div>
        <img src={image} alt="Nikita Evdokimov" className="about-me__image" />
      </div>
      <div className="about-me__portfolio-container">
        <h3 className="about-me__portfolio">Портфолио</h3>
        <ul className="about-me__portfolio-links">
          <li className="about-me__portfolio-link-item">
            <a
              href="https://partycoxx.github.io/how-to-learn/"
              target="_blank"
              rel="noreferrer"
              className="about-me__portfolio-link on-hover"
            >
              <span className="about-me__portfolio-link-text">
                Статичный сайт
              </span>
              <span className="about-me__portfolio-link-symbol">↗</span>
            </a>
          </li>
          <li className="about-me__portfolio-link-item">
            <a
              href="https://partycoxx.github.io/russian-travel/"
              target="_blank"
              rel="noreferrer"
              className="about-me__portfolio-link on-hover"
            >
              <span className="about-me__portfolio-link-text">
                Адаптивный сайт
              </span>
              <span className="about-me__portfolio-link-symbol">↗</span>
            </a>
          </li>
          <li className="about-me__portfolio-link-item">
            <a
              href="https://partycoxx.github.io/mesto-react/"
              target="_blank"
              rel="noreferrer"
              className="about-me__portfolio-link on-hover"
            >
              <span className="about-me__portfolio-link-text">
                Одностраничное приложение
              </span>
              <span className="about-me__portfolio-link-symbol">↗</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
