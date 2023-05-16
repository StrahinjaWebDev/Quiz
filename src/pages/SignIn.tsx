import React, { useState, useContext } from "react";
import { appContext } from "../context/AppProvider";
import Button from "../components/ReusableComponents/Button";
import Input from "../components/ReusableComponents/Input";
import { BsPatchQuestionFill } from "react-icons/bs";
import axios from "axios";

interface Props {
  onGuestClick: () => void;
}

const SignIn = ({ onGuestClick }: Props) => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState(false);

  const { setUser } = useContext(appContext);

  const HandleSignIn = async () => {
    try {
      const response = await axios.post("https://quizzywebapi.azurewebsites.net/api/users/login", { username, password });
      if (response.status === 200) {
        setUser?.(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
      }
    } catch {
      setError(!error);
    }
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    if (error) {
      setError(false);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (error) {
      setError(false);
    }
  };

  return (
    <>
      <div className="w-screen h-[96vh] flex justify-center items-center flex-col gap-10 tablet:gap-12">
        <h1 className=" text-6xl flex gap-6 text-secondary">
          <BsPatchQuestionFill />
          Quizzy
          <BsPatchQuestionFill />
        </h1>
        <div className="w-[24em] tablet:w-[38em] h-[24.7em] tablet:h-[27em] bg-secondary rounded-[60px] flex flex-col items-center gap-6 justify-center ">
          <h1 className="pl-3 tablet:pl-0 text-main text-4xl pb-12 font-semibold">Number 1. online quiz in the world</h1>
          <Input onChange={handleUsernameChange} value={username} primary placeholder="Enter username..." />
          <Input type="password" onChange={handlePasswordChange} value={password} primary placeholder="Enter a password..." />
          {error && (
            <div className="flex flex-col gap-2 items-center justify-center h-[2em]">
              <p className="text-red-500 text-[1em] font-medium">Wrong username or password!</p>
              <p className="text-red-500 text-[0.85em] font-medium"> Please try again</p>
            </div>
          )}
          <Button onClick={HandleSignIn} label="Sign In" primary />
          <button onClick={onGuestClick} className="text-main font-semibold">
            Continue as guest
          </button>
        </div>
      </div>
    </>
  );
};

export default SignIn;
