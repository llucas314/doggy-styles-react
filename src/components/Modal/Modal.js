import React from "react";

export default function Modal(props) {
  return (
    <div>
      {props.modal ? (
        <div className="delete-modal">
          <div className="modal-wrap">
            <h3>Are You Sure?</h3>
            <div className="modal-button">
              <button onClick={props.handleDelete}>Yes</button>
              <button onClick={props.toggleModal}>NO</button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
