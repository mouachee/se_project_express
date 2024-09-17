const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  createItem,
  getItems,
  deleteItems,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItem");
const { validateItemBody, validateId } = require("../middlewares/validation");

router.get("/", getItems);

router.use(auth);
// Create
router.post("/", validateItemBody, createItem);

// Update

router.put("/:itemId/likes", validateId, likeItem);
// Delete

router.delete("/:itemId", validateId, deleteItems);
router.delete("/:itemId/likes", validateId, dislikeItem);

module.exports = router;
