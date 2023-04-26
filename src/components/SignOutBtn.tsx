import React from "react";
import classNames from "classnames";
import IButtonProps from "../interfaces/interfaces";

const Button = ({ primary }: IButtonProps) => {
  const primaryButtonClasses =
    "bg-secondary hover:opacity-90 text-xl text-white font-semibold px-2 py-1 tablet:py-3 tablet:px-4 rounded-[60px] mt-5 tablet:mt-0";

  const buttonClasses = classNames({
    [primaryButtonClasses]: primary,
  });

  return <button className={buttonClasses}>Log Out</button>;
};

export default Button;
