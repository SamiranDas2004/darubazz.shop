import OrderItem from "../models/orderItem.model";
import Product from "../models/product.model";
export const createOrder = async (req, res) => {
  const { orderId } = req.params;

  const Item = await Product.findOne({ orderId });

  if (!Item) {
    return res.status(401).json("can't find the product by the ID");
  }

  const { productname, price, brand } = Item;

  if (!(productname && price && brand)) {
    return res.status(403).json("can't featch the product details from the Item")  
}

  const newOrder = await OrderItem.create({
    productname,
    price,
    brand,
    status:"confirm order"
  });

  if (!newOrder) {
    return res.status(401).json("Order is not created")
  }

  return res.status(200).json(" successfully ordered the item")
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

return res.status(200).json(" order deleted successfully ")
}

