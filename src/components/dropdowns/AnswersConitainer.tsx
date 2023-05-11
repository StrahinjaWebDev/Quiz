import React from "react";
import { Answers } from "../../models/Answers";
import QuestionListItem from "../QuestionListItem";

interface Props {
  answers: Answers[];
}

const AnswersConitainer = ({ answers, setAnswers, selectedType }: Props) => {
  const setAnswerText = (event, id) => {
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

  const setCorrectAnwer = (selection, id) => {
    setAnswers((prev) => {
      let newArray = prev.map((answer) => {
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

  return (
    <div>
      {answers.map((answer) => (
        <div key={answer.id}>
          <QuestionListItem
            onTextChange={(event) => setAnswerText(event, answer.id)}
            onSelectionChage={(selection) => setCorrectAnwer(selection, answer.id)}
            isSelected={answer.correct}
            value={answer.text}
          />
        </div>
      ))}
    </div>
  );
};

export default AnswersConitainer;
