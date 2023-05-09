import React, { useState, useEffect } from "react";
import { getQuizzes } from "../service/getQuizzes";
import Button from "../components/Button";
import Instruction from "../components/Instruction";
import { getQuestions } from "../service/getQuestions";
import { BsLightbulb } from "react-icons/bs";
import { FaStarHalfAlt } from "react-icons/fa";
import { Questions } from "../models/Question";
import Input from "../components/Input";

const UserPreQuiz = ({ selectedCard }: any) => {
  const [startQuiz, setStartQuiz] = useState(false);
  const [question, setQuestion] = useState<Questions[]>([]);
  const [checks, setChecks] = useState<string[] | []>([]);
  const [hint, setHint] = useState("");
  const [inputValue, setInputValue] = useState("");
  // const [showHalfAnswer, setShowHalfAnswer] = useState(false);
  // const [halfAnswer, setHalfAnswer] = useState("");
  // const [selectedQuestionId, setSelectedQuestionId] = useState(null);

  useEffect(() => {
    quizes();
  }, []);

  useEffect(() => {
    questions();
  }, []);

  const quizes = async () => {
    // eslint-disable-next-line no-unused-vars
    const quiz = await getQuizzes();
  };

  const questions = async () => {
    const question = await getQuestions(selectedCard.id);
    setQuestion(question.data?.questions);
  };

  const handleStartQuiz = () => {
    setStartQuiz(!startQuiz);
  };

  const handleShowHint = (questionId: string) => {
    if (!hint) {
      setHint(questionId);
    }
  };

  const handleCheckQuestion = (answer: string) => {
    if (checks.includes(answer)) {
      setChecks((prev) => prev.filter((val) => val !== answer));
    } else {
      setChecks((prev) => [...prev, answer]);
    }
  };

  const handleInputSubmit = () => {
    setChecks((prev) => [...prev, inputValue]);
    setInputValue("");
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
          {question &&
            question.map((question: Questions) => (
              <div className="flex justify-center items-center h-[18em] w-[40em] bg-secondary" key={question.id}>
                <div className="w-[80%] h-[80%]">
                  <div className="w-[100%] h-[25%]">
                    <p className="text-2xl font-semibold">{selectedCard.name}</p>
                  </div>
                  <div className="w-[100%] h-[75%] bg-white">
                    <div className="h-[30%] w-[100%] flex justify-around pt-2">
                      <p className="text-xl font-semibold">{question.text}</p>
                      <div className="flex gap-4 ">
                        <button>
                          <BsLightbulb onClick={() => handleShowHint(question.id)} size={"1.7em"} />
                        </button>
                        <button>
                          {" "}
                          <FaStarHalfAlt size={"1.7em"} />
                        </button>

                        {hint === question.id && <p className="text-sm">{question.hint}</p>}
                      </div>
                    </div>
                    <div className="h-[65%] w[100%]  grid grid-cols-2 gap-2">
                      {question.answers.map((answer: Questions) => {
                        return (
                          <div className="pl-12 flex" key={answer.id}>
                            {question.type === "multi" && (
                              <button
                                style={checks.includes(answer.text) ? { border: "2px solid red" } : {}}
                                onClick={() => handleCheckQuestion(answer.text)}
                                className="w-[90%] flex text-sm  justify-center items-center border-dotted border-black border-2"
                              >
                                {answer.text}
                              </button>
                            )}
                            {question.type === "text" && (
                              <div className="flex">
                                <Input
                                  primary
                                  placeholder="Type in your answer"
                                  value={inputValue}
                                  onChange={(e) => setInputValue(e.target.value)}
                                />

                                <button onClick={handleInputSubmit} className="border-2 border-black border-dotted h-1/3">
                                  Submit
                                </button>
                              </div>
                            )}
                            {question.type === "single" && (
                              <button
                                style={checks.includes(answer.text) ? { border: "2px solid red" } : {}}
                                onClick={() => handleCheckQuestion(answer.text)}
                                className="w-[90%] flex text-sm justify-center items-center border-dotted border-black border-2"
                              >
                                {answer.text}
                              </button>
                            )}
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
