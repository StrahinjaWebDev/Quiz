import React, { useState } from "react";
import Input from "../Input";

interface Props {
  selectedType: string;
}

const AnswersDropdown = ({ selectedType }: Props) => {
  const [numOfAnswers, setNumOfAnswers] = useState<number>(0);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [answer, setAnswer] = useState<string[]>([]);

  const handleCheckBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = Number(e.target.value);
    setNumOfAnswers(num);
  };

  const handleRadioClick = () => {
    setAnswer(selectedValues);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const updatedValues = [...selectedValues];
    updatedValues[id] = event.target.value;
    setSelectedValues(updatedValues);
  };

  // console.log(selectedValues);
  console.log(answer);

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
              <label className="text-gray-500 dark:text-gray-300 font-bold">Your Question:</label>
              <Input primary placeholder=" Input your question text here..." />
            </div>
            {[...Array(numOfAnswers)].map((_, id) => (
              <div key={id} className="flex flex-col gap-2 mt-5">
                <label className="text-gray-500 dark:text-gray-300">Answer {id + 1}</label>
                <div className="flex gap-3">
                  <Input primary placeholder="Input your question here..." onChange={(event) => handleInputChange(event, id)} />
                  {selectedType === "Multiple" ? (
                    <input type="radio" name={`answer_${id + 1}`} onClick={handleRadioClick} />
                  ) : (
                    <input type="radio" name="answer" onClick={handleRadioClick} />
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
