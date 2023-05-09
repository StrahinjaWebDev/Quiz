import React from "react";

interface Props {
  handleEditPassword: () => void;
  handleAreYouSureUser: () => void;
}

const AreYouSureEditUser = ({ handleEditPassword, handleAreYouSureUser }: Props) => {
  return (
    <div className="absolute bg-third h-[6em] w-[10em] flex flex-col rounded-2xl right-7 justify-around">
      <p className="font-semibold">Are you sure you want to change it?</p>
      <div className="flex flex-row justify-around">
        <button className="border-2 border-main rounded-xl" onClick={handleEditPassword}>
          Yes
        </button>
        <button className="border-2 border-main rounded-xl" onClick={handleAreYouSureUser}>
          No
        </button>
      </div>
    </div>
  );
};

export default AreYouSureEditUser;
