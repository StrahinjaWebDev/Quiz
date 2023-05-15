import React, { useState, useEffect } from "react";
import Button from "../ReusableComponents/Button";
import Input from "../ReusableComponents/Input";
import { Question } from "../../models/Question";
import { getQuizById } from "../../service/getQuizzById";
import { Quiz } from "../../models/Quiz";
import { putQuiz } from "../../service/putQuiz";

interface Props {
  quizQuestions: Question[];
  quizId: string;
}

const EditQuizQuestions = ({ quizQuestions, quizId }: Props) => {
  const [quizData, setQuizData] = useState<Quiz | undefined>({});
  const [questionsDropdown, setQuestionsDropdown] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [time, setTime] = useState(0);

  const getQuiz = async () => {
    const quiz = await getQuizById(quizId);
    setQuizData(quiz.data);
  };

  console.log(name);

  useEffect(() => {
    if (quizData && quizData.name && quizData.category && quizData.time) {
      setName(quizData?.name);
      setCategory(quizData?.category);
      setTime(quizData?.time);
    }
  }, [quizData]);

  useEffect(() => {
    getQuiz();
  }, []);

  const saveSettings = async () => {
    if (quizData) {
      await putQuiz(quizId, {
        id: quizData.id,
        active: quizData.active,
        category: quizData.category,
        description: quizData.description,
        name: name,
        time: quizData.time,
        questions: quizData.questions,
      });
      getQuiz();
    }
  };

  return (
    <div>
      <div className="flex flex-col items-start py-10">
        {quizData && quizData.name && quizData.category && (
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-start flex-col pl-3">
              <label htmlFor="quizzName">Quizz name</label>
              <Input onChange={(e) => setName(e.target.value)} id="quizzName" defaultValue={quizData.name} primary />
            </div>
            <div className="flex items-start flex-col pl-3">
              <label htmlFor="quizzCategory">Quizz category</label>
              <Input id="quizzCategory" defaultValue={quizData.category} primary />
            </div>
            <div className="flex items-start flex-col pl-3">
              <label htmlFor="quizzDescription">Quizz description</label>
              <Input id="quizzDescription" defaultValue={quizData.description} primary />
            </div>
            <div className="flex items-start flex-col pl-3">
              <label htmlFor="quizzTime">Quizz time</label>
              <Input id="quizzTime" defaultValue={quizData.time} primary />
            </div>
            <div className="flex w-full justify-start ml-4">
              <Button onClick={saveSettings} primary label="Save" />
            </div>
          </div>
        )}
        <button onClick={() => setQuestionsDropdown(!questionsDropdown)}>Questions </button>
        {quizQuestions &&
          questionsDropdown &&
          quizQuestions.map((question: Question) => (
            <div key={question.id} className="flex flex-col gap-3 pt-2 ">
              <div className="flex items-start flex-col pl-3">
                <label htmlFor="name">Qustion name</label>
                <Input id="name" defaultValue={question.text} primary />
              </div>
              <div className="flex flex-col items-center gap-4">
                <div className="flex items-end gap-3">
                  <div className="flex flex-col items-start gap-1">
                    <label htmlFor="type">Question type</label>
                    <Input id="type" defaultValue={question.type} primary />
                  </div>
                  <Button primary label="Change" />
                </div>

                <div className="flex items-end gap-3">
                  <div className="flex flex-col items-start gap-1">
                    <label htmlFor="hint">Question hint</label>
                    <Input id="hint" defaultValue={question.hint} primary />
                  </div>
                  <Button primary label="Change" />
                </div>
              </div>
              <div>
                <div className="flex flex-col ml-10 gap-3">
                  <p className="font-semibold text-main">Answers</p>
                  {question.answers.map((answer) => (
                    <div className="flex gap-3" key={answer.id}>
                      <Input defaultValue={answer.text} primary />
                      <div className="max-w-1/2">
                        <Button primary label="Change" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default EditQuizQuestions;
