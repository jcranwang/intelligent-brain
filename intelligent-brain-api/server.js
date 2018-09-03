const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const knex = require("knex");

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "chaoranwang",
    password: "",
    database: "intelligent-brain"
  }
});

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
  db("users")
    .returning("*")
    .insert({
      email: email,
      name: name,
      joined: new Date()
    })
    .then(user => {
      res.json(user[0]);
    })
    .catch(err => res.status(400).json("Cannot register"));
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  db.select("*")
    .from("users")
    .where({ id })
    .then(users => {
      if (users.length) {
        res.json(users[0]);
      } else {
        res.status(400).json("User not found");
      }
    })
    .catch(err => res.status(400).json("Error getting user"));
});

app.put("/image", (req, res) => {
  const { id } = req.body;
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
