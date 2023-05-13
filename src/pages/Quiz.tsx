import React, { useState, useEffect, useContext } from "react";
import Button from "../components/ReusableComponents/Button";
import Instruction from "../components/QuizPage/Instruction";
import { getQuestions } from "../service/getQuestions";
import { BsLightbulb } from "react-icons/bs";
import { FaStarHalfAlt } from "react-icons/fa";
import { Question } from "../models/Question";
import Input from "../components/ReusableComponents/Input";
import { appContext } from "../context/AppProvider";
import { Answers } from "../models/Answers";
import { endQuiz } from "../service/endQuiz";

const UserPreQuiz = ({ selectedCard }: any) => {
  const [startQuiz, setStartQuiz] = useState(false);
  const [question, setQuestion] = useState<Question[]>([]);
  const [checkedAnswers, setCheckedAnswers] = useState<Answers[] | []>([]);
  const [hint, setHint] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [highlightedAnswerId, setHighlightedAnswerId] = useState("");

  const { quizes } = useContext(appContext);

  const questions = async () => {
    const question = await getQuestions(selectedCard.id);
    setQuestion(question.data?.questions);
  };

  const handleShowHint = (questionId: string) => {
    if (!hint) {
      setHint(questionId);
    }
  };

  const handleCheckedAnswer = (answer: string, id: string, questionId: string, correct: boolean) => {
    const checkedAnswer: Answers = {
      id: id,
      questionId: questionId,
      text: answer,
      correct: correct,
    };

    if (checkedAnswers.find((question) => question.id === id)) {
      setCheckedAnswers((prev) => prev.filter((question) => question.id !== id));
      setHighlightedAnswerId((prev) => prev.filter((answerId) => answerId !== id));
    } else {
      setCheckedAnswers((prev) => [...prev, checkedAnswer]);
      setHighlightedAnswerId((prev) => [...prev, id]);
    }
  };

  const handleInputSubmit = () => {
    setCheckedAnswers((prev) => [...prev, inputValue]);
    setInputValue("");
  };

  const handleEndQuiz = () => {
    endQuiz(checkedAnswers).then((res) => {
      if (res.success) {
        alert("sent");
      } else {
        alert(res.error);
      }
    });
  };

  useEffect(() => {
    quizes?.();
  }, []);

  useEffect(() => {
    questions();
  }, []);

  console.log(checkedAnswers);
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
          <Button primary label="Start" onClick={() => setStartQuiz(!startQuiz)}></Button>
          <Button secondary label="Back to quizzies"></Button>
        </div>
      )}
      {startQuiz && (
        <div className="flex flex-col gap-12 min-h-[100vh] mt-12">
          {question &&
            question.map((question: Question) => (
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
                          <FaStarHalfAlt size={"1.7em"} />
                        </button>

                        {hint === question.id && <p className="text-sm">{question.hint}</p>}
                      </div>
                    </div>
                    <div className="h-[65%] w[100%]  grid grid-cols-2 gap-2">
                      {question.answers.map((answer: Answers) => {
                        return (
                          <div className="pl-12 flex" key={answer.id}>
                            {question.type.toLowerCase() === "multiple" && (
                              <button
                                onClick={() => handleCheckedAnswer(answer.text, answer.id, answer.questionId, answer.correct)}
                                className={`w-[90%] flex text-sm  justify-center items-center border-dotted border-black border-2 ${
                                  highlightedAnswerId.includes(answer.id) ? "border-red-500" : ""
                                }`}
                              >
                                {answer.text}
                              </button>
                            )}
                            {question.type.toLowerCase() === "text" && (
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
                            {question.type.toLowerCase() === "single" && (
                              <button
                                onClick={() => handleCheckedAnswer(answer.text, answer.id, answer.questionId, answer.correct)}
                                className={`w-[90%] flex text-sm  justify-center items-center border-dotted border-black border-2 ${
                                  highlightedAnswerId.includes(answer.id) ? "border-red-500" : ""
                                }`}
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
          <Button secondary label="End quiz" onClick={handleEndQuiz} />
        </div>
      )}
    </>
  );
};

export default UserPreQuiz;
