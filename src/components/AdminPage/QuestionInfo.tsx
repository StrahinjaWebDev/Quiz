import React from "react";
import Input from "../ReusableComponents/Input";

interface Props {
  setSelectedType: React.Dispatch<React.SetStateAction<string>>;
  setQuestionText: React.Dispatch<React.SetStateAction<string>>;
  setHint: React.Dispatch<React.SetStateAction<string>>;
  selectedType: string;
  questionText: string;
  // eslint-disable-next-line no-unused-vars
  handleCheckBoxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  hint: string;
}

const QuestionInfo = ({ setSelectedType, selectedType, setQuestionText, setHint, handleCheckBoxChange, questionText, hint }: Props) => {
  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedType(event.target.value);
  };

  return (
    <>
      <div className="flex flex-row gap-4 text-secondary text-lg font-extralight  items-center justify-between mt-6">
        <div className="flex gap-3 items-center justify-between ">
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
        <div className="flex flex-row justify-between items-center mt-6">
          {[1, 2, 3, 4, 5, 6].map((value) => (
            <div key={value} className="flex flex-row text-xl font-mono text-secondary">
              <div className="flex flex-row gap-2 items-center justify-center">
                <label>{value}</label>
                <input type="radio" name="numOfAnswers" value={value} onChange={handleCheckBoxChange} />
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="flex flex-row gap-6 items-center mt-4">
        <label className="text-gray-500 dark:text-gray-300 font-bold text-xl">Question: </label>
        <Input
          value={questionText}
          primary
          placeholder=" Input your question text here..."
          onChange={(event) => setQuestionText(event.target.value)}
        />
        <label className="text-gray-500 dark:text-gray-300 font-bold text-xl">Hint: </label>
        <Input value={hint} primary placeholder=" Input your hint here..." onChange={(event) => setHint(event.target.value)} />
      </div>
    </>
  );
};

export default QuestionInfo;
