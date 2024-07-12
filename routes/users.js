const router = require("express").Router();
const { getUser } = require("../controllers/users");

router.get("/", getUser);
router.get("/:userId", () => console.log("GET users by ID"));
router.post("/", () => console.log("POST users"));

module.exports = router;
