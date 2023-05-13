import React, { useContext } from "react";
import SignIn from "./pages/SignIn";
import Admin from "./pages/Admin";
import { appContext } from "./context/AppProvider";

function App() {
  const { user, guest, setGuest } = useContext(appContext);

  return (
    <>{guest ? <Admin admin={false} /> : <>{user ? <Admin admin={user.admin} /> : <SignIn onGuestClick={() => setGuest?.(true)} />}</>}</>
  );
}

export default App;
