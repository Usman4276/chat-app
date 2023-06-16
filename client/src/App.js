import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import ChatRoom from "./pages/chatRoom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat-room" element={<ChatRoom />} />
      </Routes>
    </>
  );
}

export default App;
