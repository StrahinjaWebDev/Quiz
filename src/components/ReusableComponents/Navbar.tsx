import React, { useContext, useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { appContext } from "../../context/AppProvider";
import Button from "./Button";

interface INavbar {
  showMailIcon?: boolean;
}

const Navbar = ({ showMailIcon }: INavbar) => {
  const [seeInvitations, setSeeInvitations] = useState(false);

  const { handleLogout, guest, setGuest } = useContext(appContext);

  const handleIvnitations = () => {
    setSeeInvitations(!seeInvitations);
  };

  return (
    <>
      <div className="flex justify-center items-center mt-8 tablet:mt-0">
        <nav className="w-[90vw] h-[10vw] flex items-center justify-between ">
          <h1 className="text-6xl text-secondary font-semibold">
            Quizzy
            {showMailIcon && (
              <button>
                <HiOutlineMail onClick={handleIvnitations} className="text-secondary " size={"0.5em"} />
              </button>
            )}
          </h1>
          {!guest ? (
            <Button secondary label="Logout" onClick={handleLogout} />
          ) : (
            <Button secondary label="Login" onClick={() => setGuest?.(false)}></Button>
          )}
        </nav>
      </div>
      {seeInvitations === true && (
        <div className="h-[60vh] w-screen absolute mt-8 flex justify-center">
          <div className="bg-secondary w-[90%] h-[100%] flex justify-center">
            <div className="flex flex-col mt-6 text-main font-bold w-[100%]">
              <button onClick={handleIvnitations} className="absolute ml-5 text-3xl text-red-500 top-[0.6em] right-[3em]">
                X
              </button>
              <h1 className="text-3xl flex justify-center desktop:text-5xl">Invitations</h1>
              <div className="flex flex-row mt-12 w-[100%] justify-center">
                <p className="w-[80%] text-xl">User invited you to play Football player quiz</p>
                <div className="flex gap-8">
                  <button className="text-3xl text-red-500">✓</button>
                  <button className="text-3xl text-green-600">X</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
