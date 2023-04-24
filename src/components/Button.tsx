import React from 'react'
import classNames from 'classnames';
import IButtonProps from '../interfaces/interfaces'

const Button: React.FC<IButtonProps> = ({label, primary}) => {

const primaryButtonClasses = 'bg-main hover:opacity-90 text-xl text-white font-semibold py-3 px-4 rounded-[60px]';

const buttonClasses = classNames({
    [primaryButtonClasses]: primary
  });

  return (
    <button className={buttonClasses}>
      {label}
    </button>
  )
}

export default Button