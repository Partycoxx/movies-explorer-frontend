import React, { useEffect, useState } from "react";
import Input from "../Input/Input";
import { user } from "../../utils/mockUserData";

import "./EditProfileModal.css";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";

export default function EditDataModal({ isOpen, onClose, handleSubmit }) {
  const [userData, setUserData] = useState({ name: "", email: "" });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    setUserData((userData) => ({ ...userData, ...user }));
  }, []);

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
              minLength="2"
              maxLength="30"
              required={true}
              id="email"
              label="E-mail"
            />
          </div>
          <Button
            onClick={handleClick}
            text="Сохранить"
            className="edit-data-modal__button"
            type="primary"
          />
        </form>
      </div>
    </Modal>
  );
}
