import React, { useState } from "react";
import Button from "./Button";
import IAdminMainComponent from "../interfaces/interfaces";

const AdminMainComponent = ({ text, ActivateDeactivateBtn }: IAdminMainComponent) => {
  const [labelText, setLabelText] = useState("Active");

  const handleActivateClick = () => {
    setLabelText("Deactivate");
    //!TODO: make this button change label text onclikck
  };

  const centerDiv = "rounded-[60px] w-[20em] h-[2.2em] placeholder:pl-4";

  //   const inputClasses = classNames({
  //     [primaryInputClasses]: primary,
  //   });

  return (
    <div className="w-[80vw] h-[100%] flex-col flex bg-secondary rounded-[60px] items-center">
      <div className="flex flex-row w-[80%] h-[10%] items-center justify-between mt-5">
        <p className="text-sm text-main med:text-xl">{text}</p>
        <Button label="Edit" primary />
        <Button label="Delete" primary />
        {ActivateDeactivateBtn && <Button label={labelText} onClick={handleActivateClick} primary></Button>}
      </div>
    </div>
  );
};

export default AdminMainComponent;
