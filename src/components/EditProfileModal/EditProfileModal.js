import React, { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Input from "../Input/Input";

import "./EditProfileModal.css";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";

export default function EditDataModal({ isOpen, onClose, handleSubmit }) {
  const [userData, setUserData] = useState({ name: "", email: "" });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
  });

  const user = useContext(CurrentUserContext);

  useEffect(() => {
    setUserData((userData) => ({ ...userData, ...user }));
  }, [user]);

  const handleInputChange = (e) => {
    const {
      target: { id, value, validationMessage },
    } = e;

    setUserData(() => ({ ...userData, [id]: value }));

    if (!e.target.validity.valid) {
      setErrors(() => ({ ...errors, [id]: validationMessage }));
    } else {
      setErrors(() => ({ ...errors, [id]: "" }));
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    handleSubmit(userData);
  };

  const hasErrors = () => Object.values(errors).some((item) => item.length > 0);
  const hasData = () =>
    Object.values(userData).every((item) => item.length > 0);

  const isFormValid = () => !hasErrors() && hasData();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="edit-data-modal">
        <form className="edit-data-modal__form">
          <div className="edit-data-modal__input-container">
            <Input
              value={userData.name}
              handleChange={handleInputChange}
              errors={errors}
              minLength="2"
              maxLength="30"
              required={true}
              id="name"
              label="Имя"
            />
            <Input
              value={userData.email}
              handleChange={handleInputChange}
              errors={errors}
              required={true}
              id="email"
              label="E-mail"
              type="email"
            />
          </div>
          <Button
            onClick={handleClick}
            text="Сохранить"
            className="edit-data-modal__button"
            type="primary"
            disabled={!isFormValid()}
          />
        </form>
      </div>
    </Modal>
  );
}
