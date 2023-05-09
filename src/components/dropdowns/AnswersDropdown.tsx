import React from "react";

const AnswersDropdown = () => {
  return (
    <ul className="py-2 text-sm text-gray-300 dark:text-gray-200">
      <div className="flex flex-col">
        <div className="flex gap-3 items-center">
          <label htmlFor="radio-input">1</label>
          <input type="checkbox" id="radio-input"></input>
        </div>
        <div className="flex gap-3 items-center">
          <label htmlFor="radio-input">2</label>
          <input type="checkbox" id="radio-input"></input>
        </div>
        <div className="flex gap-3 items-center">
          <label htmlFor="radio-input">3</label>
          <input type="checkbox" id="radio-input"></input>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex gap-3 items-center">
          <label htmlFor="radio-input">4</label>
          <input type="checkbox" id="radio-input"></input>
        </div>
        <div className="flex gap-3 items-center">
          <label htmlFor="radio-input">5</label>
          <input type="checkbox" id="radio-input"></input>
        </div>
        <div className="flex gap-3 items-center">
          <label htmlFor="radio-input">6</label>
          <input type="checkbox" id="radio-input"></input>
        </div>
      </div>
    </ul>
  );
};

export default AnswersDropdown;
