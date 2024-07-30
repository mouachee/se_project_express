const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {
  BAD_REQUEST,
  NOT_FOUND,
  CONFLICT,
  INTERNAL_SERVER_ERROR,
  UNAUTHORIZED,
} = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");
// GET users

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(() =>
      res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server" })
    );
};
const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  User.findOne({ email }).then((existingEmail) => {
    if (existingEmail) {
      return res.status(CONFLICT).send({ message: "Email already exists" });
    }
  });

  bcrypt.hash(password, 10).then((hash) =>
    User.create({ name, avatar, email, password: hash })
      .then((user) => {
        res
          .status(201)
          .send({ name: user.name, avatar: user.avatar, email: user.email });
      })
      .catch((err) => {
        if (err.code === 11000) {
          return res.status(CONFLICT).send({ message: "Email already exist" });
        }
        if (err.name === "ValidationError") {
          return res
            .status(BAD_REQUEST)
            .send({ message: "Error from createuser" });
        }
        return res
          .status(INTERNAL_SERVER_ERROR)
          .send({ message: "An error has occurred on the server" });
      })
  );
};

const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: "Error user not found" });
      }
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: "Error from getUser" });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};
const login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password).then((user) => {
    res
      .send({
        token: jwt.sign({ _id: user._id }, JWT_SECRET, {
          expiresIn: "7d",
        }),
      })
      .catch((err) => {
        res.status(UNAUTHORIZED).send({ message: "Invalid token" });
      });
  });
};

module.exports = { getUsers, createUser, getUser, login };
