const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const posts = require("./src/db/posts");
const users = require("./src/db/users");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({
    msg: "welcome to the API",
  });
});

app.get("/posts", (req, res) => {
  res.json({
    posts: posts.posts,
  });
});

app.post("/posts/:id", (req, res) => {
  if (req.body) {
    let data = {};
    data.posts = posts.posts.map((item) => {
      if (item.id == req.params.id) {
        item.claps += req.body.clap;
      }
      return item;
    });
    data = JSON.stringify(data, null, 2);

    fs.writeFile("./src/db/posts.json", data, (err) => {
      if (err) {
        console.log(err + data);
      } else {
        res.json();
      }
    });
  }
});

app.get("/users", (req, res) => {
  res.json({
    users,
  });
});

app.post("/login", (req, res) => {
  let user = users.users.find((item) => {
    console.log(item.login, req.body.email, item.password, req.body.password);
    return item.login == req.body.email && item.password == req.body.password;
  });

  if (user) {
    res.json({ user });
  } else {
    req.status(401).json({ error: "Пользователь не найден" });
  }
});

app.listen(3000, () => {});
