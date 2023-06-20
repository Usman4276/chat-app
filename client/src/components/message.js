import React, { useEffect, useState } from "react";

const Message = ({ author, message, position }) => {
  const [PrevMessages, setPrevMessages] = useState([{}]);

  useEffect(() => {
    setPrevMessages([
      {
        ...PrevMessages,
        author,
        message,
        position,
      },
    ]);
  }, [message]);

  return (
    <>
      {PrevMessages.map((value) => {
        return (
          <>
            <div
              style={{
                display: "inline-block",
                float: value.position,
                padding: "10px",
                borderRadius: "20px",
                boxShadow: "0px 2px 4px 2px #00000080",
                fontSize: "1.3rem",
              }}
            >
              {value.author} : {value.message}
            </div>
            <br />
          </>
        );
      })}
    </>
  );
};

export default Message;
