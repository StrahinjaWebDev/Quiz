import React from "react";
import classNames from "classnames";

interface IButtonProps {
  label?: string;
  primary?: boolean;
  secondary?: boolean;
  onClick?: () => void;
}

const Button = ({ label, primary, secondary, onClick }: IButtonProps) => {
  const primaryButtonClasses =
    "bg-main hover:opacity-90 tablet:text-xl text-sm text-white py-1 px-2 desktop:w-[6em] font-semibold rounded-[60px]";
  const secondaryButtonClasses =
    "bg-secondary text-white hover:opacity-90 text-sm tablet:text-xl py-2 px-2 desktop:w-[7em]  rounded-[60px]";

  const buttonClasses = classNames({
    [primaryButtonClasses]: primary,
    [secondaryButtonClasses]: secondary,
  });

  return (
    <button onClick={onClick} className={buttonClasses}>
      {label}
    </button>
  );
};

export default Button;
