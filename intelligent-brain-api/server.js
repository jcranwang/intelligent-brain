const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send("Intelligent brain server");
});

app.listen(3000, () => {
    console.log("Start server...");
})