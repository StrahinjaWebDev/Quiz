import React, { useState } from "react";
import Input from "../Input";
import AnswersDropdown from "../dropdowns/AnswersDropdown";
import QuestionTypeDropdown from "../dropdowns/QuestionTypeDropdown";

interface Props {
  selectedQuestionType: string;
  questionTypeDropdown: boolean;
  selectedNumberOfAnswers: string;
  answersDropdown: boolean;
  setQuestionTypeDropdown: (isOpen: boolean) => void;
  setAnswersDropdown: (isOpen: boolean) => void;
  selectedTypeOfQuestion: string;
  setSelectedQuestionType: (type: string) => void;
}

const CreateQuizModal = ({
  selectedQuestionType,
  questionTypeDropdown,
  selectedNumberOfAnswers,
  answersDropdown,
  setQuestionTypeDropdown,
  setAnswersDropdown,
  selectedTypeOfQuestion,
  setSelectedQuestionType,
}: Props) => {
  const [numOfQuestions, setNumOfQuestions] = useState(1);
  const [questionType, setQuestionType] = useState("question");
  const [answerType, setAnswerType] = useState("answer");
  const [quizName, setQuizName] = useState("");
  const [quizTime, setQuizTime] = useState(0);
  const [quizCategory, setQuizCategory] = useState("");
  const [quizDescription, setQuizDescription] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [quizQuestion, setQuizQuestion] = useState("");
  const [quizHint, setQuizHint] = useState("");
  const [answer, setAnswer] = useState<string[]>([]);

  const addQuestion = () => {
    setNumOfQuestions(numOfQuestions + 1);
  };

  console.log(answer);

  return (
    <div className="w-[90vw] h-[90vh] bg-secondary absolute top-1/2 left-1/2 transform  -translate-x-1/2 -translate-y-1/2 rounded-xl  overflow-y-auto">
      <div className="flex flex-col ml-12 mt-8 gap-4">
        <p>General Information</p>
        <Input primary placeholder="Quiz name..." onChange={(event) => setQuizName(event.target.value)} />
        <Input primary placeholder="Quiz time..." onChange={(event) => setQuizTime(event.target.value)} />
        <Input primary placeholder="Quiz category..." onChange={(event) => setQuizCategory(event.target.value)} />
        <textarea
          className="block p-2.5 w-2/3 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Quiz description..."
          onChange={(event) => setQuizDescription(event.target.value)}
        ></textarea>
      </div>
      <div className="flex justify-center mt-10">
        <div className="w-[90%] h-full flex flex-col bg-main items-center gap-4">
          <div className="text-xl flex gap-4  mt-8">
            <p>Questions & Anwers</p>
            <button onClick={addQuestion}>+</button>
          </div>
          {[...Array(numOfQuestions)].map((_, id) => (
            <div key={id} className="flex flex-col gap-2">
              <label htmlFor={`Question-${id}`} className="text-gray-500 dark:text-gray-300 font-bold">
                Question {id + 1}
              </label>
              <input type="text" className="border rounded-lg py-2 px-3 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200" />
              <div className="flex flex-col gap-4">
                <button
                  className="bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                  onClick={() => setQuestionType("question")}
                >
                  Question type
                </button>
                {questionType && <QuestionTypeDropdown setSelectedType={setSelectedType} selectedType={selectedType} />}
                <button
                  className="bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                  onClick={() => setAnswerType("answer")}
                >
                  Number of answers
                </button>
                {answerType && (
                  <AnswersDropdown
                    selectedType={selectedType}
                    setAnswer={setAnswer}
                    setQuizQuestion={setQuizQuestion}
                    setQuizHint={setQuizHint}
                    answer={answer}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreateQuizModal;
