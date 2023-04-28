import React, { useEffect } from "react";
import Card, { ICard } from "../components/Card";
import { getQuizzes } from "../service/getQuizzes";

const UserPreQuiz = ({ selectedCard, start }: any) => {
  const quizes = async () => {
    const quiz = await getQuizzes();
    console.log(quiz.data);
  };

  useEffect(() => {
    quizes();
  }, []);

  return (
    <>
      <Card
        start={true}
        images={selectedCard.images}
        quizDescription={selectedCard.quizDescription}
        label={selectedCard.label}
        quizMainText={selectedCard.quizMainText}
      />
    </>
  );
};

export default UserPreQuiz;
