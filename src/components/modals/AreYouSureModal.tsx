import React from "react";

interface Props {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const AreYouSureModal = ({ message, onConfirm, onCancel }: Props) => {
  return (
    <div className="absolute top-[90%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-secondary h-[8em] w-[10em] flex flex-col rounded-2xl justify-center items-center">
      <p className="font-semibold text-center text-main">{message}</p>
      <div className="flex flex-row justify-around w-full mt-4">
        <button className="bg-white text-main border border-main rounded-xl px-6 py-2 font-medium" onClick={onConfirm}>
          Yes
        </button>
        <button className="bg-white text-main border border-main rounded-xl px-6 py-2 font-medium" onClick={onCancel}>
          No
        </button>
      </div>
    </div>
  );
};

export default AreYouSureModal;
