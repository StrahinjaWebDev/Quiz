import React from 'react'
import classNames from 'classnames';
import IButtonProps from '../interfaces/interfaces'

const Button: React.FC<IButtonProps> = ({primary}) => {

const primaryButtonClasses = 'bg-secondary hover:opacity-90 text-xl text-white font-semibold py-3 px-4 rounded-[60px]';

const buttonClasses = classNames({
    [primaryButtonClasses]: primary
  });

  return (
    <button className={buttonClasses}>
      Log Out
    </button>
  )
}

export default Button