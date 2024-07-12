const User = require("../models/user");

//GET /users

const getUser = (req, res) => {
  User.find({})
    .then((users) => {
      throw Error("Error message");
      res.send(users);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).send({ message: err.message });
    });
};

// const createUser = (req, res) => {
//   req.body;
//};

module.exports = { getUser };
