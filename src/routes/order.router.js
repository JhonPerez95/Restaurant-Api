const router = require("express").Router();

const { findOrder, saveOrder } = require("../controllers/order.controller");

router.post("/order", saveOrder);
router.get("/order", findOrder);

module.exports = router;
