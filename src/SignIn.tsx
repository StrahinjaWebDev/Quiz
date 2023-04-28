import React, { useEffect, useState, createContext, Dispatch, SetStateAction, useContext } from "react";
import { appContext } from "./context/AppProvider";
import Button from "./components/Button";
import Input from "./components/Input";
import { BsPatchQuestionFill } from "react-icons/bs";
import axios from "axios";

const SignIn = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const { user, setUser } = useContext(appContext);

  const HandleSignIn = async () => {
    try {
      const response = await axios.post("https://quizzywebapi.azurewebsites.net/api/users/login", { username, password });
      if (response.status === 200) {
        setUser?.(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };

  return (
    <>
      <div className="w-screen h-[100vh] flex justify-center items-center flex-col gap-10 tablet:gap-12">
        <h1 className=" text-6xl flex gap-6 text-secondary">
          <BsPatchQuestionFill />
          Quizzy
          <BsPatchQuestionFill />
        </h1>
        <div className="w-[24em] tablet:w-[38em] h-[24.7em] tablet:h-[27em] bg-secondary rounded-[60px] flex flex-col items-center gap-6 justify-center ">
          <h1 className="pl-3 tablet:pl-0 text-main text-4xl pb-12 font-semibold">Number 1. online quiz in the world</h1>
          <Input onChange={(e) => setUsername(e.target.value)} value={username} primary placeholder="Enter username..." />
          <Input onChange={(e) => setPassword(e.target.value)} value={password} primary placeholder="Enter a password..." />
          <Button onClick={HandleSignIn} label="Sign In" primary />
          <button className="text-main font-semibold">Continue as guest</button>
        </div>
      </div>
      )
    </>
  );
};

export default SignIn;
