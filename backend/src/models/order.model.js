import mongoose from "mongoose";

const OrderSchema=mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    productPrice:{
        type:Number,
        required:true
    },
    


},{timestamps:true})
const Order=mongoose.model("Order",OrderSchema)
export default Order