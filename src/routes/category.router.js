const router = require("express").Router();

const {
  saveCategory,
  findCategory,
  findById,
  updateCategory,
} = require("../controllers/category.controller");

router.get("/category", findCategory);

router.get("/category/:id", findById);

router.post("/category", saveCategory);

router.put("/category/:id", updateCategory);

module.exports = router;
