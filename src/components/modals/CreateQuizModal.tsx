import React, { useState, useEffect } from "react";
import Button from "../Button";
import { postQuizzes } from "../../service/postQuestions";
import CreateQuizHeader from "../CreateQuizHeader";
import AnswersConitainer from "../dropdowns/AnswersConitainer";
import QuestionInfo from "../dropdowns/QuestionInfo";
import { v4 as uuid } from "uuid";
import QuestionListItems from "../QuestionListItem";
import Input from "../Input";
import { Question } from "../../models/Question";
import { Answers } from "../../models/Answers";
import { Quiz } from "../../models/Quiz";
import { clear } from "console";

interface Props {
  createQuizModal: boolean;
  // eslint-disable-next-line no-unused-vars
  setCreateQuizModal: () => void;
}

const CreateQuizModal = ({ createQuizModal, setCreateQuizModal }: Props) => {
  const [quizzes, setQuizzes] = useState<Quiz[] | []>([]);
  const [name, setName] = useState("");
  const [time, setTime] = useState(0);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const [selectedType, setSelectedType] = useState("");

  const [questions, setQuestions] = useState<Question[] | []>([]);
  const [hint, setHint] = useState("");
  const [questionText, setQuestionText] = useState("");

  const [numOfAnswers, setNumOfAnswers] = useState<number>(0);
  const [answers, setAnswers] = useState<Answers[] | []>([]);
  const [writtenAnswer, setWrittenAnswer] = useState("");

  const handleCheckBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = Number(e.target.value);
    setNumOfAnswers(num);
  };

  const handleAddQuiz = () => {
    const newQuiz = {
      name: name,
      time: time,
      category: category,
      active: true,
      description: description,
      questions: questions,
    };
    postQuizzes(newQuiz).then((response) => {
      if (response.success) {
        setQuizzes((prev) => [...prev, newQuiz]);
        alert("Added Quiz");
      } else {
        alert(response.error);
      }
    });
  };
  //? validacija i question dodavanje u niz stejt

  const addQuestion = () => {
    const newQuestion = {
      type: selectedType,
      text: questionText,
      hint: hint,
      answers: answers,
    };

    if (validation(newQuestion)) {
      alert("Added question");
      setQuestions((prev) => [...prev, newQuestion]);
    }
  };

  const clearAll = () => {
    setAnswers([]);
    setHint("");
    setSelectedType("");
    setQuestionText("");
  };

  const validation = (question: Question) => {
    let isValid = true;
    if (question.text === "" || question.hint === "" || question.type === "" || question.answers.length === 0) {
      isValid = false;
    }
    question.answers.forEach((answer) => {
      if (answer.text === "") {
        isValid = false;
      }
    });

    let hasCorrectAnswer = question.answers.some((answer) => answer.correct === true);
    if (!hasCorrectAnswer) isValid = false;
    return isValid;
  };

  //? const some = (array, dispatch) => {
  // ?  for (let i = 0; i < array.length; i++) {
  //  ?   if (dispatch(array[i])) return true;
  //   ?}
  //   ?return false;
  // ?};

  // ?useEffect(() => {
  //  ? console.log(some([1, 2, 3, 4], (item) => item === 2));
  // ?}, []);

  useEffect(() => {
    let array = [];
    for (let i = 0; i < numOfAnswers; i++) {
      array.push({
        id: uuid(),
        text: "",
        correct: false,
      });
    }
    setAnswers(array);
  }, [numOfAnswers]);

  // console.log(answers);
  // console.log(questions);

  return (
    <div className="w-[90vw] h-[90vh] bg-secondary absolute top-1/2 left-1/2 transform  -translate-x-1/2 -translate-y-1/2 rounded-xl  overflow-y-auto">
      <CreateQuizHeader
        setCategory={setCategory}
        setDescription={setDescription}
        setName={setName}
        setTime={setTime}
        createQuizModal={createQuizModal}
        setCreateQuizModal={setCreateQuizModal}
      />
      <div className="flex justify-center mt-10">
        <div className="w-[90%] h-full flex flex-col bg-main items-center gap-4">
          <div className="text-xl flex gap-4  mt-8">
            <p className="text-white text-4xl ">Questions & Anwers</p>
            <p className="text-secondary text-4xl " onClick={addQuestion}>
              Add question:
            </p>
            <button className="text-secondary text-4xl " onClick={addQuestion}>
              +
            </button>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-gray-500 dark:text-gray-300 font-bold">Question </label>
            <div className="flex flex-col gap-4">
              <QuestionInfo
                setSelectedType={setSelectedType}
                selectedType={selectedType}
                setQuestionText={setQuestionText}
                handleCheckBoxChange={handleCheckBoxChange}
                setHint={setHint}
              />
              {selectedType === "Text" ? (
                <Input primary value={writtenAnswer} onChange={(event) => setWrittenAnswer(event.target.value)} />
              ) : (
                <AnswersConitainer answers={answers} setAnswers={setAnswers} selectedType={selectedType} />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-[4em] flex justify-center items-center pb-3">
        <Button onClick={handleAddQuiz} primary label="Create quiz" />
      </div>
    </div>
  );
};

export default CreateQuizModal;
