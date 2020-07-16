const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  return res.json({
    msg: "welcome to the API",
  });
});

app.get("/posts", (req, res) => {
  fs.readFile("./src/db/posts.json", "UTF-8", (err, postsDB) => {
    const posts = JSON.parse(postsDB);
    return res.json({
      posts: posts.posts,
    });
  });
});

app.post("/posts/:id", verifyToken, (req, res) => {
  jwt.verify(req.token, "the_secret_key", (err) => {
    if (err) {
      return res.sendStatus(401);
    } else {
      if (req.body) {
        let postsDB = fs.readFileSync("./src/db/posts.json", "UTF-8");
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
            req.body.userId;

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
            return res.json();
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
      return res.sendStatus(401);
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
            return res.json({ posts: data.posts });
          }
        }
      );
    }
  });
});

app.put("/posts/:id", verifyToken, (req, res) => {
  jwt.verify(req.token, "the_secret_key", (err) => {
    if (err) {
      return res.sendStatus(401);
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
              author: req.body.author,
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
              return res.json({ posts: data.posts });
            }
          }
        );
      });
    }
  });
});

app.post("/login", (req, res) => {
  if (req.body) {
    const user = {
      login: req.body.credentials.login,
      password: req.body.credentials.password,
    };

    const usersDB = fs.readFileSync("./src/db/users.json", "UTF-8");
    const users = JSON.parse(usersDB);
    const userFound = users.users.find((item) => {
      return item.login == user.login && item.password == user.password;
    });

    if (userFound) {
      const userInfo = {
        login: userFound.login,
        role: userFound.role,
        id: userFound.id,
      };
      const token = jwt.sign({ userInfo }, "the_secret_key");
      return res.json({
        token,
        login: userInfo.login,
        role: userInfo.role,
        id: userInfo.id,
      });
    } else {
      return res.status(400).json({ error: "Пользователь не найден" });
    }
  } else {
    return res.status(401);
  }
});

app.post("/register", (req, res) => {
  if (req.body) {
    const user = {
      login: req.body.login,
      password: req.body.password,
      id: req.body.id,
      role: req.body.role,
    };

    fs.readFile("./src/db/users.json", "UTF-8", (err, usersDB) => {
      if (err) {
        return res.sendStatus(401).json({ err });
      } else {
        const users = JSON.parse(usersDB);
        const userFound = users.users.find((item) => {
          return item.login === user.login;
        });

        if (userFound) {
          return res.sendStatus(401);
        } else {
          const newUsers = {};
          newUsers.users = [...users.users, user];
          const data = JSON.stringify(newUsers, null, 2);

          fs.writeFile("./src/db/users.json", data, (err) => {
            if (err) {
              console.log(err + newUsers);
            } else {
              const token = jwt.sign({ user }, "the_secret_key");

              return res.json({
                token,
                login: user.login,
                password: user.password,
                role: user.role,
                id: user.id,
              });
            }
          });
        }
      }
    });
  } else {
    return res.sendStatus(401);
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
    return res.sendStatus(401);
  }
}

app.listen(3000, () => {});
