import { Router } from "express";
import { cancelOrder, cancelUserOrder, confirmOrder, createOrderItem, IsAllowedToRate, orderPrice, ordersForOneSeller, showFinalProductsToUser, showUserOrders, userConfirmOrders,  } from "../controllers/order.controller.js";
import { getAllCartItems } from "../controllers/cart.controller.js";
import { setRatingForAProduct,setTheRatingInTheProduct } from "../controllers/ratings.controller.js";

const orderRouter=Router()

orderRouter.route('/placeorder/:orderId').post(createOrderItem)
orderRouter.route('/cancelorder/:orderId').delete(cancelOrder)
orderRouter.route('/confirmorder/:orderId').post(confirmOrder)
orderRouter.route('/payment/:totalPrice').post(orderPrice)
orderRouter.route('/orders/:userId').post(ordersForOneSeller)
orderRouter.route("/userorder").post(userConfirmOrders)
orderRouter.route("/showuserorders/:userId").get(showUserOrders)
orderRouter.route("/userallcart/:userId").post(getAllCartItems)
orderRouter.route("/showallorders").post(showFinalProductsToUser)
orderRouter.route("/cancelUserOrder").post(cancelUserOrder)
orderRouter.route("/ratingallowornot").post(IsAllowedToRate)
orderRouter.route("/giverating").post(setRatingForAProduct)
orderRouter.route("/ratings").post(setTheRatingInTheProduct)
export default orderRouter