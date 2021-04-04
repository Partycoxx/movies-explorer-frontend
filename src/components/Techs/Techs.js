import React from "react";
import "./Techs.css";

export default function Techs() {
  return (
    <div className="techs">
      <h2 className="techs__title">Технологии</h2>
      <div className="techs__content-container">
        <h3 className="techs__heading">7 технологий</h3>
        <p className="techs__paragraph">
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
        <ul className="techs__technologies-container">
          <li className="techs__technology-item">HTML</li>
          <li className="techs__technology-item">CSS</li>
          <li className="techs__technology-item">JS</li>
          <li className="techs__technology-item">React</li>
          <li className="techs__technology-item">Git</li>
          <li className="techs__technology-item">Express.js</li>
          <li className="techs__technology-item">mongoDB</li>
        </ul>
      </div>
    </div>
  );
}
