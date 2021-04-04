import React, { useEffect, useState } from "react";
import HeaderLogo from "../Icons/HeaderLogo";
import Navigation from "../Navigation/Navigation";
import "./Header.css";
import classNames from "classnames";
import { Link } from "react-router-dom";

export default function Header({ type = "default", hasNavigation }) {
  const [isMobile, setIsMobile] = useState(false);

  const hasType = type !== "default" ? true : false;

  const resize = () => setIsMobile(() => window.innerWidth <= 768);

  useEffect(() => {
    window.addEventListener("resize", resize);
    resize();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <header className={classNames("header", { [`header_${type}`]: hasType })}>
      <Link
        to="/"
        className={classNames("header__logo on-hover", {
          [`header__logo_${type}`]: hasType,
        })}
      >
        <HeaderLogo />
      </Link>
      {hasNavigation && <Navigation type={type} isMobile={isMobile} />}
    </header>
  );
}
