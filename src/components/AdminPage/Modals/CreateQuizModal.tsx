import React, { useState, useEffect } from "react";
import Button from "../../ReusableComponents/Button";
import { postQuizzes } from "../../../service/postQuestions";
import CreateQuizHeader from "../CreateQuizHeader";
import AnswersConitainer from "../AnswersConitainer";
import QuestionInfo from "../QuestionInfo";
import { v4 as uuid } from "uuid";
import Input from "../../ReusableComponents/Input";
import { Question } from "../../../models/Question";
import { Answers } from "../../../models/Answers";
import { Quiz } from "../../../models/Quiz";
import AreYouSureModal from "../../ReusableComponents/AreYouSureModal";

interface Props {
  answersDropdown: boolean;
  questionTypeDropdown: boolean;
  selectedNumberOfAnswers: string;
  selectedQuestionType: string;
  setAnswersDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  setQuestionTypeDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  createQuizModal: boolean;
  // eslint-disable-next-line no-unused-vars
  setCreateQuizModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateQuizModal = ({ setCreateQuizModal }: Props) => {
  const [, setQuizzes] = useState<Quiz[] | []>([]);
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
  const [addQuestionModal, setAddQuestionModal] = useState(false);
  const [numOfQuestions, setNumOfQuestions] = useState(0);
  const [addQuizModal, setAddQuizModal] = useState(false);

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
        setAddQuizModal(!addQuizModal);
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

    console.log(validation(newQuestion));
    if (validation(newQuestion)) {
      setQuestions((prev) => [...prev, newQuestion]);
      setNumOfQuestions((prev) => prev + 1);
      setAddQuestionModal(false);
      clearAll();
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

    if (
      question.text === "" ||
      question.hint === "" ||
      question.type === "" ||
      (selectedType !== "Text" ? question.answers.length === 0 : false)
    ) {
      isValid = false;
    }

    question.answers.forEach((answer) => {
      if (answer.text === "") {
        isValid = false;
      }
    });

    let hasCorrectAnswer = question.answers.some((answer) => answer.correct === true);

    if (selectedType !== "Text") if (!hasCorrectAnswer) isValid = false;
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

  return (
    <div className="w-[90vw] h-[90vh] bg-secondary absolute top-1/2 left-1/2 transform  -translate-x-1/2 -translate-y-1/2 rounded-xl  overflow-y-auto">
      <CreateQuizHeader
        setCategory={setCategory}
        setDescription={setDescription}
        setName={setName}
        setTime={setTime}
        setCreateQuizModal={setCreateQuizModal}
      />
      <div className="flex justify-center mt-10">
        <div className="w-[90%] h-full flex flex-col bg-main items-center gap-4">
          <div className="text-xl flex gap-4  mt-8">
            <p className="text-white text-4xl ">Questions & Anwers</p>
            <p className="text-secondary text-4xl " onClick={addQuestion}>
              Add question:
            </p>
            <button className="text-secondary text-4xl " onClick={() => setAddQuestionModal(true)}>
              +
            </button>
            {addQuestionModal && (
              <AreYouSureModal
                message="Are you sure you want to add question?"
                onConfirm={addQuestion}
                onCancel={() => setAddQuestionModal(!addQuestionModal)}
              />
            )}
          </div>
          <div className="flex flex-col gap-2 items-center">
            <label className="text-gray-500 dark:text-gray-300 font-bold text-2xl">Question ({numOfQuestions})</label>
            <div className="flex flex-col gap-4">
              <QuestionInfo
                setSelectedType={setSelectedType}
                selectedType={selectedType}
                setQuestionText={setQuestionText}
                handleCheckBoxChange={handleCheckBoxChange}
                setHint={setHint}
                questionText={questionText}
                hint={hint}
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
        <Button onClick={() => setAddQuizModal(!addQuizModal)} primary label="Create quiz" />
        {addQuizModal && (
          <AreYouSureModal
            message="Are you sure you want to add a quiz?"
            onConfirm={handleAddQuiz}
            onCancel={() => setAddQuizModal(!addQuizModal)}
          />
        )}
      </div>
    </div>
  );
};

export default CreateQuizModal;
