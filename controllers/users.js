const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const BadRequestError = require("../errors/BadRequestError");
const NotFoundError = require("../errors/NotFoundError");
const ConflictError = require("../errors/ConflictError");
const UnauthorizedError = require("../errors/UnauthorizedError");

const { JWT_SECRET } = require("../utils/config");

const createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;

  if (!email) {
    return next(new BadRequestError("invalid email"));
  }

  return User.findOne({ email })
    .then((existingEmail) => {
      if (existingEmail) {
        const error = new Error("Email already exists");
        error.code = 11000;
        throw error;
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) =>
      User.create({ name, avatar, email, password: hash }).then((user) => {
        res.status(201).send({
          name: user.name,
          avatar: user.avatar,
          email: user.email,
        });
      })
    )
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError("Email already exists"));
      }
      if (err.name === "ValidationError") {
        next(new BadRequestError("invalid data provided for creating user"));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new BadRequestError("Invalid email or password"));
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({
        token: jwt.sign({ _id: user._id }, JWT_SECRET, {
          expiresIn: "7d",
        }),
      });
    })
    .catch((err) => {
      if (err.message === "Incorrect email or password") {
        next(new UnauthorizedError("Incorrect email or password"));
      } else {
        next(err);
      }
    });
};

const getCurrentUser = (req, res, next) => {
  const userId = req.user._id;

  User.findById(userId)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("User not found"));
      }
      if (err.name === "CastError") {
        next(new BadRequestError("Invalid user data"));
      } else {
        next(err);
      }
    });
};
const updateUserProfile = (req, res, next) => {
  const userId = req.user._id;
  const { name, avatar } = req.body;

  User.findByIdAndUpdate(
    userId,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .orFail()
    .then((user) => {
      if (!user) {
        next(new NotFoundError("User not found"));
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("Invalid data passed"));
      } else {
        next(err);
      }
    });
};

module.exports = { createUser, login, getCurrentUser, updateUserProfile };
