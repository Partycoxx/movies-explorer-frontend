import classNames from "classnames";
import React from "react";
import CloseIcon from "../Icons/CloseIcon";

import "./Modal.css";

export default function Modal({ isOpen, onClose, children }) {
  return (
    <div className={classNames("modal", { modal_opened: isOpen })}>
      <div className="modal__container">
        {onClose && <CloseIcon className="modal__icon" onClick={onClose} />}
        {children}
      </div>
    </div>
  );
}
