import OrderItem from "../models/orderItem.model.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";


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
    const { userId} = req.body;
  const {totalPrice}=req.params;
  console.log(totalPrice);
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
    const { userId } = req.query;

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

  


