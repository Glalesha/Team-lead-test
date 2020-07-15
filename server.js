const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
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
  fs.readFile("./src/db/posts.json", "UTF-8", (err, postsDB) => {
    const posts = JSON.parse(postsDB);
    res.json({
      posts: posts.posts,
    });
  });
});

app.post("/posts/:id", verifyToken, (req, res) => {
  jwt.verify(req.token, "the_secret_key", (err) => {
    if (err) {
      res.sendStatus(401);
    } else {
      if (req.body) {
        let postsDB = fs.readFileSync("./src/db/posts.json");
        const posts = JSON.parse(postsDB);
        let data = { posts: [] };
        data.posts = posts.posts.map((item) => {
          if (item.id == req.params.id) {
            item.claps += req.body.clap;

            if (!item.usersClapped) {
              item.usersClapped = [];
            }

            const userClapped = item.usersClapped.find((item) => {
              return item === req.body.userId;
            });
            (req.body.userId);

            if (userClapped) {
              item.usersClapped = item.usersClapped.filter((item) => {
                return item !== req.body.userId;
              });
            } else {
              item.usersClapped = [...item.usersClapped, req.body.userId];
            }
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

app.delete("/posts/:id", verifyToken, (req, res) => {
  jwt.verify(req.token, "the_secret_key", (err) => {
    console.log(err);
    if (err) {
      res.sendStatus(401);
    } else {
      let postsDB = fs.readFileSync("./src/db/posts.json");
      const posts = JSON.parse(postsDB);
      const data = { posts: [] };
      data.posts = posts.posts.filter((item) => {
        return item.id != req.params.id;
      });

      fs.writeFile(
        "./src/db/posts.json",
        JSON.stringify(data, null, 2),
        (err) => {
          if (err) {
            console.log(err + data);
          } else {
            res.json({ posts: data.posts });
          }
        }
      );
    }
  });
});

app.put("/posts/:id", verifyToken, (req, res) => {
  jwt.verify(req.token, "the_secret_key", (err) => {
    if (err) {
      res.sendStatus(401);
    } else {
      fs.readFile("./src/db/posts.json", "UTF-8", (err, postsDB) => {
        const posts = JSON.parse(postsDB);
        const data = { posts: [] };
        let postFound = posts.posts.find((item) => {
          return item.id === req.params.id;
        });

        if (postFound) {
          data.posts = posts.posts.map((item) => {
            if (item.id == req.params.id) {
              item.title = req.body.title;
              item.description = req.body.description;
              item.updateAt = req.body.updateAt;
            }

            return item;
          });
        } else {
          data.posts = [
            ...posts.posts,
            {
              title: req.body.title,
              description: req.body.description,
              id: req.params.id,
              createdAt: req.body.createdAt,
              updateAt: req.body.updateAt,
              claps: req.body.claps,
            },
          ];
        }

        fs.writeFile(
          "./src/db/posts.json",
          JSON.stringify(data, null, 2),
          (err) => {
            if (err) {
              console.log(err + data);
            } else {
              res.json({ posts: data.posts });
            }
          }
        );
      });
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
    return item.login == req.body.login && item.password == req.body.password;
  });

  if (userFound) {
    const userInfo = {
      login: userFound.login,
      role: userFound.role,
      id: userFound.id,
    };
    const token = jwt.sign({ userInfo }, "the_secret_key");
    res.json({
      token,
      login: userInfo.login,
      role: userInfo.role,
      id: userInfo.id,
    });
  } else {
    req.status(401).json({ error: "Пользователь не найден" });
  }
});

function verifyToken(req, res, next) {
  123;
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    234;
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(401);
  }
}

app.listen(3000, () => {});
