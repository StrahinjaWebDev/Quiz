import React, { useState, useEffect } from "react";

interface Props {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const AreYouSureModal = ({ message, onConfirm, onCancel: close }: Props) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isClosing) {
      setTimeout(() => {
        setIsClosing(false);
        close();
      }, 200);
    }
  }, [isClosing]);

  return (
    <div className="fixed h-screen w-screen  left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center">
      <div
        className={`absolute transform animation-forwards bg-secondary min-h-[8em] w-[15em] flex flex-col rounded-2xl justify-center items-center 
        ${!isClosing ? "animate-[appearScale_0.2s_ease]" : "animate-[dissAppearScale_0.2s_ease]"}
        `}
      >
        <p className="font-semibold text-center text-main mx-10">{message}</p>
        <div className="flex w-full mt-4 justify-center gap-2">
          <button className="bg-white text-main border border-main rounded-xl px-6 py-2 font-medium" onClick={onConfirm}>
            Yes
          </button>
          <button className="bg-white text-main border border-main rounded-xl px-6 py-2 font-medium" onClick={() => setIsClosing(true)}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default AreYouSureModal;
