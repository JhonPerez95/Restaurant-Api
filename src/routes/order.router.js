const router = require("express").Router();

const {
  findOrder,
  saveOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/order.controller");

router.post("/order", saveOrder);
router.get("/order", findOrder);
router.put("/order/:id", updateOrder);
router.delete("/order/:id", deleteOrder);

module.exports = router;
