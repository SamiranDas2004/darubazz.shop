import mongoose from "mongoose";

const OderItemSchema=mongoose.Schema({
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"products"
    },
    price:{
        type:Number
    },
    username:{
type:String
    },
    email:{
type:String
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    brand:{
        type:String
    },
    productname:{

    },
    status:{
        type:String,
        default:"pending"
    },

},
    {timestamps:true})

    const OrderItem=mongoose.model("orderitems",OderItemSchema)

    export default OrderItem