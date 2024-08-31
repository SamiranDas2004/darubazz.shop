import mongoose from "mongoose";
import Product from "../models/product.model.js";
import { uploadOnCloudinary } from "../helper/uploadtocloudinary.js";
import User from "../models/user.model.js";

export const createProduct = async (req, res) => {
  try {
      if (!req.body) {
          return res.status(400).json({ message: "Request body is empty" });
      }

      const { username, productname, price, category, brand } = req.body;

      if (!productname || !price || !category || !brand || !username) {
          return res.status(400).json({ message: "All fields (productname, price, category, brand) are required" });
      }

      const imagePath = req.file?.path;
      if (!imagePath) {
          return res.status(409).json({ message: "Image was not uploaded" });
      }

   const  findUser =await User.findOne({username})
   if (!findUser) {
   return res.status(402).json(" cant find the user ")
   }
console.log(findUser);
      const uploadResult = await uploadOnCloudinary(imagePath);
      const imageUrl = uploadResult.secure_url;  // Extract the secure_url

      if (!imageUrl) {
          return res.status(409).json({ message: "Failed to upload on cloudinary" });
      }


      const product = await Product.create({
          productname,
          price,
          category,
          brand,
          imageUrl,
          user: findUser._id // Convert user to ObjectId
      });

      if (!product) {
          return res.status(401).json({ message: "Product creation failed" });
      }

      return res.status(200).json(product);
  } catch (error) {
      return res.status(500).json({ message: "An error occurred", error: error.message });
  }
};






export const CreatedByOnuser = async (req, res) => {
  try {
    const { username } = req.query;  // Use req.query to get the username from query parameters

    // Find the user by username
    const findUser = await User.findOne({ username });

    // Check if user exists
    if (!findUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find products created by the user
    const productsOfOneUser = await Product.find({ user: findUser._id });

    // Check if products exist
    if (!productsOfOneUser || productsOfOneUser.length === 0) {
      return res.status(404).json({ message: "No products found for this user" });
    }

    // Return the products
    return res.status(200).json(productsOfOneUser);
  } catch (error) {
    return res.status(500).json({ message: "An error occurred", error: error.message });
  }
};





export const findbyid = async (req, res) => {
  const { productId } = req.params; // Take the productId from the URL parameters

  try {
    const product = await Product.findById(productId); // Use findById instead of findbyid

    if (!product) {
      return res.status(400).json({ message: "Can't find the product with the given ID" });
    }

    return res.status(200).send(product);
  } catch (error) {
    return res.status(500).json({ message: "An error occurred", error });
  }
};


export const updateProduct = async (req, res) => {
  const { productId } = req.params; // Extract productId from URL parameters

  if (!productId) {
    return res.status(402).json("Product ID is not found");
  }
  const { productname, price, category, brand, imageUrl } = req.body;
console.log(productname,productId);

  try {
    // Find the product by ID
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(400).json({ message: "Can't find the product with the given ID" });
    }

    // Check if there's any data to update
    if (!productname && !price && !category && !brand && !imageUrl) {
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
    console.log(error);
    
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


export const getProductByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    if (!category) {
      return res.status(400).json({ error: "No category provided" });
    }

    const products = await Product.find({ category });

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    return res.status(200).json({ products });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


