import { Router } from "express";
import { allProduct, createProduct, deleteProduct, findbyid, updateProduct,CreatedByOnuser } from "../controllers/product.controller.js";
import { upload } from "../helper/multermiddleware.js";


const productRouter=Router()

productRouter.route('/createProduct').post(upload.single('imageUrl'), createProduct);

productRouter.route("/findbyid/:productId").get(findbyid);
productRouter.route('/update/:productId').put(updateProduct);
productRouter.route('/delete/:productId').delete(deleteProduct)
productRouter.route("/allproducts").get(allProduct)
productRouter.route("/yourproducts").get(CreatedByOnuser)
export default productRouter
