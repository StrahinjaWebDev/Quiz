import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Input from "../components/Input";
import Button from "../components/Button";
import Flags from  '../images/Flags.png'
import Footbal from '../images/Football.png'
import Planet from '../images/Planet.png'
import { text } from "stream/consumers";

const Admin = () => {
  const [admin, setAdmin] = useState(false)
  const [activeBoard, setActiveBoard] = useState("Create");

  const handleActiveBoard = () => {
    setActiveBoard(activeBoard);
  };

  return (
    <>
      {admin === true && <Navbar label="Admin Navbar" showMailIcon={false}/>}
      {admin === true && 
      <div className="w-screen h-[90vh] justify-center items-center mt-12">
        <div className="flex justify-evenly items-center desktop:mb-12">
          <button className="text-white text-xl" style={{ color: activeBoard === "Create" ? "#FFC93C" : "white" }} onClick={(e) => setActiveBoard("Create")}>
            Create new quiz
          </button>
          <button style={{ color: activeBoard === "Edit" ? "#FFC93C" : "white" }} className=" text-white text-xl" onClick={(e) => setActiveBoard("Edit")}>
            Edit Users
          </button>
        </div>
        <div className="flex mt-12 tablet:mt-0 gap-3 items-center desktop:ml-12">
          {activeBoard === "Create" && <Button label="Create new quizz" secondary placeholder="" />}
          {activeBoard === "Edit" && <Button label="Add users" secondary placeholder="" />}
          <Input label="search quiz" placeholder="Search quiz..." primary />
        </div>
        {activeBoard === "Create" && (
          <div className="w-screen h-[50vh] flex justify-center items-center mt-12">
            <div className="w-[80vw] h-[100%] flex-col flex bg-secondary rounded-[60px] items-center">
              <div className="flex flex-row w-[80%] h-[10%] items-center justify-between mt-5">
                <p className="text-sm text-main med:text-xl">Football player quiz</p>
                <Button label="Edit" primary />
                <Button label="Delete" primary />
              </div>
            </div>
          </div>
        )}
        {activeBoard === "Edit" && (
          <div className="w-screen h-[50vh] flex justify-center items-center mt-12">
            <div className="w-[80vw] h-[100%] flex-col flex bg-secondary rounded-[60px] items-center">
              <div className="flex flex-row w-[80%] h-[10%] items-center justify-between mt-5">
                <p className="text-sm text-main med:text-xl">Email@gmail.com</p>
                <Button label="Edit" primary />
                <Button label="Delete" primary />
              </div>
            </div>
          </div>
        )}
      </div> }
      {admin === false && <Navbar label="User Navbar" showMailIcon={true}/>}
      {admin === false && <div className="w-screen h-[30vh] flex justify-center items-center">

        <div className="w-[90%] h-[100%]  grid grid-rows mt-[4em] gap-3 desktop:gap-3 tablet:grid-cols-3">
          <div className="grid grid-rows-3 bg-secondary rounded-[15px] h-[60%]">
            <img src={Flags} className="ml-4 pt-3 tablet:w-[90%] "  alt="" />
            <span className="flex justify-center text-2xl font-semibold pt-[4em]">Flag quiz</span>
            <p className="font-semibold pt-6">Test out your knowledge about football players in this new quiz!</p>
          </div>

          <div className="grid grid-rows-3 bg-secondary rounded-[15px] h-[60%]">
            <img src={Flags} className="ml-4 pt-3 tablet:w-[90%] "  alt="" />
            <span className="flex justify-center text-2xl font-semibold pt-[4em]">Flag quiz</span>
            <p className="font-semibold pt-6">Test out your knowledge about football players in this new quiz!</p>
          </div>
          <div className="grid grid-rows-3 bg-secondary rounded-[15px] h-[60%]">
            <img src={Flags} className="ml-4 pt-3 tablet:w-[90%] "  alt="" />
            <span className="flex justify-center text-2xl font-semibold pt-[4em]">Flag quiz</span>
            <p className="font-semibold pt-6">Test out your knowledge about football players in this new quiz!</p>
          </div>
         
        </div>


        </div>}
      
    </>
  );
};

      
export default Admin;
