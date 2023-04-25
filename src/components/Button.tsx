import React from "react";
import classNames from "classnames";
import IButtonProps from "../interfaces/interfaces";

const Button: React.FC<IButtonProps> = ({ label, primary, secondary }) => {
  const primaryButtonClasses =
    "bg-main hover:opacity-90 tablet:text-xl text-sm text-white py-1 px-2 desktop:w-[6em] font-semibold tablet:py-3 tablet:px-4 rounded-[60px]";
  const secondaryButtonClasses = "bg-secondary text-white hover:opacity-90 text-sm tablet:text-xl py-2 px-2   rounded-[60px]";

  const buttonClasses = classNames({
    [primaryButtonClasses]: primary,
    [secondaryButtonClasses]: secondary,
  });

  return <button className={buttonClasses}>{label}</button>;
};

export default Button;
