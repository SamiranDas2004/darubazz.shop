import mongoose from "mongoose";

const confirmOrderSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true
    },
    products: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'products',
      required: true
    }]
  }, { timestamps: true });
  
  const ConfirmOrder = mongoose.model("confirmorders", confirmOrderSchema);
  export default ConfirmOrder;