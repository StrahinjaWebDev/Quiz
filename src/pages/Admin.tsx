import React, { useState, useContext, useEffect } from "react";
import Navbar from "../components/Navbar";
import Input from "../components/Input";
import Button from "../components/Button";
import AdminMainComponent from "../components/AdminMainComponent";
import { appContext } from "../context/AppProvider";
import UserPreQuiz from "./Quiz";

const Admin = ({ admin }: any) => {
  const [activeBoard, setActiveBoard] = useState("Create");

  const { cardData, quizes, handleSelectQuiz = () => {}, selectedCard } = useContext(appContext);

  useEffect(() => {
    quizes();
  }, []);

  return (
    <>
      {admin === true && <Navbar showMailIcon={false} />}
      {admin === true && (
        <div className="w-screen h-[90vh] justify-center items-center mt-12">
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
            <div className="w-screen h-[50vh] flex justify-center items-center mt-3">
              <AdminMainComponent text={"Football quiz"} ActivateDeactivateBtn={true} />
            </div>
          )}
          {activeBoard === "Edit" && (
            <div className="w-screen h-[50vh] flex justify-center items-center mt-3">
              <AdminMainComponent text={"johnjohnson@gmail.com"} />
            </div>
          )}
        </div>
      )}
      {admin === false && <Navbar showMailIcon={true} />}
      {admin === false && (
        <div className="w-screen flex justify-center items-center">
          {!selectedCard ? (
            <div className="w-[80%] h-[100%] grid justify-between mt-[4em] desktop:gap-3 grid-cols-3">
              {cardData?.map((card) => (
                <button key={card.id} onClick={() => handleSelectQuiz(card)}>
                  <div className="h-[12em] w-[20em] justify-around items-center bg-secondary rounded-[15px] flex flex-col">
                    <span>{card.name}</span>
                    <p>{card.description}</p>
                    <span>{card.time}</span>
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
