import React from "react";
import { Answers } from "../../models/Answers";
import QuestionListItem from "./QuestionListItem";

interface Props {
  answers: Answers[];
  selectedType: string;
  // eslint-disable-next-line no-unused-vars
  setAnswers: (answers: Answers[]) => void;
}

const AnswersConitainer = ({ answers, setAnswers, selectedType }: Props) => {
  const setAnswerText = (event: React.ChangeEvent<HTMLInputElement>, id: string) => {
    setAnswers((prev) => {
      let newArray = prev.map((answer) => {
        if (answer.id === id) {
          return {
            ...answer,
            text: event.target.value,
          };
        } else return answer;
      });
      return newArray;
    });
  };

  const setCorrectAnwer = (selection: boolean, id: string) => {
    setAnswers((prev) => {
      let newArray = prev.map((answer: Answers) => {
        if (answer.id === id) {
          return {
            ...answer,
            correct: Boolean(selection),
          };
        } else {
          if (selectedType === "Single") {
            return {
              ...answer,
              correct: false,
            };
          }
          if (selectedType === "Multiple") {
            return answer;
          }
        }
      });
      return newArray;
    });
  };

  console.log(answers);

  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-2 gap-12 mt-12">
        {answers.map((answer) => (
          <div key={answer.id} className="flex items-center gap-3 justify-center ">
            <h1 className="text-3xl text-white">Answer</h1>
            <QuestionListItem
              onTextChange={(event: string) => setAnswerText(event, answer.id)}
              onSelectionChage={(selection: boolean) => setCorrectAnwer(selection, answer.id)}
              isSelected={answer.correct}
              value={answer.text}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnswersConitainer;
