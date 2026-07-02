const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let messages = [];

app.get("/messages", (req, res) => {
    res.json(messages);
});

app.post("/messages", (req, res) => {
    const message = {
        username: req.body.username,
        text: req.body.text,
        time: new Date().toLocaleTimeString()
    };

    messages.push(message);

    res.json({
        success: true,
        message: "Message sent"
    });
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});