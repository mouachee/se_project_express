const router = require("express").Router();

const {
  createItem,
  getItems,
  updateItems,
  deleteItems,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItem");
// CRUD

// Create
router.post("/", createItem);

// Read

router.get("/", getItems);
// Update

router.put("/:itemId", updateItems);
router.put("/:itemId/likes", likeItem);
// Delete

router.delete("/:itemId", deleteItems);
router.delete("/:itemId/likes", dislikeItem);

module.exports = router;
