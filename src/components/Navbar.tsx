import React, { useState } from "react";
import SignOutBtn from "../components/SignOutBtn";
import { HiOutlineMail } from "react-icons/hi";
import INavbar from "../interfaces/interfaces";

const Navbar = ({ showMailIcon }: INavbar) => {
  const [seeInvitations, setSeeInvitations] = useState(false);

  const handleIvnitations = () => {
    setSeeInvitations(!seeInvitations);
  };

  return (
    <>
      <div className="flex justify-center items-center mt-8 tablet:mt-0">
        <nav className="w-[90vw] h-[10vw] flex items-center justify-between ">
          <h1 className="text-6xl text-secondary font-semibold">
            Quizzy{" "}
            {showMailIcon && (
              <button>
                <HiOutlineMail onClick={handleIvnitations} className="text-secondary " size={"0.5em"} />
              </button>
            )}
          </h1>
          <SignOutBtn label="Sign Out" primary />
        </nav>
      </div>
      {seeInvitations === true && (
        <div className="h-[60vh] w-screen absolute mt-8 flex justify-center">
          <div className="bg-secondary w-[90%] h-[100%] flex justify-center">
            <div className="flex flex-col mt-6 text-main font-bold w-[100%]">
              <h1 className="text-3xl flex justify-center desktop:text-5xl">Invitations</h1>
              <div className="flex flex-row mt-12 w-[100%] justify-center">
                <p className="w-[80%] text-xl">User invited you to play Football player quiz</p>
                <div className="flex gap-3">
                  <button className="text-5xl">✓</button>
                  <button className="text-5xl">X</button>
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
