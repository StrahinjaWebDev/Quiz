import React, { useState } from "react";
import Input from "../Input";

interface Props {
  selectedType: string;
  setQuizQuestion: React.Dispatch<React.SetStateAction<string>>;
  setQuizHint: React.Dispatch<React.SetStateAction<string>>;
  // eslint-disable-next-line no-unused-vars
  setAnswer: (event: string[]) => void;
}

const AnswersDropdown = ({ selectedType, setQuizQuestion, setAnswer, setQuizHint }: Props) => {
  const [numOfAnswers, setNumOfAnswers] = useState<number>(0);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [isCorrect, setisCorrect] = useState(false);

  const handleCheckBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = Number(e.target.value);
    setNumOfAnswers(num);
  };

  const handleRadioClick = (id: number) => {
    const updatedValues = selectedValues.map((value, index) => (index === id ? { ...value, correct: true } : { ...value, correct: false }));
    setSelectedValues(updatedValues);
    setAnswer(selectedValues);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const updatedValues = [...selectedValues];
    updatedValues[id] = { value: event.target.value, correct: false };
    setSelectedValues(updatedValues);
  };

  // console.log(selectedValues);
  // console.log(answer);

  return (
    <ul className="py-2 text-sm text-gray-300 dark:text-gray-200">
      <div className="flex flex-col  justify-center items-center">
        {selectedType === "Text" ? (
          <>
            <div className="flex gap-3 items-center">
              <label>1</label>
              <input type="radio" name="typeText" value={1} onChange={handleCheckBoxChange} />
            </div>
          </>
        ) : (
          <>
            {[1, 2, 3, 4, 5, 6].map((value) => (
              <div key={value} className="flex gap-3 items-center">
                <label>{value}</label>
                <input type="radio" name="numOfAnswers" value={value} onChange={handleCheckBoxChange} />
              </div>
            ))}
          </>
        )}
        {numOfAnswers > 0 && (
          <div className="mt-4">
            <div className="flex flex-col gap-2">
              <label className="text-gray-500 dark:text-gray-300 font-bold">Your Question: </label>
              <Input primary placeholder=" Input your question text here..." onChange={(event) => setQuizQuestion(event.target.value)} />
              <label className="text-gray-500 dark:text-gray-300 font-bold">Your Hint: </label>
              <Input primary placeholder=" Input your hint here..." onChange={(event) => setQuizHint(event.target.value)} />
            </div>
            {[...Array(numOfAnswers)].map((_, id) => (
              <div key={id} className="flex flex-col gap-2 mt-5">
                <label className="text-gray-500 dark:text-gray-300">Answer {id + 1}</label>
                <div className="flex gap-3">
                  <Input primary placeholder="Input your question here..." onChange={(event) => handleInputChange(event, id)} />
                  {selectedType === "Multiple" ? (
                    <input type="radio" name={`answer_${id + 1}`} onClick={() => handleRadioClick(id)} />
                  ) : (
                    <input type="radio" name="answer" onClick={() => handleRadioClick(id)} />
                  )}
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
