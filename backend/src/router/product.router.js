import { Router } from "express";
import { allProduct, createProduct, deleteProduct, findbyid, updateProduct } from "../controllers/product.controller.js";
import { upload } from "../helper/multermiddleware.js";


const productRouter=Router()

productRouter.route("/createProduct").post
(upload.fields([
    {
        name:"productImage",
        maxCount:1
    }
])
,createProduct)
productRouter.route("/findbyid/:productId").get(findbyid);
productRouter.route('/update/:productId').put(updateProduct);
productRouter.route('/delete/:productId').delete(deleteProduct)
productRouter.route("/allproducts").get(allProduct)
export default productRouter
