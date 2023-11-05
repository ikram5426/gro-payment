import React, { useState } from "react";

interface ModalComponentProps {
  closeModal: () => void;
}

const ModalComponent: React.FC<ModalComponentProps> = ({ closeModal }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleCloseModal = () => {
    setIsOpen(false);
    setTimeout(closeModal, 500); // Close modal after the ease-out animation (500ms)
  };

  return (
    <div
      className={`modal fixed inset-0 z-20 flex items-center justify-center transition-all ease-in-sine ease-out-sine ${isOpen ? 'modal-is-open' : ''}`}
    >
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
      <div className="bg-white p-4 rounded-[40px] shadow-md z-10 text-center mx-[10px]">
        <span style={{ fontWeight: 600 }}>Delayed charges</span>
        <p className="my-[10px] cursor-pointer">
          Because you can get free days of premium by inviting friends, you may get billed later
        </p>
        <p className="text-[#11AAFF] cursor-pointer" onClick={handleCloseModal}>
          Ok
        </p>
      </div>
    </div>
  );
};

export default ModalComponent;
