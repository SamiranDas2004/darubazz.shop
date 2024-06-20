import Cart from "../models/cart.models.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js"; // Assuming you have a User model

export const createCart = async (req, res) => {
  try {
    const { productId, userId } = req.body;

    if (!productId || !userId) {
      return res.status(400).json("Product ID and User ID are required");
    }

    const findProduct = await Product.findById(productId);
    if (!findProduct) {
      return res.status(404).json("Product not found");
    }

    const findUser = await User.findById(userId);
    if (!findUser) {
      return res.status(404).json("User not found");
    }

    const cart = await Cart.create({
      products: [findProduct._id],
      user: findUser._id
    });

    return res.status(200).json(cart);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};




export const getAllCartItems = async (req, res) => {
    try {
      const { userId } = req.params;
  
      if (!userId) {
        return res.status(400).json("User ID is required");
      }
  
      const userCart = await Cart.find({ user: userId }).populate('products');
      if (!userCart) {
        return res.status(404).json("No cart found for this user");
      }
  
      return res.status(200).json(userCart);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };


  export const reMoveFromCart = async (req, res) => {
    try {
      const { productId } = req.params;
      const { userId } = req.body;
  
      if (!productId || !userId) {
        return res.status(400).json({ message: "ProductId and UserId are required" });
      }
  
      const userCart = await Cart.findOneAndUpdate(
        { user: userId },
        { $pull: { products: productId } }, // Ensure this matches the schema of your products array
        { new: true }
      );
  
      if (!userCart) {
        return res.status(404).json({ message: "No cart found for this user" });
      }
  
      return res.status(200).json({ message: "Product removed from cart", userCart });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  };
  
  
  


  export const totalCartItems = async (req, res) => {
    const { userId } = req.body;
  
    if (!userId) {
      return res.status(400).json("userId is missing");
    }
  
    try {
      // Find all cart documents for the given user ID
      const userCarts = await Cart.find({ user: userId });
      if (!userCarts || userCarts.length === 0) {
        return res.status(404).json("Cart for user not found");
      }
  
      // Calculate the total number of items in all carts
      const totalItems = userCarts.reduce((acc, cart) => acc + cart.products.length, 0);
  
      return res.status(200).json({ totalItems });
    } catch (error) {
      console.error(error);
      return res.status(500).json("Internal Server Error");
    }
  };
  



export const deleteUserCarts = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json("userId is missing");
  }

  try {
    // Delete all cart documents for the given user ID
    const result = await Cart.deleteMany({ user: userId });
    
    if (result.deletedCount === 0) {
      return res.status(404).json("Cart for user not found");
    }

    return res.status(200).json({ message: `${result.deletedCount} carts deleted` });
  } catch (error) {
    console.error(error);
    return res.status(500).json("Internal Server Error");
  }
};
