import React from "react";

const Message = ({ author, message, position }) => {
  return (
    <div
      style={{
        display: "inline-block",
        float: position,
        padding: "10px",
        borderRadius: "20px",
        boxShadow: "0px 2px 4px 2px #00000080",
        fontSize: "1.3rem",
      }}
    >
      {author} : {message}
    </div>
  );
};

export default Message;
