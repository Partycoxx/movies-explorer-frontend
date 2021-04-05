import classNames from "classnames";
import React from "react";
import "./ContentBlock.css";

// TODO Переписать так, чтобы цвета были определены в CSS. Ключ bg-color_type

export default function ContentBlock({
  bgColor = "white",
  type = "promo",
  children,
}) {
  return (
    <section
      className={classNames(
        "content-block",
        { [`content-block_bg-color_${bgColor}`]: bgColor },
        { [`content-block_${type}`]: type }
      )}
    >
      {children}
    </section>
  );
}
