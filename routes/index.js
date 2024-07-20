const router = require("express").Router();
const clothingItem = require("./clothingItem");
const userRouter = require("./users");
const { INTERNAL_SERVER_ERROR, NOT_FOUND } = require("../utils/errors");

router.use("/users", userRouter);
router.use("/items", clothingItem);

router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Requested resource not found" });
});
module.exports = router;
