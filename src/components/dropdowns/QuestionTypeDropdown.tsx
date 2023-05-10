import React from "react";

interface Props {
  setSelectedType: React.Dispatch<React.SetStateAction<string>>;
  selectedType: string;
}

const QuestionTypeDropdown = ({ setSelectedType, selectedType }: Props) => {
  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedType(event.target.value);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3 items-center justify-between">
        <label htmlFor="radio-input">Single choise</label>
        <input type="radio" name="type" value="Single" checked={selectedType === "Single"} onChange={handleOptionChange}></input>
      </div>
      <div className="flex gap-3 items-center justify-between">
        <label htmlFor="radio-input">Multiple choise</label>
        <input type="radio" name="type" value="Multiple" checked={selectedType === "Multiple"} onChange={handleOptionChange}></input>
      </div>
      <div className="flex gap-3 items-center justify-between">
        <label htmlFor="radio-input">Text answer</label>
        <input type="radio" name="type" value="Text" checked={selectedType === "Text"} onChange={handleOptionChange}></input>
      </div>
    </div>
  );
};

export default QuestionTypeDropdown;
