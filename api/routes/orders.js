const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");

const OrdersController = require("../controllers/orders");

router.get("/", checkAuth, OrdersController.getAllOrders);

router.post("/", checkAuth, OrdersController.createOneOrder);

router.get("/:orderId", checkAuth, OrdersController.getOrder);

router.patch("/:orderId", checkAuth, OrdersController.updateOrder);

router.delete("/:orderId", checkAuth, OrdersController.deleteOrder);

module.exports = router;
