const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  createItem,
  getItems,
  deleteItems,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItem");

router.get("/", getItems);

router.use(auth);
// Create
router.post("/", createItem);

// Update

router.put("/:itemId/likes", likeItem);
// Delete

router.delete("/:itemId", deleteItems);
router.delete("/:itemId/likes", dislikeItem);

module.exports = router;
