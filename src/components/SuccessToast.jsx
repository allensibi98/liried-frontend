import React, { useEffect } from "react";

const SuccessToast = ({ message, onClose, duration = 3000 }) => {
  useEffect(() => {
    if (message && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [message, onClose, duration]);

  if (!message) return null;

  return (
    <div className="success-toast">
      <span className="success-icon">✓</span>
      <span className="success-message">{message}</span>
    </div>
  );
};

export default React.memo(SuccessToast);
