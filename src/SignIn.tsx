import React, { useEffect, useState } from "react";
import Button from "./components/Button";
import Input from "./components/Input";
import { BsPatchQuestionFill } from "react-icons/bs";
import axios from "axios";

const SignIn = () => {
  //   const getUsers = () => {
  //     axios.get('https://quizzywebapi.azurewebsites.net/api/Users/Test/Test')
  //     .then(res => {
  //       console.log(res.data)
  //     })
  //     .catch(err => {
  //       console.error(err)
  //     })
  //   }

  //  useEffect(() => {
  //    getUsers()
  //  }, [])

  return (
    <div className="w-screen h-[100vh] flex justify-center items-center flex-col gap-10 tablet:gap-12">
      <h1 className=" text-6xl flex gap-6 text-secondary">
        <BsPatchQuestionFill />
        Quizzy
        <BsPatchQuestionFill />
      </h1>
      <div className="w-[24em] tablet:w-[38em] h-[24.7em] tablet:h-[27em] bg-secondary rounded-[60px] flex flex-col items-center gap-6 justify-center ">
        <h1 className="pl-3 tablet:pl-0 text-main text-4xl pb-12 font-semibold">Number 1. online quiz in the world</h1>
        <Input label="username" primary placeholder="Enter username..." />
        <Input label="password" primary placeholder="Enter a password..." />
        <Button label="Sign In" primary />
        <button className="text-main font-semibold">Continue as guest</button>
      </div>
    </div>
  );
};

export default SignIn;
