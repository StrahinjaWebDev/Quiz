import React, { useState, useContext, useEffect } from "react";
import Navbar from "../components/Navbar";
import Input from "../components/Input";
import Button from "../components/Button";
import { appContext } from "../context/AppProvider";
import UserPreQuiz from "./Quiz";
import { getQuizzes } from "../service/getQuizzes";
import { getUsers } from "../service/getUser";
import { deleteUser } from "../service/deleteUser";

const Admin = ({ admin }: any) => {
  const [activeBoard, setActiveBoard] = useState("Create");
  const [labelText, setLabelText] = useState("Active");
  const [active, setActive] = useState(false);
  const [quizz, setQuizz] = useState([]);
  const [user, setUser] = useState([]);

  const { cardData, quizes, handleSelectQuiz = () => {}, selectedCard } = useContext(appContext);

  const handleActivateClick = () => {
    setActive(!active);
    if (active === false) {
      setLabelText("Deactive");
    } else {
      setLabelText("Active");
    }
  };
  const users = async () => {
    const user = await getUsers();
    setUser(user.data);
  };

  const quiz = async () => {
    const quiz = await getQuizzes();
    setQuizz(quiz.data);
  };

  useEffect(() => {
    quiz?.();
  }, []);

  useEffect(() => {
    users?.();
  }, []);

  // console.log(quizz);
  console.log(user);

  return (
    <>
      {admin === true && <Navbar showMailIcon={false} />}
      {admin === true && (
        <div className="w-screen min-h-[70vh] justify-center items-center mt-1">
          <div className="flex justify-evenly items-center desktop:mb-12">
            <button
              className="text-white text-xl"
              style={{ color: activeBoard === "Create" ? "#FFC93C" : "white" }}
              onClick={() => setActiveBoard("Create")}
            >
              Create quiz
            </button>
            <button
              style={{ color: activeBoard === "Edit" ? "#FFC93C" : "white" }}
              className="text-white text-xl"
              onClick={() => setActiveBoard("Edit")}
            >
              Edit Users
            </button>
          </div>
          <div className="flex mt-12 tablet:mt-0 gap-3 items-center desktop:ml-12">
            {activeBoard === "Create" && <Button label="Create quiz" secondary />}
            {activeBoard === "Edit" && <Button label="Add users" secondary />}
            <Input placeholder="Search quiz..." primary />
          </div>
          {activeBoard === "Create" && (
            <div className="w-screen h-[50vh] flex justify-center items-center mt-3 overflow-y-auto">
              <div className="w-[80vw] h-[100%] flex-col flex bg-secondary rounded-[60px] items-center">
                {quizz.map((quiz) => (
                  <div key={quiz.id} className="flex flex-row w-[80%] h-[10%] items-center justify-between mt-5">
                    <p className="text-sm text-main med:text-xl w-[30%]">{quiz.name}</p>
                    <Button label="Edit" primary />
                    <Button label="Delete" primary />
                    <Button label={labelText} onClick={handleActivateClick} primary></Button>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeBoard === "Edit" && (
            <div className="w-screen h-[50vh] flex justify-center items-center mt-3 overflow-y-auto">
              <div className="w-[80vw] h-[100%] flex-col flex bg-secondary rounded-[60px] items-center">
                {user.map((user) => (
                  <div key={user.id} className="flex flex-row w-[80%] h-[10%] items-center justify-between mt-5">
                    <p className="text-sm text-main med:text-xl w-[30%]">{user.username}</p>
                    <Button label="Edit" primary />
                    {/* <Button label="Delete" primary onClick={deleteUser(user.id)} /> */}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      {admin === false && <Navbar showMailIcon={true} />}
      {admin === false && (
        <div className="w-screen flex justify-center items-center">
          {!selectedCard ? (
            <div className="w-[80%] h-[100%] grid justify-between mt-[4em] gap-3 grid-cols-3 ">
              {cardData?.map((card) => (
                <button key={card.id} onClick={() => handleSelectQuiz(card)}>
                  <div className="h-[12em] w-[100%] justify-around items-center bg-secondary rounded-[15px] flex flex-col">
                    <span className="text-2xl">{card.name}</span>
                    <p className="text-sm">{card.description}</p>
                    <span>Time to finish the quiz: {card.time}</span>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <UserPreQuiz
              label={selectedCard.label}
              images={selectedCard.images}
              imgAlt={selectedCard.imgAlt}
              quizMainText={selectedCard.quizMainText}
              quizDescription={selectedCard.quizDescription}
              selectedCard={selectedCard}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Admin;
