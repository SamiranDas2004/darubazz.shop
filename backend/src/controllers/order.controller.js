import { sendOrderCancelEmail, sendOrderConfirmedEmail } from "../helper/sendVerificationEmail.js";
import OrderItem from "../models/orderItem.model.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";


export const createOrderItem = async (req, res) => {
  const { orderId } = req.params; // Extract productId from URL parameters
  const{userId,username,email}=req.body;

  try {
      // Fetch the product to ensure it exists
      const product = await Product.findById(orderId);
      if (!product) {
          return res.status(404).json({ message: "Product not found" });
      }

      // Create the order item
      const orderItem = new OrderItem({
          productId: product._id,
          user:userId,
          username:username,
          email:email,
          price:product.price,
          brand:product.brand,
          productname:product.productname,
          status: "order conform" // Default status, can be omitted since default is set in schema
      });

      // Save the order item to the database
      const savedOrderItem = await orderItem.save();
console.log(savedOrderItem);
      return res.status(201).json({ message: "Order item created successfully", orderItem: savedOrderItem });
  } catch (error) {
      return res.status(500).json({ message: "An error occurred", error });
  }
};



export const cancelOrder = async (req, res) => {
  const { orderId } = req.params;
  const { username, email } = req.body;

  if (!orderId) {
      return res.status(400).json("Can't get the orderID from the params");
  }

  try {
      const canceledOrder = await OrderItem.findByIdAndDelete(orderId);
      if (!canceledOrder) {
          return res.status(404).json("Can't find the order with this id");
      }

      const cancelOrderEmail = await sendOrderCancelEmail(username, email);
      if (!cancelOrderEmail) {
          return res.status(500).json("Some problem in the Email Section");
      }

      return res.status(200).json(cancelOrderEmail);
  } catch (error) {
      console.error(error);
      return res.status(500).json("An error occurred while canceling the order");
  }
};


export const confirmOrder = async (req, res) => {
  console.log("in confirm");
  const { orderId } = req.params;
  const { username, email } = req.body;

  if (!orderId) {
    return res.status(400).json("Can't get the orderID from the params");
  }

  try {
    // Update the order status to 'confirmed'
    const confirmOrder = await OrderItem.findByIdAndUpdate(orderId, { status: 'confirmed' }, { new: true });

    if (!confirmOrder) {
      return res.status(404).json("Can't find the order with this ID");
    }

    // Send confirmation email
    const confirmOrderEmail = await sendOrderConfirmedEmail(email, username);
    if (!confirmOrderEmail.success) {
      return res.status(500).json("Some problem in the Email Section");
    }

    return res.status(200).json({ message: "Order confirmed successfully", order: confirmOrder });
  } catch (error) {
    console.error(error);
    return res.status(500).json("An error occurred while confirming the order");
  }
}


export const orderPrice = async (req, res) => {
    const { userId} = req.body;

  const {totalPrice}=req.params;
 
    try {
      const validUser = await User.findOne({_id: userId });
      if (!validUser) {
        return res.status(401).json({ message: "User has to login" });
      }
  
      return res.status(200).json({ totalPrice });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };



export const ordersForOneSeller = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find all products created by the seller
    const products = await Product.find({ user: userId });
    if (!products || products.length === 0) {
      return res.status(404).json({ message: 'No products found for this seller' });
    }

    // Extract product IDs
    const productIds = products.map(product => product._id);

    // Find all orders for those products
    const orders = await OrderItem.find({ productId: { $in: productIds } }).populate('productId').populate('user');

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for this seller\'s products' });
    }

    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

  



export const UserOrders = async (req, res) => {
  const { productIds } = req.body;

  if (!Array.isArray(productIds)) {
    return res.status(400).json({ message: 'Product IDs must be an array' });
  }

  try {
    // Find products by their IDs
    const products = await Product.find({ _id: { $in: productIds } });

    if (!products.length) {
      return res.status(404).json({ message: 'No products found' });
    }

    res.status(200).json({
      message: 'Products retrieved successfully',
      data: products
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};
