import Product from "../models/product.model.js";
import { uploadOnCloudinary } from "../helper/uploadtocloudinary.js";


export const createProduct=async(req,res)=>{
   try {
     const {productname,price,category,brand}=req.body
     console.log(req.files);
    const imagePath= req.files?.productImage[0]?.path
if (!imagePath) {
  return res.status(409).json("image was not uploaded")
}

const imageUrl=await uploadOnCloudinary(imagePath)
   
if (!imageUrl) {
  return res.status(409).json("fauled to upload on cloudinary")
}
   const product=  await Product.create({
         productname,price,category,brand,imageUrl
     })
     
     if (!product) {
       return  res.status(401).json("product creation was failed")
       }
 
       product.save()
 
       return res.status(200).json(product)
   } catch (error) {
   throw new Error(error.message) 
   }

}


export const findbyid = async (req, res) => {
  const { productId } = req.params; // Take the productId from the URL parameters

  try {
    const product = await Product.findById(productId); // Use findById instead of findbyid

    if (!product) {
      return res.status(400).json({ message: "Can't find the product with the given ID" });
    }

    return res.status(200).json({ message: "Found product with the given ID", product });
  } catch (error) {
    return res.status(500).json({ message: "An error occurred", error });
  }
};

export const updateProduct = async (req, res) => {
  const { productId } = req.params; // Extract productId from URL parameters

  if (!productId) {
    return res.status(402).json("product id is not found")
  }
  const { productname, price, category, brand, imageUrl } = req.body;

  try {
    // Find the product by ID
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(400).json({ message: "Can't find the product with the given ID" });
    }

    // Check if there's any data to update
    if (!(productname || price || category || brand || imageUrl)) {
      return res.status(402).json({ message: "Need some data to update" });
    }

    // Update the product fields
    if (productname) product.productname = productname;
    if (price) product.price = price;
    if (category) product.category = category;
    if (brand) product.brand = brand;
    if (imageUrl) product.imageUrl = imageUrl;

    // Save the updated product
    const updatedProduct = await product.save();

    return res.status(200).json({ message: "Product updated successfully", updatedProduct });
  } catch (error) {
    return res.status(500).json({ message: "An error occurred", error });
  }
};


export const deleteProduct = async (req, res) => {

  console.log("in delete product");
  const { productId } = req.params; // Extract productId from URL parameters

  if (!productId) {
    return res.status(401).json({ message: "Can't get the ID" });
  }

  try {
    const delProduct = await Product.findByIdAndDelete(productId);

    if (!delProduct) {
      return res.status(404).json({ message: "Failed to delete the product" });
    }

    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "An error occurred", error });
  }
};

export const allProduct=async(req,res)=>{

  try {
    const allProduct=await Product.find()

    if (!allProduct) {
      return res.status(401).json(" can't fecth all the products ")
    }
    return res.status(200).send(allProduct)
    
  } catch (error) {
    throw new Error(error.message)
  }
}