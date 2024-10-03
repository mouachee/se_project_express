const router = require("express").Router();
const clothingItem = require("./clothingItem");
const userRouter = require("./users");
const { login, createUser } = require("../controllers/users");
const NotFoundError = require("../errors/NotFoundError");
const {
  validateUserCreatedBody,
  validateUserLoginBody,
} = require("../middlewares/validation");

router.post("/signin", validateUserLoginBody, login);
router.post("/signup", validateUserCreatedBody, createUser);

router.use("/users", userRouter);
router.use("/items", clothingItem);

router.use((req, res, next) => {
  const error = new NotFoundError("Requested resource not found");
  next(error);
});

module.exports = router;
