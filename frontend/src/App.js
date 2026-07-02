import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [username, setUsername] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (loggedIn) {
      fetchMessages();
      const timer = setInterval(fetchMessages, 2000);
      return () => clearInterval(timer);
    }
  }, [loggedIn]);

  const fetchMessages = async () => {
    try {
      const res = await axios.get("http://localhost:5000/messages");
      setMessages(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const sendMessage = async () => {
    if (text.trim() === "") return;

    try {
      await axios.post("http://localhost:5000/messages", {
        username,
        text,
      });

      setText("");
      fetchMessages();
    } catch (err) {
      console.log(err);
    }
  };

  if (!loggedIn) {
    return (
      <div
        style={{
          padding: "40px",
          textAlign: "center",
        }}
      >
        <h2>Chat App</h2>

        <input
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <br />
        <br />

        <button
          onClick={() => {
            if (username.trim() !== "") {
              setLoggedIn(true);
            }
          }}
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "30px auto",
        background: "#f5f5f5",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.2)",
      }}
    >
      <h2 style={{ textAlign: "center" }}>
        Welcome {username}
      </h2>

      <div
        style={{
          height: "350px",
          overflowY: "auto",
          background: "#fff",
          padding: "10px",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              background: "#DCF8C6",
              padding: "10px",
              borderRadius: "10px",
              marginBottom: "10px",
            }}
          >
            <strong>{msg.username}</strong>
            <br />
            {msg.text}
            <br />
            <small>{msg.time}</small>
          </div>
        ))}
      </div>

      <input
        placeholder="Type message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{
          width: "75%",
          padding: "10px",
        }}
      />

      <button
        onClick={sendMessage}
        style={{
          padding: "10px 20px",
          marginLeft: "10px",
          background: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Send
      </button>
    </div>
  );
}

export default App;