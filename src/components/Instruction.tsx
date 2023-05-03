import React, { useState } from "react";

const Instruction = () => {
  const [instructions, setInstructions] = useState(false);

  const handleInstructions = () => {
    setInstructions(!instructions);
  };

  return (
    <div className="flex flex-row h-[2em] w-[10em] items-center gap-6 mt-4">
      <button onClick={handleInstructions}>Instructions</button>
      {instructions === true && (
        <div className="absolute bg-third top-[10em] flex flex-col w-[18em]   gap-10">
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
    </div>
  );
};

export default Instruction;
