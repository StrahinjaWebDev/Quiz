import React, { useState, useEffect } from "react";
import Button from "../ReusableComponents/Button";
import Input from "../ReusableComponents/Input";
import { Question } from "../../models/Question";
import { getQuizById } from "../../service/getQuizzById";
import { Quiz } from "../../models/Quiz";
import { putQuiz } from "../../service/putQuiz";

interface Props {
  quizQuestions: Question[] | undefined | null;
  quizId: string;
  setEditQuizModalId: () => void;
}

const EditQuizQuestions = ({ quizQuestions, quizId, setEditQuizModalId }: Props) => {
  const [quizData, setQuizData] = useState<Quiz | undefined>({});
  const [questionsDropdown, setQuestionsDropdown] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState(0);

  const [questions, setQuestions] = useState(quizQuestions);

  const getQuiz = async () => {
    const quiz = await getQuizById(quizId);
    setQuizData(quiz.data);
  };

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
      let putModel: Quiz = {
        id: quizData.id,
        active: quizData.active,
        category: category,
        description: description,
        name: name,
        time: time,
        questions: questions,
      };
      await putQuiz(quizId, putModel);
      getQuiz();
    }
  };

  const handleQuestionText = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const newQuestions = questions?.map((question) => {
      if (question.id !== id) return question;
      else
        return {
          ...question,
          text: e.target.value,
        };
    });
    setQuestions(newQuestions);
  };

  const handleQuestionType = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const newQuestions = questions?.map((question) => {
      if (question.id !== id) return question;
      else
        return {
          ...question,
          type: e.target.value,
        };
    });
    setQuestions(newQuestions);
  };

  const handleQuestionHint = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const newQuestions = questions?.map((question) => {
      if (question.id !== id) return question;
      else
        return {
          ...question,
          hint: e.target.value,
        };
    });
    setQuestions(newQuestions);
  };

  const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>, id: string, questionId: string) => {
    const newQuestions = questions?.map((question) => {
      if (question.id !== questionId) return question;
      else {
        const newAnswers = question.answers.map((answer) => {
          if (answer.id !== id) return answer;
          else {
            return {
              ...answer,
              text: e.target.value,
            };
          }
        });
        return {
          ...question,
          answers: newAnswers,
        };
      }
    });
    setQuestions(newQuestions);
  };

  return (
    <div>
      <div className="flex flex-col items-center py-10">
        {quizData && quizData.name && quizData.category && (
          <div className="flex flex-col items-center gap-3">
            <button className="absolute right-5 top-5 text-4xl font-bold text-red-500" onClick={() => setEditQuizModalId(!quizId)}>
              X
            </button>
            <div className="flex items-start flex-col pl-3">
              <label className="text-main font-bold" htmlFor="quizzName">
                Quizz name
              </label>
              <Input onChange={(e) => setName(e.target.value)} id="quizzName" defaultValue={quizData.name} primary />
            </div>
            <div className="flex items-start flex-col pl-3">
              <label className="text-main font-semibold" htmlFor="quizzCategory">
                Quizz category
              </label>
              <Input onChange={(e) => setCategory(e.target.value)} id="quizzCategory" defaultValue={quizData.category} primary />
            </div>
            <div className="flex items-start flex-col pl-3">
              <label className="text-main font-medium" htmlFor="quizzDescription">
                Quizz description
              </label>
              <Input onChange={(e) => setDescription(e.target.value)} id="quizzDescription" defaultValue={quizData.description} primary />
            </div>
            <div className="flex items-start flex-col pl-3">
              <label className="text-main font-normal" htmlFor="quizzTime">
                Quizz time
              </label>
              <Input onChange={(e) => setTime(e.target.value)} id="quizzTime" defaultValue={quizData.time} primary />
            </div>
            <div className="flex w-full justify-center ml-4">
              <Button onClick={saveSettings} primary label="Save" />
            </div>
          </div>
        )}
        <div className="mt-12 ml-5">
          <Button label="Questions" primary onClick={() => setQuestionsDropdown(!questionsDropdown)} />
        </div>
        {quizQuestions &&
          questionsDropdown &&
          quizQuestions.map((question: Question) => (
            <div key={question.id} className="flex  items-center gap-3 pt-2 ">
              <div className="flex items-start flex-col pl-3 text-main font-medium">
                <label htmlFor="name">Qustion name</label>
                <Input onChange={(e) => question.id && handleQuestionText(e, question.id)} id="name" defaultValue={question.text} primary />
              </div>
              <div className="flex flex-col items-center gap-4">
                <div className="flex items-end gap-3">
                  <div className="flex flex-col items-start gap-1">
                    <label className="text-main font-medium" htmlFor="type">Question type</label>
                    <Input
                      onChange={(e) => question.id && handleQuestionType(e, question.id)}
                      id="type"
                      defaultValue={question.type}
                      primary
                    />
                  </div>
                </div>

                <div className="flex items-end gap-3">
                  <div className="flex flex-col items-start gap-1">
                    <label className="text-main font-medium" htmlFor="hint">Question hint</label>
                    <Input
                      onChange={(e) => question.id && handleQuestionHint(e, question.id)}
                      id="hint"
                      defaultValue={question.hint}
                      primary
                    />
                  </div>
                </div>
              </div>
              <div>
                <div className="flex flex-col ml-10 gap-3">
                  <p className="font-semibold text-main">Answers</p>
                  {question.answers.map((answer) => (
                    <div className="flex gap-3" key={answer.id}>
                      <Input defaultValue={answer.text} onChange={(e) => handleAnswerChange(e, answer.id, question.id)} primary />
                      <div className="max-w-1/2"></div>
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
