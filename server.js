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

app.post("/posts/:id", verifyToken, (req, res) => {
  jwt.verify(req.token, "the_secret_key", (err) => {
    if (err) {
      res.sendStatus(401);
    } else {
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
    }
  });
});

app.delete("/posts/:id", (req, res) => {
  const data = { posts: [] };
  data.posts = posts.posts.filter((item) => {
    console.log(item.id, req.params.id);
    return item.id != req.params.id;
  });

  console.log(data);

  fs.writeFile("./src/db/posts.json", JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.log(err + data);
    } else {
      res.json({ posts: posts.posts });
    }
  });
});

app.put("/posts/:id", (req, res) => {
  console.log(req.body);
  const data = { posts: [] };
  data.posts = posts.posts.map((item) => {
    if (item.id == req.params.id) {
      item.title = req.body.title;
      item.description = req.body.description;
    }

    return item;
  });
  console.log(req.params.id, data);

  fs.writeFile("./src/db/posts.json", JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.log(err + data);
    } else {
      res.json({ posts: posts.posts });
    }
  });
});

app.get("/users", (req, res) => {
  res.json({
    users,
  });
});

app.post("/login", (req, res) => {
  const userFound = users.users.find((item) => {
    return item.login == req.body.email && item.password == req.body.password;
  });

  if (userFound) {
    const userInfo = { email: userFound.login, role: userFound.role };
    const token = jwt.sign({ userInfo }, "the_secret_key");
    res.json({
      token,
      email: userInfo.email,
      role: userInfo.role,
    });
  } else {
    req.status(401).json({ error: "Пользователь не найден" });
  }
});

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(401);
  }
}

app.listen(3000, () => {});
