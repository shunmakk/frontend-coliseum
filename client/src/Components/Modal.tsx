import React from "react";

interface ModalProps {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
  explanation: boolean;
}

const Modal: React.FC<ModalProps> = ({ show, children }) => {
  if (!show) return null;

  return (
    <div className="modal">
      <div className="modal-content">{children}</div>
    </div>
  );
};

export default Modal;
