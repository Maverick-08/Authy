import React from 'react';
import check from '../assets/icons/check.png';
import unchecked from '../assets/icons/incorrect.png';

export default function AlertBox({ success, msg, onClose }) {
  return (
    <div
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 h-16 flex items-center px-4 bg-white shadow-lg rounded-lg cursor-pointer ${
        success ? 'border-green-500' : 'border-red-500'
      } border-2`}
      onClick={onClose}
    >
      {success ? (
        <img src={check} className="h-8 w-8 rounded-full mr-4" alt="Success" />
      ) : (
        <img src={unchecked} className="h-8 w-8 rounded-full mr-4" alt="Error" />
      )}
      <p>{msg}</p>
    </div>
  );
}
