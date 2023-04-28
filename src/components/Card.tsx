import React, { useState } from "react";
import classNames from "classnames";
import Button from "./Button";

export interface ICard {
  label?: string;
  images?: string;
  quizMainText?: string;
  quizDescription?: string;
  imgAlt?: string;
  activeCard?: boolean;
  onClick?: () => void | undefined;
  selectedCard?: [];
  start?: boolean;
}

const Card = ({ images, quizMainText, quizDescription, imgAlt, start }: ICard) => {
  const [instructions, setInstructions] = useState(false);
  const [startQuiz, setStartQuiz] = useState(false\);
  const primaryCardClasses = "h-[100%] w-[50%]  bg-secondary rounded-[15px] flex flex-row";
  const primaryImgClasses = "ml-4 pt-1 w-[83%]  tablet:w-[90%]";
  const primarySpanClasses = "flex justify-center text-xl tablet:text-4xl  font-semibold";
  const primaryPClasses = "font-semibold text-[8px] tablet:text-sm";

  const CardClasses = classNames({
    [primaryCardClasses]: primaryCardClasses,
    [primaryImgClasses]: primaryCardClasses,
    [primarySpanClasses]: primarySpanClasses,
    [primaryPClasses]: primaryPClasses,
  });

  const handleInstructions = () => {
    setInstructions(!instructions);
  };

  return (
    <div className={primaryCardClasses}>
      <div>
        <img src={images} className={primaryImgClasses} alt={imgAlt} />
        <span className={primarySpanClasses}>{quizMainText}</span>
        <p className={primaryPClasses}>{quizDescription}</p>
      </div>
      {start && (
        <div className="flex flex-col h-[90%] w-[10em] items-center gap-6 mt-4">
          <button onClick={handleInstructions}>Instructions</button>
          <p>Time to finish the quiz:</p>
          {instructions === true && (
            <div className="absolute bg-third mt-8 flex flex-col w-[18em] ml-2 gap-10">
              <div className="flex gap-4  justify-center">
                <span>In this quiz you will have 10:30 minutes to finish it, you have two types of help:</span>
                <button className="text-xl w-[2em] h-[2em] " onClick={handleInstructions}>
                  X
                </button>
              </div>

              <div className="flex">
                <span>Help - hides two incorrect answers</span>
              </div>
              <div className="flex">
                <p>Hint - gives you a hint to right answers</p>
              </div>

              <div className="flex">
                <p>Time - time left until end of the quiz</p>
              </div>
            </div>
          )}
          <span>10:30 minutes</span>
          <Button primary label="START"></Button>
          <Button secondary label="Back to quizzies"></Button>
        </div>
      )}
    </div>
  );
};

export default Card;
