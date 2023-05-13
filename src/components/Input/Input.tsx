import React from "react";
import classNames from "classnames";

interface IInputProps {
  primary?: boolean;
  placeholder?: string;
  value?: string;
  // eslint-disable-next-line no-unused-vars
  onChange?: (e: any) => void;
}

const Input = ({ primary, placeholder, onChange }: IInputProps) => {
  const primaryInputClasses = "rounded-[60px] w-[20em] h-[2.2em] placeholder:pl-4 pl-2";

  const inputClasses = classNames({
    [primaryInputClasses]: primary,
  });

  return <input className={inputClasses} onChange={onChange} placeholder={placeholder}></input>;
};

export default Input;