import React, { useState } from 'react';

const PopupMessage = ({ message, onClose }) => {
  return (
    <div className='popup-overlay' >
      <div className='popup-container' >
        <h3>{message}</h3>
        <button onClick={onClose} className='popup-close-button' >Close</button>
      </div>
    </div>
  );
};


export default PopupMessage;
