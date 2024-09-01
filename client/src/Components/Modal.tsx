import React from "react";

interface ModalProps {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
  explanation: boolean;
}

const Modal: React.FC<ModalProps> = ({
  show,
  onClose,
  children,
  explanation,
}) => {
  if (!show) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        {children}
        {explanation ? null : <button onClick={onClose}>解説を閉じる</button>}
      </div>
    </div>
  );
};

export default Modal;
