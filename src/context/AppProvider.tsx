import React, { useState, Dispatch, SetStateAction, useEffect } from "react";
import { User } from "../models/User";
import { getQuizzes } from "../service/getQuizzes";
import { Quizzes } from "../models/Quizzes";
import { SelectedCard } from "../models/SelectedCard";

export const appContext = React.createContext<{
  user?: User | undefined | null;
  setUser?: Dispatch<SetStateAction<User | null>> | undefined;
  cardData?: Quizzes[] | undefined;
  quizes?: () => void;
  selectedCard?: SelectedCard | null | undefined;
  // eslint-disable-next-line no-unused-vars
  handleSelectQuiz?: (card: Quizzes) => void;
}>({});

const AppProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);
  const [cardData, setCardData] = useState<Quizzes[] | undefined>([]);
  const [selectedCard, setSelectedCard] = useState<Quizzes | null>(null);

  const handleSelectQuiz = (card: Quizzes) => {
    setSelectedCard(card);
    return undefined;
  };

  const quizes = async () => {
    const quiz = await getQuizzes();
    console.log(quiz);
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
