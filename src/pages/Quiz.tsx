import React, { useState, useEffect } from "react";
import { getQuizzes } from "../service/getQuizzes";
import Button from "../components/Button";
import Instruction from "../components/Instruction";
import { getQuestions } from "../service/getQuestions";
import { BsLightbulb } from "react-icons/bs";
import { FaStarHalfAlt } from "react-icons/fa";
import { Questions } from "../models/Questions";

const UserPreQuiz = ({ selectedCard }: any) => {
  const [startQuiz, setStartQuiz] = useState(false);
  const [question, setQuestion] = useState<{ data?: Questions[] }>({});

  const quizes = async () => {
    const quiz = await getQuizzes();
  };

  const questions = async () => {
    const question = await getQuestions(selectedCard.id);
    setQuestion(question.data.questions);
  };
  console.log(question);

  useEffect(() => {
    quizes();
  }, []);

  useEffect(() => {
    questions();
  }, []);

  const handleStartQuiz = () => {
    setStartQuiz(!startQuiz);
  };

  return (
    <>
      {!startQuiz && (
        <div
          key={selectedCard.id}
          className="h-[25em] w-[40em] juctify-center items-center bg-secondary rounded-[15px] flex flex-col justify-around"
        >
          <Instruction />
          <h1 className="text-3xl">{selectedCard.name}</h1>
          <p className="text-base">{selectedCard.description}</p>
          <span className="text-xl">Time to finish the quiz: {selectedCard.time}</span>
          <Button primary label="Start" onClick={handleStartQuiz}></Button>
          <Button secondary label="Back to quizzies"></Button>
        </div>
      )}
      {startQuiz && (
        <div className="flex flex-col gap-12 min-h-[100vh] mt-12">
          {question.map((question) => (
            <div className="flex justify-center items-center h-[14em] w-[40em] bg-secondary" key={question.id}>
              <div className="w-[80%] h-[80%]">
                <div className="w-[100%] h-[25%]">
                  <p className="text-2xl font-semibold">{selectedCard.name}</p>
                </div>
                <div className="w-[100%] h-[75%] bg-white">
                  <div className="h-[30%] w-[100%] flex justify-around pt-2">
                    <p className="text-xl font-semibold">{question.text}</p>
                    <div className="flex gap-4 ">
                      <button>
                        <BsLightbulb size={"1.7em"} />
                      </button>
                      <button>
                        <FaStarHalfAlt size={"1.7em"} />
                      </button>
                    </div>
                  </div>
                  <div className="h-[70%] w[100%]  grid grid-cols-2">
                    {question.answers.map((answer) => {
                      return (
                        <div className="pl-12" key={answer.id}>
                          <p className="w-[30%]">{answer.text}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default UserPreQuiz;
