import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Login from "./components/Login";
import ChatHome from "./components/ChatHome";

function App() {
  const [userId, setUserId] = useState("");
  return (
    <>
      {!userId && <Login setUserId={setUserId} />}
      {userId && <ChatHome userId={userId} />}
    </>
  );
}

export default App;
