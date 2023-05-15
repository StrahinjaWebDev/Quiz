import React, { useState, Dispatch, SetStateAction, useEffect } from "react";
import { User } from "../models/User";
import { getQuizzes } from "../service/getQuizzes";
import { Quiz } from "../models/Quiz";
import { Invite } from "../models/Invite";
import { getInvites } from "../service/getInvites";

export const appContext = React.createContext<{
  user?: User | undefined | null;
  setUser?: Dispatch<SetStateAction<User | null>> | undefined;
  cardData?: Quiz[];
  quizes?: () => void;
  selectedCard?: Quiz;
  // eslint-disable-next-line no-unused-vars
  handleSelectQuiz?: (card: Quiz) => void;
  handleLogout?: () => void;
  guest?: boolean;
  setGuest?: React.Dispatch<React.SetStateAction<boolean>>;
  // eslint-disable-next-line no-unused-vars
  setSelectedCard?: (card: Quiz) => void;
  invites?: Invite[] | [];
}>({});

const AppProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);
  const [cardData, setCardData] = useState<Quiz[]>();
  const [selectedCard, setSelectedCard] = useState<Quiz>();
  const [guest, setGuest] = useState(false);
  const [invites, setInvites] = useState<Invite[] | []>([]);

  const handleSelectQuiz = (card: Quiz) => {
    setSelectedCard(card);
    return undefined;
  };

  const quizes = async () => {
    const quiz = await getQuizzes();
    setCardData(quiz.data);
  };

  useEffect(() => {
    if (user) {
      const fetchInvites = async () => {
        const response = await getInvites(user.id);
        if (response.success) {
          if (response.data) setInvites(response.data);
        } else {
          alert(response.error);
        }
      };

      fetchInvites();
    }
  }, [user]);

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

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <appContext.Provider
      value={{
        user,
        setUser,
        cardData,
        quizes,
        selectedCard,
        handleSelectQuiz,
        handleLogout,
        guest,
        setGuest,
        setSelectedCard,
        invites,
      }}
    >
      {children}
    </appContext.Provider>
  );
};

export default AppProvider;
