import React, { useState, useEffect } from "react";
import { getQuizzes } from "../service/getQuizzes";
import Button from "../components/Button";
import Instruction from "../components/Instruction";
import { getQuestions } from "../service/getQuestions";

const UserPreQuiz = ({ selectedCard }: any) => {
  const [startQuiz, setStartQuiz] = useState(false);

  const quizes = async () => {
    const quiz = await getQuizzes();
  };

  const questions = async () => {
    const question = await getQuestions(selectedCard.id);
    console.log(question);
  };

  useEffect(() => {
    quizes();
  }, []);

  useEffect(() => {
    questions();
  }, []);

  const handleStartQuiz = () => {
    setStartQuiz(!startQuiz);
  };

  //! Fetch pitanja

  return (
    <>
      {!startQuiz && (
        <div
          key={selectedCard.id}
          className="h-[25em] w-[40em] juctify-center items-center bg-secondary rounded-[15px] flex flex-col justify-around"
        >
          <Instruction />
          <h1 className="text-3xl">{selectedCard.name}</h1>
          <p className="text-base">{selectedCard.description}</p>
          <span className="text-xl">Time to finish the quiz: {selectedCard.time}</span>
          <Button primary label="Start" onClick={handleStartQuiz}></Button>
          <Button secondary label="Back to quizzies"></Button>
        </div>
      )}
      {startQuiz && <div></div>}
    </>
  );
};

export default UserPreQuiz;
