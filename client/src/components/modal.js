import React, { Component } from 'react';

const Modal = (props) => {
  return (
    <div id="modal" className="modal">
      <div className="modal-content">
        <p>{props.text}</p>
        <button onClick={props.cancel}>No</button>
        <button onClick={props.callback}>Yes</button>
      </div>
    </div> 
  );
}
export default Modal;
