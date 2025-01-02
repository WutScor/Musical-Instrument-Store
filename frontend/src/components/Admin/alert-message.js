import React, { useState } from 'react';

const AlertMessage = ({ message, color }) => {
  if (!message) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundColor: color,
        color: 'white',
        padding: '10px 20px',
        borderRadius: '8px',
        boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.2)',
        zIndex: 1000,
      }}
    >
      {message}
    </div>
  );
};

export default AlertMessage;
