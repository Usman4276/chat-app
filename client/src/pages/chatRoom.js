import React, { useCallback } from "react";
import Message from "../components/message";
import { io } from "socket.io-client";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import userJoinedAudio from "../assets/audio/user-join.mp3";
import messageAudio from "../assets/audio/message.mp3";

const socket = io.connect("http://localhost:8000");
const ChatRoom = () => {
  const location = useLocation();
  const [Input, setInput] = React.useState("");
  const [message, setMessage] = React.useState({});

  const userJoinAudio = new Audio(userJoinedAudio);
  const messagedAudio = new Audio(messageAudio);

  socket.on(
    "new-user-joined",
    (data) => {
      toast.info(`${data} joined the chat room`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
      });
      userJoinAudio.play();
    },
    [location.state.name]
  );

  socket.on("receive", (data) => {
    setMessage({ message: data.message, author: data.name });
    messagedAudio.play();
  });
  const onSendHandler = () => {
    socket.emit("send", {
      id: socket.id,
      name: location.state.name,
      message: Input,
    });
  };

  if (location.state.name) {
    socket.emit("user-joined", {
      id: socket.id,
      name: location.state.name,
    });
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "97vh",
          gap: "1rem",
        }}
      >
        {/* chatting box */}
        <div
          style={{
            width: "70%",
            height: "50vh",
            padding: "3rem",
            boxSizing: "border-box",
            borderRadius: "10px",
            boxShadow: "0px 0px 10px 1px #b4b4b4",
            overflowX: "hidden",
            overflowY: "scroll",
          }}
        >
          {message?.author && (
            <Message
              author={message.author}
              message={message.message}
              position={"left"}
            />
          )}
        </div>

        {/* message typer */}
        <div
          style={{
            width: "70%",
            display: "flex",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          <input
            style={{
              flexGrow: 1,
              fontSize: "20px",
              borderRadius: "10px",
              border: 0,
              boxShadow: "rgb(180 180 180) 0px 6px 10px 1px",
              padding: "1rem",
            }}
            value={Input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            type="text"
            placeholder="Type Message Here..."
          />
          <button
            style={{
              padding: "10px",
              cursor: "pointer",
              background: "limegreen",
              border: 0,
              fontSize: "1.2rem",
              color: "white",
              borderRadius: "40px",
              boxShadow: "rgb(180 180 180) 0px 6px 10px 1px",
              width: "8rem",
              height: "4rem",
            }}
            onClick={onSendHandler}
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatRoom;
