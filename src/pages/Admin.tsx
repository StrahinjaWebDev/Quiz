import React, { useState, useContext } from "react";
import Navbar from "../components/Navbar";
import Input from "../components/Input";
import Button from "../components/Button";
import Flags from "../images/Flags.png";
import Footbal from "../images/Football.png";
import Planet from "../images/Planet.png";
import Card from "../components/Card";
import AdminMainComponent from "../components/AdminMainComponent";
import { appContext } from "../context/AppProvider";

const Admin = ({ admin }: any) => {
  const [activeBoard, setActiveBoard] = useState("Create");

  const { user } = useContext(appContext);

  const cardData = {
    cards: [
      {
        label: "Football",
        images: Footbal,
        imgAlt: "Footbal",
        quizMainText: "Football",
        quizDescription:
          "In a fast-paced football showdown, two teams went head-to-head, displaying their skills and tactics on the field.",
        onClick: "handleCardClick('Football')",
      },
      {
        label: "Flag",
        images: Flags,
        imgAlt: "Footbal",
        quizMainText: "Flag",
        quizDescription:
          "In a fast-paced football showdown, two teams went head-to-head, displaying their skills and tactics on the field.",
      },
      {
        label: "planet",
        images: Planet,
        imgAlt: "Footbal",
        quizMainText: "Planet",
        quizDescription:
          "In a fast-paced football showdown, two teams went head-to-head, displaying their skills and tactics on the field.",
      },
    ],
  };

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
              className=" text-white text-xl"
              onClick={() => setActiveBoard("Edit")}
            >
              Edit Users
            </button>
          </div>
          <div className="flex mt-12 tablet:mt-0 gap-3 items-center desktop:ml-12">
            {activeBoard === "Create" && <Button label="Create quizz" secondary />}
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
        <div className="w-screen flex justify-center items-center ">
          <div className="w-[80%] h-[100%]  grid grid-cols-3  grid-rows-3 justify-between mt-[4em] desktop:gap-3 tablet:grid-cols-3">
            {cardData.cards.map((card, index) => (
              <Card
                key={index}
                label={card.label}
                images={card.images}
                imgAlt={card.imgAlt}
                quizMainText={card.quizMainText}
                quizDescription={card.quizDescription}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Admin;
