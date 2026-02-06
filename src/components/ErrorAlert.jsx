import React from "react";

const ErrorAlert = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="error-alert">
      <span className="error-icon">⚠️</span>
      <span className="error-message">{message}</span>
      {onClose && (
        <button className="error-close" onClick={onClose} aria-label="Close error">
          ×
        </button>
      )}
    </div>
  );
};

export default React.memo(ErrorAlert);
