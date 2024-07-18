const ClothingItem = require("../models/clothingItem");
const { INTERNAL_SERVER_ERROR } = require("../utils/errors");

const createItem = (req, res) => {
  console.log(req);
  console.log(res.body);

  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl })
    .then((item) => {
      console.log(item);
      res.send({ data: item });
    })
    .catch((err) => {
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "Error from createItem", err });
    });
};
const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((err) => {
      res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "Error from getItems" }, err);
    });
};

const updateItems = (req, res) => {
  const { itemId } = req.params;
  const { imageUrl } = req.body;

  ClothingItem.findByIdAndUpdate(itemId, { $set: { imageUrl } })
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((err) => {
      res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "Error from updateItems" }, err);
    });
};
const deleteItems = (req, res) => {
  const { itemId } = req.params;

  console.log(itemId);
  ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then((item) => res.status(204).send({}))
    .catch((err) => {
      res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "Error from deleteItems" }, err);
    });
};
module.exports = {
  createItem,
  getItems,
  updateItems,
  deleteItems,
};
