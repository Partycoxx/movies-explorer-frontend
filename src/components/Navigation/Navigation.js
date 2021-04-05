import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import AccountIcon from "../Icons/AccountIcon";
import Hamburger from "../Icons/Hamburger";
import CloseIcon from "../Icons/CloseIcon";
import "./Navigation.css";
import classNames from "classnames";

//TODO Добавить подсветку кнопок в зависимости от выбранного раздела
//TODO Проверить переходы на существующую вкладку

export default function Navigation({ type, isMobile }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isTabChecked, setIsTabChecked] = useState([
    {
      location: "/",
      isChecked: false,
    },
    {
      location: "/movies",
      isChecked: false,
    },
    {
      location: "/saved-movies",
      isChecked: false,
    },
    {
      location: "/profile",
      isChecked: false,
    },
  ]);

  const path = useLocation().pathname;

  useEffect(() => {
    setIsTabChecked((isTabChecked) =>
      isTabChecked.map((item) =>
        item.location === path ? { ...item, isChecked: true } : item
      )
    );
  }, [path]);

  const toggleMenu = () => (isMobile ? setIsOpen(() => !isOpen) : null);

  const authButtons = (
    <>
      <Link
        to="/signup"
        className="navigation__link navigation__link_promo on-hover"
      >
        Регистрация
      </Link>
      <Link
        to="/signin"
        className="navigation__link navigation__link_promo navigation__link_primary on-hover"
      >
        Войти
      </Link>
    </>
  );

  const appButtons = (
    <>
      {isMobile && (
        <Link
          to="/"
          className={classNames(
            "navigation__link",
            "navigation__link_application",
            "on-hover",
            { navigation__link_mobile: isMobile },
            { navigation__link_checked: isTabChecked[0].isChecked }
          )}
          onClick={toggleMenu}
        >
          Главная
        </Link>
      )}
      <Link
        to="/movies"
        className={classNames(
          "navigation__link",
          "navigation__link_application",
          "on-hover",
          { navigation__link_mobile: isMobile },
          { navigation__link_checked: isTabChecked[1].isChecked }
        )}
        onClick={toggleMenu}
      >
        Фильмы
      </Link>
      <Link
        to="/saved-movies"
        className={classNames(
          "navigation__link",
          "navigation__link_application",
          "on-hover",
          { navigation__link_mobile: isMobile },
          { navigation__link_checked: isTabChecked[2].isChecked }
        )}
        onClick={toggleMenu}
      >
        Сохранённые фильмы
      </Link>
      <Link
        to="/profile"
        className={classNames(
          "navigation__link",
          "navigation__link_application",
          "on-hover",
          { "navigation__link_mobile-fixed": isMobile },
          { navigation__link_checked: isTabChecked[3].isChecked }
        )}
        onClick={toggleMenu}
      >
        Аккаунт
        <AccountIcon className="navigation__icon" />
      </Link>
    </>
  );

  const pickContent = () => {
    if (isMobile && type === "application") {
      return (
        <>
          <Hamburger onClick={toggleMenu} className="navigation__hamburger" />
          <div
            className={classNames("navigation__overlay", {
              navigation__overlay_open: isOpen,
            })}
          >
            <div
              className={classNames("navigation__card", {
                navigation__card_open: isOpen,
              })}
            >
              {appButtons}
              <CloseIcon
                className="navigation__close-icon"
                onClick={toggleMenu}
              />
            </div>
          </div>
        </>
      );
    } else if (type === "promo") {
      return authButtons;
    } else if (type === "application") {
      return appButtons;
    }
  };

  return (
    <div className={classNames("navigation", `navigation_${type}`)}>
      {pickContent()}
    </div>
  );
}
