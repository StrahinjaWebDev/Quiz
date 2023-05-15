import React, { useEffect, useState } from "react";
import { Question } from "../../models/Question";
import Button from "../ReusableComponents/Button";
import { deleteQuiz } from "../../service/deleteQuiz";
import Input from "../ReusableComponents/Input";
import { Quiz as IQuiz } from "../../models/Quiz";
import { getQuestions } from "../../service/getQuestions";
import { putQuiz } from "../../service/putQuiz";
import EditQuizQuestions from "./EditQuizQuestions";
import { patchActivateQuiz } from "../../service/patchActivateQuiz";

interface Props {
  id: string;
  name: string;
  quizQuestions: Question[] | null | undefined;
  active: boolean | undefined;
  quizzes: IQuiz[];
  // eslint-disable-next-line no-unused-vars
  setQuizzes: (quizzes: IQuiz[]) => void;
  // eslint-disable-next-line no-unused-vars
  setQuizQuestions: (questions: Question[]) => void;
}

const QuizLayout = ({ id, name, quizQuestions, active, quizzes: initialQuizzes, setQuizzes, setQuizQuestions }: Props) => {
  const [editQuizModal, setEditQuizModal] = useState(false);
  const [editQuizModalId, setEditQuizModalId] = useState("");
  const [quizName, setQuizName] = useState("");

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
  };

  const handleIsActiveQuiz = async (quizId: string, isActive: boolean) => {
    const quiz = initialQuizzes.find((q) => q.id === quizId);
    if (quiz) {
      const updatedQuiz = { ...quiz, active: !isActive };
      const response = await patchActivateQuiz(quizId, updatedQuiz);
      if (response.success) {
        setQuizzes(initialQuizzes.map((q) => (q.id === quizId ? updatedQuiz : q)));
      } else {
        alert(response.error);
      }
    }
  };

  const handleEditQuizName = async (quizId: string, newName: string) => {
    const quiz = initialQuizzes.find((q) => q.id === quizId);
    if (quiz) {
      const updatedQuiz = { ...quiz, name: newName };
      const response = await putQuiz(quizId, updatedQuiz);
      if (response.success) {
        setQuizzes(initialQuizzes.map((q) => (q.id === quizId ? updatedQuiz : q)));
      } else {
        alert(response.error);
      }
    }
  };

  const handleNewQuizName = () => {
    handleEditQuizName(id, quizName);
  };

  return (
    <div className="flex w-1/2 items-center gap-10 mt-5">
      <p className="text-sm text-main med:text-xl w-[30%] font-medium">{name}</p>
      <Button onClick={() => handleEditQuizModal(id)} label="Edit" primary />
      {editQuizModal && id === editQuizModalId && (
        <div className="absolute flex justify-center w-[90%] h-[60%] bg-third top-1/2 left-1/2	transform -translate-x-1/2 -translate-y-1/2 rounded-xl overflow-y-auto">
          <div className="w-4/5 mt-7 flex flex-col items-center ">
            <div>{quizQuestions && <EditQuizQuestions quizId={editQuizModalId} quizQuestions={quizQuestions} />}</div>
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
