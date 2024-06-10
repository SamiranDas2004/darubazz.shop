import OrderItem from "../models/orderItem.model.js";
import Product from "../models/product.model.js";


export const createOrderItem = async (req, res) => {
  const { orderId } = req.params; // Extract productId from URL parameters
  const{userId}=req.body;

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
          price:product.price,
          brand:product.brand,
          productname:product.productname,
          status: "order conform" // Default status, can be omitted since default is set in schema
      });

      // Save the order item to the database
      const savedOrderItem = await orderItem.save();

      return res.status(201).json({ message: "Order item created successfully", orderItem: savedOrderItem });
  } catch (error) {
      return res.status(500).json({ message: "An error occurred", error });
  }
};


export const cancelOrder=async(req,res)=>{
    const{orderId}=req.params
    if (!orderId) {
        return res.status(402).json("can't get the orderID from the params")
    }

    const cancelOrder= await OrderItem.findbyIdAndDelete(orderId)
    if (!cancelOrder) {
        return res.status(402).json("cant find the order with this id")
    }

return res.status(200).json(" cancel order successfully ")
}




export const orderPrice = async (req, res) => {
  const { userId } = req.body;

  try {
    // Find all order items for the given userId
    const userOrders = await OrderItem.find({ user: userId });

    if (!userOrders || userOrders.length === 0) {
      return res.status(403).json("Can't find the user's orders");
    }

    // Calculate the total price of all products in the user's orders
    const totalProductPrice = userOrders.reduce((total, order) => total + order.price, 0);

    return res.status(200).json({ totalProductPrice });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
