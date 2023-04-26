import React from "react";
import classNames from "classnames";
import IButtonProps from "../interfaces/interfaces";

const Button = ({ label, primary, secondary }: IButtonProps) => {
  const primaryButtonClasses =
    "bg-main hover:opacity-90 tablet:text-xl text-sm text-white py-1 px-2 desktop:w-[6em] font-semibold rounded-[60px]";
  const secondaryButtonClasses =
    "bg-secondary text-white hover:opacity-90 text-sm tablet:text-xl py-2 px-2 desktop:w-[7em]  rounded-[60px]";

  const buttonClasses = classNames({
    [primaryButtonClasses]: primary,
    [secondaryButtonClasses]: secondary,
  });

  return <button className={buttonClasses}>{label}</button>;
};

export default Button;
