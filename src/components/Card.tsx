import React from "react";
import classNames from "classnames";
import ICard from "../interfaces/interfaces";

const Card = ({ images, quizMainText, quizDescription, imgAlt }: ICard) => {
  const primaryCardClasses = "h-[45vh] w-[90%] grid grid-rows bg-secondary rounded-[15px]";
  const primaryImgClasses = "ml-4 pt-1 tablet:w-[90%]";
  const primarySpanClasses = "flex justify-center text-xl font-semibold";
  const primaryPClasses = "font-semibold text-sm";

  const CardClasses = classNames({
    [primaryCardClasses]: primaryCardClasses,
    [primaryImgClasses]: primaryCardClasses,
    [primarySpanClasses]: primarySpanClasses,
    [primaryPClasses]: primaryPClasses,
  });

  return (
    <div className={CardClasses}>
      <img src={images} className={primaryImgClasses} alt={imgAlt} />
      <span className={primarySpanClasses}>{quizMainText}</span>
      <p className={primaryPClasses}>{quizDescription}</p>
    </div>
  );
};

export default Card;
