import { sendOrderCancelEmail, sendOrderConfirmedEmail } from "../helper/sendVerificationEmail.js";
import OrderItem from "../models/orderItem.model.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";
import ConfirmOrder from "../models/confirmOrder.model.js";
import Cart from "../models/cart.models.js";

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


export const userConfirmOrders = async (req, res) => {
  const { userId, productIds } = req.body;

  // Log the incoming request
  console.log('Incoming request:', req.body);

  // Check if user exists
  const findUser = await User.findById(userId);
  if (!findUser) {
    return res.status(401).json({ message: 'No user with this userId' });
  }

  // Validate and collect products



  let products = [];
  for (let i = 0; i < productIds.length; i++) {
    let product = await Product.findById(productIds[i]);
    if (product) {
      products.push(product._id);
    } else {
      return res.status(404).json({ message: `Product with ID ${productIds[i]} not found` });
    }
  }


  // Check if the user already has a confirmed order
  const existingOrder = await ConfirmOrder.findOne({ user: userId });

  if (existingOrder) {
    // If user already has an order, update it without removing duplicates
    existingOrder.products = existingOrder.products.concat(products);
    try {
      await existingOrder.save();
      return res.status(200).json({ message: 'Order updated', order: existingOrder });
    } catch (error) {
      return res.status(500).json({ message: 'Error updating order', error: error.message });
    }
  } else {
    // If user does not have an order, create a new one
    const confirmOrder = new ConfirmOrder({
      user: userId,
      products: products
    });

    try {
      await confirmOrder.save();
      return res.status(201).json({ message: 'Order confirmed', order: confirmOrder });
    } catch (error) {
      return res.status(500).json({ message: 'Error confirming order', error: error.message });
    }
  }
};



export const showUserOrders=async(req,res)=>{
try {
    const {userId}=req.params;
 
    if (!userId) {
      return res.status(400).json({message:"userId is't present"})
    }
  
    const findResult= await ConfirmOrder.findOne({user:userId})
  if (!findResult) {
    return res.status(401).json({message:" user not found"})
  }
    return res.status(200).json({message:"ordres fetch successsfuly",findResult})
} catch (error) {
  return res.status(500).json({ message: 'Error in showing orders', error: error.message });
}


}


export const cancelUserOrder = async (req, res) => {
  const { productId, userId } = req.body;

  try {
    // Find the user's order by userId
    const findUserOrder = await ConfirmOrder.findOne({ user: userId });

    if (!findUserOrder) {
      return res.status(404).json({ message: "Order not found for the given user" });
    }

    // Filter out the specified product from the order's products
    const updatedProducts = findUserOrder.products.filter(id => id.toString() !== productId);

    // If no products remain, you might want to handle the order deletion or an empty product list case
    if (updatedProducts.length === 0) {
      await ConfirmOrder.findByIdAndDelete(findUserOrder._id);
      return res.status(200).json({ message: "Order has been canceled and deleted" });
    }

    // Update the order with the remaining products
    findUserOrder.products = updatedProducts;
    await findUserOrder.save();

    return res.status(200).json({ message: "Product removed from the order successfully", updatedOrder: findUserOrder });
  } catch (error) {
    return res.status(500).json({ message: "An error occurred", error });
  }
};














export const showFinalProductsToUser = async (req, res) => {
  try {
    const { productsIds } = req.body;
    console.log(productsIds);

    
    let products = [];
    for (let i = 0; i < productsIds.length; i++) {
      let product = await Product.findById(productsIds[i]);
   

      products.push(product)
   
    }
    
    console.log(products);
    if (products.length === 0) {
      return res.status(200).send("No orders");
    }
    
    return res.status(200).json({ message: "Fetched the orders", products });
  } catch (error) {
    return res.status(500).json({ message: 'Error in fetching all orders', error: error.message });
  }
};

