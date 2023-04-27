import React, { createContext, useContext } from "react";
import SignIn from "./SignIn";
import Admin from "./pages/Admin";
import UserPreQuiz from "./pages/UserPreQuiz";
import AppProvider, { appContext } from "./context/AppProvider";

function App() {
  const { user } = useContext(appContext);

  return <>{user ? <Admin admin={user.admin} /> : <SignIn />}</>;
}

export default App;
