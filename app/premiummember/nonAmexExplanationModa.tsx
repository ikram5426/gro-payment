import Image from "next/image";
import React, { useState } from "react";

interface ModalComponentProps {
  closeModal: () => void;
}

const NonAmexModalComponent: React.FC<ModalComponentProps> = ({ closeModal }) => {
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
        <span style={{ fontWeight: 600 }}>Security code (CVV)</span>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Image
                  src="/nonAmex.png"
                  priority
                  className="image-explanation"
                  fill={true}
                  alt="logo"
                />
                </div>
        <p className="my-[10px] cursor-pointer">
        The three-digit number is displayed on the back of the card, to the right of the signature
        </p>
        <p className="text-[#11AAFF] cursor-pointer" onClick={handleCloseModal}>
          Ok
        </p>
      </div>
    </div>
  );
};

export default NonAmexModalComponent;
