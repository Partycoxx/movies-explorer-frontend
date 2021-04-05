import React from "react";
import FailIcon from "../Icons/FailIcon";
import SuccessIcon from "../Icons/SuccessIcon";
import Modal from "../Modal/Modal";

import "./NotificationModal.css";

export default function NotificationModal({ type, message, isOpen, onClose }) {
  const logo =
    type === "fail" ? (
      <FailIcon className="notification-modal__icon" />
    ) : (
      <SuccessIcon className="notification-modal__icon" />
    );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="notification-modal__container">
        {logo}
        <span className="notification-modal__message">{message}</span>
      </div>
    </Modal>
  );
}
