import React, { useState, Dispatch, SetStateAction, useEffect } from "react";
import { User } from "../models/User";
import { getQuizzes } from "../service/getQuizzes";
import { Quizzes } from "../models/Quizzes";

export const appContext = React.createContext<{
  user?: User | undefined | null;
  setUser?: Dispatch<SetStateAction<User | null>>;
  cardData?: Quizzes[] | undefined;
  quizes?: () => void;
}>({});

const AppProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);
  const [cardData, setCardData] = useState<Quizzes[] | undefined>([]);

  const quizes = async () => {
    const quiz = await getQuizzes();
    setCardData(quiz.data);
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    let parseUser;
    if (user !== null) {
      parseUser = JSON.parse(user);
      setUser(parseUser);
    }
  }, []);

  return <appContext.Provider value={{ user, setUser, cardData, quizes }}>{children}</appContext.Provider>;
};

export default AppProvider;
