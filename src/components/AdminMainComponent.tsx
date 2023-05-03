import React, { useState } from "react";
import Button from "./Button";

interface IAdminMainComponent {
  text?: string;
  ActivateDeactivateBtn?: boolean;
  onClick?: () => void;
}

const AdminMainComponent = ({ text, ActivateDeactivateBtn }: IAdminMainComponent) => {
  const [labelText, setLabelText] = useState("Active");
  const [active, setActive] = useState(false);

  const handleActivateClick = () => {
    setActive(!active);
    if (active === false) {
      setLabelText("Deactive");
    } else {
      setLabelText("Active");
    }
  };

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
