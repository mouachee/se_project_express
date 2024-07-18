const router = require("express").Router();
const clothingItem = require("./clothingItem");
const userRouter = require("./users");
const { INTERNAL_SERVER_ERROR } = require("../utils/errors");

router.use("/users", userRouter);
router.use("/items", clothingItem);

router.use((req, res) => {
  res.status(INTERNAL_SERVER_ERROR).send({ message: "Router not found" });
});

module.exports = router;
