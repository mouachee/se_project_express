const router = require("express").Router();
const clothingItem = require("./clothingItem");
const userRouter = require("./users");
const { login, createUser } = require("../controllers/users");
const { NOT_FOUND } = require("../utils/errors");
const {
  validateUserCreatedBody,
  validateUserLoginBody,
} = require("../middlewares/validation");

router.post("/signin", validateUserLoginBody, login);
router.post("/signup", validateUserCreatedBody, createUser);

router.use("/users", userRouter);
router.use("/items", clothingItem);

router.use((res) => {
  res.status(NOT_FOUND).send({ message: "Requested resource not found" });
});
module.exports = router;
