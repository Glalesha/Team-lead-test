const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const posts = require("./db/posts");
const users = require("./db/users");

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
    posts,
  });
});

app.get("/users", (req, res) => {
  res.json({
    users,
  });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
