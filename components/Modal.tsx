import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center">
      <div
        className="modal-overlay absolute inset-0 bg-gray-500 opacity-75"
        onClick={onClose}
      ></div>
      <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
        <div className="modal-content py-4 text-left px-6">
          <h2 className="text-xl font-semibold mb-4">Antes de ir...</h2>
          <p>
            Apoie o projeto deixando uma estrela no repositório do Manda Jobs.
          </p>
          <button
            className="modal-close px-4 py-2 mt-4 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
            onClick={onClose}
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
