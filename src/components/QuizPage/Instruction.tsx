import React, { useState } from "react";
import { BsLightbulb } from "react-icons/bs";
import { FaStarHalfAlt } from "react-icons/fa";

const Instruction = () => {
  const [instructions, setInstructions] = useState(false);

  const handleInstructions = () => {
    setInstructions(!instructions);
  };

  return (
    <div className="flex flex-row h-[2em] w-[10em] items-center gap-6 mt-4 justify-center">
      <button onClick={handleInstructions}>Instructions</button>
      {instructions === true && (
        <div className="absolute bg-third top-1/3 left-1/2 transfor -translate-y-1/2 -translate-x-1/3 rounded-lg flex flex-col w-[20em]  justify-around items-center gap-4">
          <div className="flex gap-4  justify-around">
            <span className="text-base font-medium ml-3">In this quiz you have two types of help:</span>
            <button className="text-xl w-[2em] h-[2em] mr-3  text-red-500 font-semibold" onClick={handleInstructions}>
              X
            </button>
          </div>
          <div className="flex items-center gap-3">
            <FaStarHalfAlt size={"1.4em"} />
            <span>Half/Half - hides two incorrect answers</span>
          </div>
          <div className="flex items-center gap-3">
            <BsLightbulb size={"1.4em"} />
            <p>Hint - gives you a hint to right answers</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Instruction;
