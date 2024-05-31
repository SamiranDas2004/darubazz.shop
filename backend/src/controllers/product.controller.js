import Product from "../models/product.model.js";

export const createProduct=async(req,res)=>{
    const {productname,price,imageUrl,category,brand}=req.body

  const product=  await Product.create({
        productName,price,category,brand,imageUrl
    })
    


    if (!product) {
      return  res.status(401).json("product creation was failed")
      }

      product.save()

      return res.status(200).json("product crated successfully")

}

export const updateProduct=async(req,res)=>{
    const {productname,price,category,brand,imageUrl}=req.body;
    if (!(productname || price || category || brand)) {
        return res.status(402).json("need some data")
    }
    const updateProduct = await Product.findByIdAndUpdate(
        req.product?._id, 
        {
          $set: {
         productname,
         price,
        brand
          },
        },
        { new: true }
      )
    
      return res
        .status(200)
        .json("update the product");

}


export const deleteProduct=async(req,res)=>{
  const {_id}=req.params

  if (!_id) {
    return re.status( 401).json(" cant get the id ")
  }

 const delProduct= await Product.findByIdAndDelete(_id)
 if (!delProduct) {
  return res.status(401).json("failed to delete the product")
 }

return res.status(200).json("product deleted successfully")
}

