import { Router } from "express";
import { allProduct, createProduct, deleteProduct, findbyid, updateProduct,CreatedByOnuser, getProductByCategory } from "../controllers/product.controller.js";
import { upload } from "../helper/multermiddleware.js";
import { deleteUserCarts, reMoveFromCart, totalCartItems, } from "../controllers/cart.controller.js";


const productRouter=Router()

productRouter.route('/createProduct').post(upload.single('imageUrl'), createProduct);

productRouter.route("/findbyid/:productId").get(findbyid);
productRouter.route('/update/:productId').put(updateProduct);
productRouter.route('/delete/:productId').delete(deleteProduct)
productRouter.route("/allproducts").get(allProduct)
productRouter.route("/yourproducts").get(CreatedByOnuser)
productRouter.route("/category/:category").get(getProductByCategory)
productRouter.route("/cartitems").post(totalCartItems)
productRouter.route("/deleteAllCart").post(reMoveFromCart)
export default productRouter
