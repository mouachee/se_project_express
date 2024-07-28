const router = require("express").Router();
const {
  getUsers,
  createUser,
  getUser,
  login,
} = require("../controllers/users");

// router.get("/", getUsers);
// router.get("/:userId", getUser);
router.post("/signin", login);
router.post("/signup", createUser);

module.exports = router;
