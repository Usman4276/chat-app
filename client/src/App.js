import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import ChatRoom from "./pages/chatRoom";
import MyContext from "./context";

function App() {
  const [context, setContext] = useState("");

  return (
    <>
      <MyContext.Provider value={{ context, setContext }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat-room" element={<ChatRoom />} />
        </Routes>
      </MyContext.Provider>
    </>
  );
}

export default App;
