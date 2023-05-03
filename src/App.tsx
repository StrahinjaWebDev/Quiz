import React, { useContext } from "react";
import SignIn from "./pages/SignIn";
import Admin from "./pages/Admin";
import { appContext } from "./context/AppProvider";

function App() {
  const { user } = useContext(appContext);

  return <>{user ? <Admin admin={user.admin} /> : <SignIn />}</>;
}

export default App;
