import React, { useState, Dispatch, SetStateAction, useEffect } from "react";
import { User } from "../models/User";
import { getQuizzes } from "../service/getQuizzes";
import { Quiz } from "../models/Quiz";

export const appContext = React.createContext<{
  user?: User | undefined | null;
  setUser?: Dispatch<SetStateAction<User | null>> | undefined;
  cardData?: Quiz[];
  quizes?: () => void;
  selectedCard?: Quiz;
  // eslint-disable-next-line no-unused-vars
  handleSelectQuiz?: (card: Quiz) => void;
}>({});

const AppProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);
  const [cardData, setCardData] = useState<Quiz[]>();
  const [selectedCard, setSelectedCard] = useState<Quiz>();

  const handleSelectQuiz = (card: Quiz) => {
    setSelectedCard(card);
    return undefined;
  };

  const quizes = async () => {
    const quiz = await getQuizzes();
    setCardData(quiz.data);
  };

  useEffect(() => {
    quizes();
  }, []);

  useEffect(() => {
    const user = localStorage.getItem("user");
    let parseUser;
    if (user !== null) {
      parseUser = JSON.parse(user);
      setUser(parseUser);
    }
  }, []);

  return <appContext.Provider value={{ user, setUser, cardData, quizes, selectedCard, handleSelectQuiz }}>{children}</appContext.Provider>;
};

export default AppProvider;
