import React from "react";
import Input from "./Input";

interface Props {
  value: string;
  isSelected: boolean;
  // eslint-disable-next-line no-unused-vars
  onTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // eslint-disable-next-line no-unused-vars
  onSelectionChage: (isSelected: boolean) => void;
}

const QuestionListItem = ({ value, isSelected, onTextChange, onSelectionChage }: Props) => {
  return (
    <div className="flex ">
      <Input value={value} onChange={onTextChange} primary placeholder=" Type your answer here..." />
      <div className="w-[20px] h-[20px] bg-white flex justify-center items-center" onClick={() => onSelectionChage(!isSelected)}>
        {isSelected && <div className="w-[10px] h-[10px] bg-black"></div>}
      </div>
    </div>
  );
};

export default QuestionListItem;
