import React, { useState } from "react";
import Input from "../Input";

const AnswersDropdown = () => {
  const [numOfAnswers, setNumOfAnswers] = useState<number>(0);

  const handleCheckBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = Number(e.target.value);
    setNumOfAnswers(num);
  };

  return (
    <ul className="py-2 text-sm text-gray-300 dark:text-gray-200">
      <div className="flex flex-col">
        <div className="flex gap-3 items-center">
          <label>1</label>
          <input type="checkbox" value={1} onChange={handleCheckBoxChange}></input>
        </div>
        <div className="flex gap-3 items-center">
          <label>2</label>
          <input type="checkbox" value={2} onChange={handleCheckBoxChange}></input>
        </div>
        <div className="flex gap-3 items-center">
          <label>3</label>
          <input type="checkbox" value={3} onChange={handleCheckBoxChange}></input>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex gap-3 items-center">
          <label>4</label>
          <input type="checkbox" value={4} onChange={handleCheckBoxChange}></input>
        </div>
        <div className="flex gap-3 items-center">
          <label>5</label>
          <input type="checkbox" value={5} onChange={handleCheckBoxChange}></input>
        </div>
        <div className="flex gap-3 items-center">
          <label>6</label>
          <input type="checkbox" value={6} onChange={handleCheckBoxChange}></input>
        </div>
        {numOfAnswers > 0 && (
          <div className="mt-4">
            <div className="flex flex-col gap-2">
              <label className="text-gray-500 dark:text-gray-300 font-semibold">Your Question:</label>
              <Input primary placeholder=" Input your question text here..." />
            </div>
            {[...Array(numOfAnswers)].map((_, id) => (
              <div key={id} className="flex flex-col gap-2 mt-5">
                <label className="text-gray-500 dark:text-gray-300">Answer {id + 1}</label>
                <div className="flex gap-3">
                  <Input primary placeholder=" Input your question here..." />
                  <input type="checkbox"></input>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ul>
  );
};

export default AnswersDropdown;
