import { Router } from "express";
import { cancelOrder, createOrderItem, orderPrice } from "../controllers/order.controller.js";

const orderRouter=Router()

orderRouter.route('/placeorder/:orderId').post(createOrderItem)
orderRouter.route('/cancelorder/:orderId').delete(cancelOrder)
orderRouter.route('/payment').post(orderPrice)

export default orderRouter