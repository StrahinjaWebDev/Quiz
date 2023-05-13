import React from "react";
import Input from "./Input/Input";

interface Props {
  value: string;
  isSelected: boolean;
  // eslint-disable-next-line no-unused-vars
  onTextChange: (text: string) => void;
  // eslint-disable-next-line no-unused-vars
  onSelectionChage: (isSelected: boolean) => void;
}
const QuestionListItem = ({ value, isSelected, onTextChange, onSelectionChage }: Props) => {
  return (
    <div className="flex  items-center gap-2">
      <Input value={value} onChange={onTextChange} primary placeholder=" Type your answer here..." />
      <div
        className="w-[10px] h-[10px] bg-white flex justify-center items-center rounded-full"
        onClick={() => onSelectionChage(!isSelected)}
      >
        {isSelected && <div className="w-[7px] h-[7px] bg-black rounded-full justify-center items-center flex text-center"></div>}
      </div>
    </div>
  );
};

export default QuestionListItem;
