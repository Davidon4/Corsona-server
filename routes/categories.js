const { Category } = require("../models/category");
const express = require("express");
const router = express.Router();

/* This is a get request to the server. It is getting all the categories from the database. */
router.get("/", async (req, res) => {
  const categoryList = await Category.find();

  if (!categoryList) {
    res.status(500).json({ success: false });
  }
  res.send(categoryList);
});

/* This is a get request to the server. It is getting a category from the database by its id. */
router.get("/:id", async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return res.status(500).json({
      success: false,
      message: "The category with the given ID cannot be found",
    });
  }
  res.status(200).send(category);
});

/* This is creating a new category. */
router.post("/", async (req, res) => {
  let category = new Category({
    name: req.body.name,
    icon: req.body.icon,
    color: req.body.color,
  });
  category = await category.save();

  if (!category) return res.status(404).send("the category cannot be created!");

  res.send(category);
});

/* This is updating a category. */
router.put("/:id", async (req, res) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      icon: req.body.icon,
      color: req.body.color,
    },
    { new: true }
  );
  if (!category) {
    return res.status(404).send("The category cannot be created!");
  }
  res.send(category);
});

/* Deleting a category from the database. */
router.delete("/:id", (req, res) => {
  Category.findByIdAndRemove(req.params.id)
    .then((category) => {
      if (category) {
        return res
          .status(200)
          .json({ success: true, message: "The category has been deleted" });
      } else {
        return res
          .status(401)
          .json({ success: false, message: "Category not found" });
      }
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
});

module.exports = router;
