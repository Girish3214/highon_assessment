import React from "react";
import ReactDom from "react-dom";

import "./modal.css";

function Modal({ open, onClose }) {
  if (!open) return null;
  return ReactDom.createPortal(
    <>
      <div className="modal-overlay-container" />
      <div className="modal">
        <div className="modal-content">
          <div className="modal-details-container">
            <p>Do you want to LOGOUT</p>
            <div className="modal-buttons-container">
              <button onClick={() => onClose(false)}>Yes</button>
              <button onClick={() => onClose(false)}>No</button>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("modal")
  );
}

export default Modal;
