import React from "react";
import "./AboutProject.css";

export default function AboutProject({ refLink }) {
  return (
    <div className="about-project" ref={refLink}>
      <h2 className="about-project__title">О проекте</h2>
      <div className="about-project__text-container">
        <div className="about-project__text-item">
          <h3 className="about-project__heading">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="about-project__paragraph">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className="about-project__text-item">
          <h3 className="about-project__heading">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="about-project__paragraph">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="about-project__bar-container">
        <div className="about-project__bar-item about-project__bar-item_narrow">
          <div className="about-project__bar about-project__bar_blue">
            1 неделя
          </div>
          <span className="about-project__bar-caption">Back-end</span>
        </div>
        <div className="about-project__bar-item">
          <div className="about-project__bar about-project__bar_grey">
            4 недели
          </div>
          <span className="about-project__bar-caption">Front-end</span>
        </div>
      </div>
    </div>
  );
}
