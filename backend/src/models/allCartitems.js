import mongoose from "mongoose";

const allCartSchema = new mongoose.Schema({
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products'
      }
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true
    }
  }, { timestamps: true });
  
  const Cart = mongoose.model("allcarts", allCartSchema);
  
  export default Cart;