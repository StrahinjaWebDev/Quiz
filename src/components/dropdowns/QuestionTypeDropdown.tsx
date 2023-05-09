import React from "react";

const QuestionTypeDropdown = () => {
  return (
    <div className="flex flex-col">
      <div className="flex gap-3 items-center">
        <label htmlFor="radio-input">Single choise</label>
        <input type="checkbox" id="radio-input"></input>
      </div>
      <div className="flex gap-3 items-center">
        <label htmlFor="radio-input">Multiple choise</label>
        <input type="checkbox" id="radio-input"></input>
      </div>
      <div className="flex gap-3 items-center">
        <label htmlFor="radio-input">Text answer</label>
        <input type="checkbox" id="radio-input"></input>
      </div>
    </div>
  );
};

export default QuestionTypeDropdown;
