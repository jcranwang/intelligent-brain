const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const dataBase = {
  users: [
    {
      id: "1",
      name: "Josh",
      email: "josh@gmail.com",
      password: "worldPeace",
      entries: 0,
      joinedDate: new Date()
    },
    {
      id: "2",
      name: "James",
      email: "James@gmail.com",
      password: "lakers",
      entries: 0,
      joinedDate: new Date()
    }
  ]
};

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json(dataBase.users);
});

app.post("/signin", (req, res) => {
  const { email, password } = req.body;
  let userFound = false;
  dataBase.users.forEach(user => {
    if (user.email === email && user.password === password) {
      userFound = true;
      return res.json(user);
    }
  });
  if (!userFound) {
    res.status(400).json("User not found");
  }
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  dataBase.users.push({
    id: name + "123",
    name: name,
    email: email,
    password: password,
    entries: 0,
    joinedDate: new Date()
  });
  res.json(dataBase.users[dataBase.users.length - 1]);
});

app.post("/profile/:id", (req, res) => {
  const { id } = req.params;
  let userFound = false;
  dataBase.users.forEach(user => {
    if (user.id === id) {
      userFound = true;
      return res.json(user);
    }
  });
  if (!userFound) {
    res.status(400).json("User not found");
  }
});

app.put("/image", (req, res) => {
  const {id} = req.body;
  let userFound = false;
  dataBase.users.forEach(user => {
    if (user.id === id) {
      userFound = true;
      user.entries++;
      return res.json(user.entries);
    }
  });
  if (!userFound) {
    res.status(400).json("User Not Found");
  }
});

app.listen(3001, () => {
  console.log("Start server...");
});
