const router = require("express").Router();
const {
  findProduct,
  findById,
  saveProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");

router.get("/product", findProduct);

router.get("/product/:id", findById);

router.post("/product", saveProduct);

router.put("/product/:id", updateProduct);

router.delete("/product/:id", deleteProduct);

module.exports = router;
