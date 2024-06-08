import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
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

const Cart = mongoose.model("carts", cartSchema);

export default Cart;
