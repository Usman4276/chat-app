import React, { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { io } from "socket.io-client";
import messageAudio from "../assets/audio/message.mp3";
import userJoinedAudio from "../assets/audio/user-join.mp3";
import MyContext from "../context";

const socket = io.connect("http://localhost:8000");
const ChatRoom = () => {
  const ref = useRef(null);
  const navigate = useNavigate();
  const { context, setContext } = useContext(MyContext);
  const [Input, setInput] = React.useState("");
  const [message, setMessage] = React.useState([]);

  const userJoinAudio = new Audio(userJoinedAudio);
  const messagedAudio = new Audio(messageAudio);

  const onNewUserJoined = () => {
    console.log("new user joined----");
    socket.on("new-user-joined", (data) => {
      toast.info(`${data.name} joined the chat room`, {
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
    });
  };

  const onReceiveMessage = () => {
    socket.on("receive", (data) => {
      setMessage((val) => [
        ...val,
        { message: data.message, author: data.name },
      ]);
      messagedAudio.play();
    });
  };

  const onSendHandler = () => {
    setInput("");
    setMessage((val) => [...val, { message: Input, author: context.name }]);
    socket.emit("send", {
      id: socket.id,
      name: context.name,
      roomId: context.roomId,
      message: Input,
    });
  };

  const userJoined = () => {
    socket.emit("room-joined", {
      name: context.name,
      roomId: context.roomId,
    });
  };

  useEffect(() => {
    if (!context.name) return navigate("/");
    userJoined();
  }, [context]);

  useEffect(() => {
    onReceiveMessage();
    onNewUserJoined();
  }, []);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

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
          {message &&
            message.map((value, index) => {
              return (
                <div
                  key={index}
                  ref={ref}
                  style={{
                    display: "inline-block",
                    float: value.author === context.name ? "right" : "left",
                    backgroundColor:
                      value.author === context.name && "limegreen",
                    color: value.author === context.name && "white",
                    clear: value.author === context.name ? "left" : "right",
                    padding: "10px",
                    borderRadius: "20px",
                    boxShadow: "0px 2px 4px 2px #00000080",
                    fontSize: "1.3rem",
                    marginBottom: "1rem",
                  }}
                >
                  {value.author === context.name ? "Me" : value.author} :{" "}
                  {value.message}
                </div>
              );
            })}
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
