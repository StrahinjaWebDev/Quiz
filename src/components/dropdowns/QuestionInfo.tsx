import React from "react";
import Input from "../Input";

interface Props {
  setSelectedType: React.Dispatch<React.SetStateAction<string>>;
  setQuestionText: React.Dispatch<React.SetStateAction<string>>;
  setHint: React.Dispatch<React.SetStateAction<string>>;
  selectedType: string;
  // eslint-disable-next-line no-unused-vars
  handleCheckBoxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const QuestionInfo = ({ setSelectedType, selectedType, setQuestionText, setHint, handleCheckBoxChange }: Props) => {
  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedType(event.target.value);
  };

  return (
    <>
      <div className="flex flex-row gap-4">
        <div className="flex gap-3 items-center justify-between">
          <label htmlFor="radio-input">Single choice</label>
          <input type="radio" name="type" value="Single" checked={selectedType === "Single"} onChange={handleOptionChange}></input>
        </div>
        <div className="flex gap-3 items-center justify-between">
          <label htmlFor="radio-input">Multiple choice</label>
          <input type="radio" name="type" value="Multiple" checked={selectedType === "Multiple"} onChange={handleOptionChange}></input>
        </div>
        <div className="flex gap-3 items-center justify-between">
          <label htmlFor="radio-input">Text answer</label>
          <input type="radio" name="type" value="Text" checked={selectedType === "Text"} onChange={handleOptionChange}></input>
        </div>
      </div>

      {selectedType !== "Text" && (
        <>
          {[1, 2, 3, 4, 5, 6].map((value) => (
            <div key={value} className="flex flex-row">
              <div className="flex flex-row gap-3 items-center">
                <label>{value}</label>
                <input type="radio" name="numOfAnswers" value={value} onChange={handleCheckBoxChange} />
              </div>
            </div>
          ))}
        </>
      )}
      <div className="flex flex-col gap-2">
        <label className="text-gray-500 dark:text-gray-300 font-bold">Your Question: </label>
        <Input primary placeholder=" Input your question text here..." onChange={(event) => setQuestionText(event.target.value)} />
        <label className="text-gray-500 dark:text-gray-300 font-bold">Your Hint: </label>
        <Input primary placeholder=" Input your hint here..." onChange={(event) => setHint(event.target.value)} />
      </div>
    </>
  );
};

export default QuestionInfo;
