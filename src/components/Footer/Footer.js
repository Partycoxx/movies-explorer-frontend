import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <span className="footer__text footer__text_grey">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </span>
      <div className="footer__container">
        <span className="footer__text">© 2020</span>
        <div className="footer__link-container">
          <a
            className="footer__text footer__text_link on-hover"
            href="https://praktikum.yandex.ru/"
            target="_blank"
            rel="noreferrer"
          >
            Яндекс.Практикум
          </a>

          <a
            className="footer__text footer__text_link on-hover"
            href="https://github.com/Partycoxx"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>

          <a
            className="footer__text footer__text_link on-hover"
            href="https://www.facebook.com/nikita.evdokimof"
            target="_blank"
            rel="noreferrer"
          >
            Facebook
          </a>
        </div>
      </div>
    </footer>
  );
}
