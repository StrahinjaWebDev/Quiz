import React from "react";
import Input from "./Input";

const QuestionListItem = ({ value, isSelected, onTextChange, onSelectionChage }) => {
  return (
    <div className="flex gap-3">
      <Input value={value} onChange={onTextChange} primary placeholder=" Type your answer here..." />
      <div className="w-[20px] h-[20px] bg-white flex justify-center items-center" onClick={() => onSelectionChage(!isSelected)}>
        {isSelected && <div className="w-[10px] h-[10px] bg-black"></div>}
      </div>
    </div>
  );
};

export default QuestionListItem;
