import React, { useState } from "react";
import classNames from "classnames";

interface ICard {
  label?: string;
  images?: string;
  quizMainText?: string;
  quizDescription?: string;
  imgAlt?: string;
  onClick?: () => void;
}

const Card = ({ images, quizMainText, quizDescription, imgAlt }: ICard) => {
  const [activeCard, setActiveCard] = useState(false);

  const primaryCardClasses = "h-[30vh] tablet:h-[45vh] w-[90%] grid grid-rows bg-secondary rounded-[15px]";
  const primaryImgClasses = "ml-4 pt-1 w-[83%]  tablet:w-[90%]";
  const primarySpanClasses = "flex justify-center text-xl tablet:text-4xl  font-semibold";
  const primaryPClasses = "font-semibold text-[8px] tablet:text-sm";

  const CardClasses = classNames({
    [primaryCardClasses]: primaryCardClasses,
    [primaryImgClasses]: primaryCardClasses,
    [primarySpanClasses]: primarySpanClasses,
    [primaryPClasses]: primaryPClasses,
  });

  return (
    <button>
      <div className={CardClasses}>
        <img src={images} className={primaryImgClasses} alt={imgAlt} />
        <span className={primarySpanClasses}>{quizMainText}</span>
        <p className={primaryPClasses}>{quizDescription}</p>
      </div>
    </button>
  );
};

export default Card;
