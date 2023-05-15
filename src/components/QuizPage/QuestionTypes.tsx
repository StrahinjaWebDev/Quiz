import React from "react";
import { Question } from "../../models/Question";
import { Answers } from "../../models/Answers";
import Input from "../ReusableComponents/Input";

interface Props {
  question: Question;
  // eslint-disable-next-line no-unused-vars
  handleCheckedAnswer: (answer: string, id: string, questionId: string, correct: boolean, type: string) => void;
  highlightedAnswerId: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  inputValue: string;
  handleInputSubmit: () => void;
  checkedAnswers: Answers;
}

const QuestionTypes = ({ question, handleCheckedAnswer, setInputValue, inputValue, handleInputSubmit, checkedAnswers }: Props) => {
  return (
    <>
      {question.answers.map((answer: Answers) => {
        return (
          <div className="pl-12 flex" key={answer.id}>
            {question.type === "Multiple" && (
              <button
                onClick={() => handleCheckedAnswer(answer.text, answer.id, answer.questionId, answer.correct, question.type)}
                className={`w-[90%] flex text-sm justify-center items-center border-dotted border-black border-2 ${
                  checkedAnswers.find((q) => q.id === answer.id) ? "border-red-500" : ""
                }`}
              >
                {answer.text}
              </button>
            )}
            {question.type === "Text" && (
              <div className="flex">
                <Input primary placeholder="Type in your answer" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />

                <button onClick={handleInputSubmit} className="border-2 border-black border-dotted h-1/3">
                  Submit
                </button>
              </div>
            )}
            {question.type === "Single" && (
              <button
                onClick={() => handleCheckedAnswer(answer.text, answer.id, answer.questionId, answer.correct, question.type)}
                className={`w-[90%] flex text-sm justify-center items-center border-dotted border-black border-2 ${
                  checkedAnswers.find((q) => q.id === answer.id) ? "border-red-500" : ""
                }`}
              >
                {answer.text}
              </button>
            )}
          </div>
        );
      })}
    </>
  );
};

export default QuestionTypes;
