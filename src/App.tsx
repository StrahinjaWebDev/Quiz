import React, { useContext, useState } from "react";
import SignIn from "./pages/SignIn";
import Admin from "./pages/Admin";
import { appContext } from "./context/AppProvider";

function App() {
  const { user } = useContext(appContext);

  const [guest, setGuest] = useState(false);

  return (
    <>{guest ? <Admin admin={false} /> : <>{user ? <Admin admin={user.admin} /> : <SignIn onGuestClick={() => setGuest(true)} />}</>}</>
  );
}

export default App;
