const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const dataBase = {
  user: [
    {
      id: "josh123",
      name: "Josh",
      email: "josh@gmail.com",
      password: "worldPeace",
      entries: 0,
      joinedDate: new Date()
    },
    {
      id: "james123",
      name: "James",
      email: "James@gmail.com",
      password: "lakers",
      entries: 0,
      joinedDate: new Date()
    }
  ]
};

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json(dataBase.user);
});

app.post("/signin", (req, res) => {
  const { email, password } = req.body;
  for (let index = 0; index < dataBase.user.length; index++) {
    if (
      dataBase.user[index].email === email &&
      dataBase.user[index].password === password
    ) {
        res.json("Signin Successfully")
    }
  }
  res.status(400).send("Wrong email or password");
});

app.post("/register", (req, res) => {
    const {name, email, password} = req.body;
    dataBase.user.push({
        id: name + "123",
        name: name,
        email: email,
        password: password,
        entries: 0,
        joinedDate: new Date()
    });
    res.json(dataBase.user[dataBase.user.length - 1]);
});

app.listen(3000, () => {
  console.log("Start server...");
});
