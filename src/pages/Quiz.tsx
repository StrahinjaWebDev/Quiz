import React, { useState, useEffect, useContext } from "react";
import Button from "../components/ReusableComponents/Button";
import Instruction from "../components/QuizPage/Instruction";
import { getQuestions } from "../service/getQuestions";
import { BsLightbulb } from "react-icons/bs";
import { FaStarHalfAlt } from "react-icons/fa";
import { Question } from "../models/Question";
import { appContext } from "../context/AppProvider";
import { Answers } from "../models/Answers";
import QuestionTypes from "../components/QuizPage/QuestionTypes";
import End from "./End";
import axios from "axios";

const UserPreQuiz = ({ selectedCard }: any) => {
  const [startQuiz, setStartQuiz] = useState(false);
  const [question, setQuestion] = useState<Question[]>([]);
  const [checkedAnswers, setCheckedAnswers] = useState<Answers[] | []>([]);
  const [hint, setHint] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [finishQuiz, setFinishQuiz] = useState(false);
  const [score, setScore] = useState(0);
  const [seconds, setSeconds] = useState(selectedCard.time);
  const [isHelpUsed, setIsHelpUsed] = useState(false);

  const { setSelectedCard, user } = useContext(appContext);

  const questions = async () => {
    const question = await getQuestions(selectedCard.id);
    setQuestion(question.data?.questions);
  };

  const handleShowHint = (questionId: string) => {
    if (!hint) {
      setHint(questionId);
    }
  };

  const handleCheckedAnswer = (answer: string, id: string, questionId: string, correct: boolean, type: string) => {
    const checkedAnswer: Answers = {
      id: id,
      questionId: questionId,
      text: answer,
      correct: correct,
    };
    if (answer) {
      if (type === "Single") {
        setCheckedAnswers((prev) => prev.filter((question) => question.questionId !== questionId));
      }

      if (checkedAnswers.find((question) => question.id === id)) {
        setCheckedAnswers((prev) => prev.filter((question) => question.id !== id));
      } else {
        setCheckedAnswers((prev) => [...prev, checkedAnswer]);
      }
    }
  };

  const handleEndQuiz = async () => {
    try {
      const response = await axios.post(`https://quizzywebapi.azurewebsites.net/api/quizzes/ended`, checkedAnswers, {
        params: { quizId: selectedCard.id, userId: user?.id },
      });
      setScore(response.data);
      setFinishQuiz(true);
      return response;
    } catch (error) {
      return error;
    }
  };

  const handleInputSubmit = () => {
    setCheckedAnswers((prev) => [...prev, inputValue]);
    setInputValue("");
  };

  const useHalfHelp = () => {
    setIsHelpUsed(true);
  };

  useEffect(() => {
    questions();
  }, []);

  useEffect(() => {
    if (startQuiz === true) {
      const interval = setInterval(() => {
        setSeconds((prevSeconds: number) => prevSeconds - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [startQuiz]);

  useEffect(() => {
    if (seconds === 0) {
      handleEndQuiz();
    }
  }, [seconds]);

  const formatTime = (seconds: number) => {
    let minutes = Math.floor(seconds / 60);
    let extraSeconds = Number(seconds % 60);
    minutes = minutes < 10 ? 0 + minutes : minutes;
    extraSeconds = extraSeconds < 10 ? 0 + extraSeconds : extraSeconds;

    return `${minutes}:${extraSeconds}`;
  };

  return (
    <>
      {!finishQuiz ? (
        !startQuiz ? (
          <div key={selectedCard.id} className="h-[25em] w-[40em]  items-center bg-secondary rounded-[15px] flex flex-col justify-around">
            <Instruction />
            <h1 className="text-3xl font-bold">{selectedCard.name}</h1>
            <p className="text-base font-medium">{selectedCard.description}</p>
            <span className="text-xl font-light">Time to finish the quiz: {formatTime(seconds)}</span>
            <Button primary label="Start" onClick={() => setStartQuiz(!startQuiz)} />
            <Button onClick={() => setSelectedCard && setSelectedCard(!selectedCard)} secondary label="Go back" />
          </div>
        ) : (
          <div className="flex flex-col gap-12 min-h-[100vh] mt-12 items-center overflow-y-auto">
            <p className="flex justify-center items-center text-secondary text-3xl font-bold">Your time left is {formatTime(seconds)} </p>
            {question &&
              question.map((question: Question) => (
                <div className="flex justify-center items-center h-[18em] w-[40em] bg-secondary " key={question.id}>
                  <div className="w-[80%] h-[80%]">
                    <div className="w-[100%] h-[25%]">
                      <p className="text-2xl font-semibold">{selectedCard.name}</p>
                    </div>
                    <div className="w-[100%] h-[80%] flex flex-col justify-between bg-white items-center">
                      <div className="h-[30%] w-[100%] flex justify-around pt-2">
                        <p className="text-xl font-semibold">{question.text}</p>
                        <div className="flex gap-4 ">
                          <button>
                            <BsLightbulb onClick={() => handleShowHint(question.id)} size={"1.7em"} />
                          </button>
                          {/* <button>
                            <FaStarHalfAlt size={"1.7em"} onClick={() => useHalfHelp()} />
                          </button> */}

                          {hint === question.id && <p className="text-sm">{question.hint}</p>}
                        </div>
                      </div>
                      <div className="h-[65%] w[100%]  grid grid-cols-3 gap-2">
                        <QuestionTypes
                          question={question}
                          handleCheckedAnswer={handleCheckedAnswer}
                          inputValue={inputValue}
                          handleInputSubmit={handleInputSubmit}
                          setInputValue={setInputValue}
                          checkedAnswers={checkedAnswers}
                          isHelpUsed={isHelpUsed}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            <Button secondary label="End quiz" onClick={handleEndQuiz} />
          </div>
        )
      ) : (
        <End score={score} />
      )}
    </>
  );
};

export default UserPreQuiz;
