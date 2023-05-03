import React, { useEffect } from "react";
import Card from "../components/Card";
import { getQuizzes } from "../service/getQuizzes";

const UserPreQuiz = ({ selectedCard }: any) => {
  const quizes = async () => {
    const quiz = await getQuizzes();
    console.log(quiz.data);
  };

  useEffect(() => {
    quizes();
  }, []);

  const handleStartQuiz = () => {};
  console.log(selectedCard);

  return (
    <div>
      <Card
        start={true}
        key={selectedCard.id}
        label={selectedCard.category}
        images={selectedCard.images}
        quizMainText={selectedCard.name}
        quizTime={selectedCard.time}
        quizDescription={selectedCard.description}
      />
    </div>
  );
};

export default UserPreQuiz;
