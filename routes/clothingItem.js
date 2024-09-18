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

router.put("/:id/likes", validateId, likeItem);
// Delete

router.delete("/:id", validateId, deleteItems);
router.delete("/:id/likes", validateId, dislikeItem);

module.exports = router;
