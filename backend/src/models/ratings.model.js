import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({
    user: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true
    }],
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'products',
      required: true
    },
    value:[{
        type:Number,
        default:0
    }]
  }, { timestamps: true });
  
  const Rating = mongoose.model("ratings", ratingSchema);
  export default Rating;