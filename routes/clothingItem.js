const router = require("express").Router();

const {
  createItem,
  getItems,
  updateItems,
  deleteItems,
} = require("../controllers/clothingItem");
//CRUD

//Create
router.post("/", createItem);

//Read

router.get("/", getItems);
// Update

router.put("/:itemId", updateItems);

//Delete

router.delete("/:itemId", deleteItems);

module.exports = router;
