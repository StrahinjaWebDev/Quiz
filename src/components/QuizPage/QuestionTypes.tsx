import React, { useState, useEffect } from "react";
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
  isHelpUsed: boolean;
}

const QuestionTypes = ({
  question,
  handleCheckedAnswer,
  setInputValue,
  inputValue,
  handleInputSubmit,
  checkedAnswers,
  isHelpUsed,
}: Props) => {
  const [currentQuestion, setCurrentQuestion] = useState(question.answers);

  const halfHelp = (qestionAnswers: Answers[]) => {
    let correctAnswers = qestionAnswers.filter((answer: { correct: boolean }) => answer.correct === true);
    let incorrectAnswers = qestionAnswers.filter((answer: { correct: boolean }) => answer.correct !== true);
    let halfLength = Math.floor(incorrectAnswers.length / 2);
    let randomIncorrectAnswers = incorrectAnswers.slice(0, Math.floor(halfLength));
    let randomNum = Math.floor(Math.random() * 2);
    let answers;
    if (randomNum === 1) {
      answers = [...correctAnswers, ...randomIncorrectAnswers];
    } else {
      answers = [...randomIncorrectAnswers, ...correctAnswers];
    }
    return answers;
  };

  useEffect(() => {
    if (isHelpUsed) {
      setCurrentQuestion(halfHelp(currentQuestion));
    }
    console.log(currentQuestion);
  }, [isHelpUsed]);

  return (
    <>
      {currentQuestion.map((answer: Answers) => {
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
