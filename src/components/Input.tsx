import React from 'react'
import classNames from 'classnames';
import type IInputProps from '../interfaces/interfaces'

const Input: React.FC<IInputProps> = ({primary, placeholder}) => {

const primaryInputClasses = 'rounded-[60px] w-[20em] h-[2.2em] placeholder:pl-4';

const inputClasses = classNames({
    [primaryInputClasses]: primary,
  });

  return (
    <input className={inputClasses} placeholder={placeholder} >
    </input>

  )
}

export default Input