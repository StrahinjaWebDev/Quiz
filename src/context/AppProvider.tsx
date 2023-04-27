import React, { useState, Dispatch, SetStateAction, useEffect } from "react";
import { User } from "../models/User";

export const appContext = React.createContext<{
  user?: User | undefined | null;
  setUser?: Dispatch<SetStateAction<User | null>>;
}>({});

const AppProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    let parseUser;
    if (user !== null) {
      parseUser = JSON.parse(user);
      setUser(parseUser);
    }
  }, []);

  return <appContext.Provider value={{ user, setUser }}>{children}</appContext.Provider>;
};

export default AppProvider;
