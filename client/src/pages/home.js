import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [Input, setInput] = useState("");

  const handleOnClick = () => {
    if (!Input) return alert("Please enter your name");

    setInput("");
    navigate("/chat-room", {
      state: {
        name: Input,
      },
    });
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "97vh",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "1rem",
          border: 0,
          padding: "2rem",
          borderRadius: "10px",
          boxShadow: "0px 0px 12px 6px #8080806b",
        }}
      >
        <div>
          <input
            id="name"
            placeholder="Enter your name"
            style={{ padding: "10px", width: "20rem" }}
            type="text"
            value={Input}
            name="name"
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
        </div>
        <button
          style={{
            cursor: "pointer",
            border: 0,
            padding: "10px",
            borderRadius: "10px",
            backgroundColor: "#addb70",
            boxShadow: "0px 2px 5px 2px #808080ab",
          }}
          onClick={handleOnClick}
        >
          Join The Chat Room
        </button>
      </div>
    </div>
  );
};

export default Home;
