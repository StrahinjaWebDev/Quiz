import React, { useState } from "react";
import { Question } from "../models/Question";
import Button from "./Button";
import { deleteQuiz } from "../service/deleteQuiz";
import Input from "./Input";
import { Quiz as IQuiz } from "../models/Quiz";
import { getQuestions } from "../service/getQuestions";
import { putQuiz } from "../service/putQuiz";

interface Props {
  id: string;
  name: string;
  quizQuestions: Question[] | null | undefined;
  active: boolean;
  quizzes: IQuiz[];
  // eslint-disable-next-line no-unused-vars
  setQuizzes: (quizzes: IQuiz[]) => void;
  // eslint-disable-next-line no-unused-vars
  setQuizQuestions: (questions: Question[]) => void;
}

const QuizLayout = ({ id, name, quizQuestions, active, quizzes: initialQuizzes, setQuizzes, setQuizQuestions }: Props) => {
  const [editQuizModal, setEditQuizModal] = useState(false);
  const [editQuizModalId, setEditQuizModalId] = useState("");

  const handleDeleteQuiz = async (quizId: string) => {
    await deleteQuiz(quizId);
    const updatedQuizzes = initialQuizzes.filter((quiz) => quiz.id !== quizId);
    setQuizzes(updatedQuizzes);
  };

  const handleEditQuizModal = async (quizId: string) => {
    setEditQuizModal(!editQuizModal);
    setEditQuizModalId(quizId);
    const question = await getQuestions(quizId);
    if (Array.isArray(question.data?.questions)) {
      setQuizQuestions(question.data?.questions);
    }
    console.log(question);
  };

  const handleIsActiveQuiz = async (quizId: string, isActive: boolean) => {
    const quiz = initialQuizzes.find((q) => q.id === quizId);
    if (quiz) {
      const updatedQuiz = { ...quiz, active: !isActive };
      const response = await putQuiz(quizId, updatedQuiz);
      if (response.success) {
        setQuizzes(initialQuizzes.map((q) => (q.id === quizId ? updatedQuiz : q)));
      } else {
        console.log(response.error);
      }
    }
  };

  return (
    <div className="flex flex-row w-[80%] h-[10%] items-center justify-between mt-5">
      <p className="text-sm text-main med:text-xl w-[30%]">{name}</p>
      <Button onClick={() => handleEditQuizModal(id)} label="Edit" primary />
      {editQuizModal && id === editQuizModalId && (
        <div className="absolute flex justify-center w-[90vw] h-[60vh] bg-third top-1/2 left-1/2 	transform -translate-x-1/2 -translate-y-1/2 rounded-xl">
          <div className="w-4/5 mt-7 flex flex-col items-center ">
            <div className="flex gap-4 items-center">
              <p className="text-xl font-serif">Edit: {name}</p>
              <Input placeholder="Input new quiz name..." primary />
              <Button primary label="Set new name" />
            </div>
            <div>
              {quizQuestions &&
                quizQuestions.map((question) => (
                  <div key={question.id}>
                    <p>{question.text}</p>
                    <p>Question type: {question.type}</p>
                    <p>Question hint: {question.hint}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
      <Button onClick={() => handleDeleteQuiz(id)} label="Delete" primary />
      {active ? (
        <Button label="Activate" onClick={() => handleIsActiveQuiz(id, true)} primary></Button>
      ) : (
        <Button label="Deactivate" onClick={() => handleIsActiveQuiz(id, false)} primary></Button>
      )}
    </div>
  );
};

export default QuizLayout;
