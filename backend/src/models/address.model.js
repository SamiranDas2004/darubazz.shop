import mongoose from "mongoose";

const AddressSchema=mongoose.Schema({
    userId:{
type:mongoose.Schema.Types.ObjectId,
ref:'users'
    },
    username:{
       type:String
       
    },
    state:{
        type:String,
    },
    city:{
        type:String
    },
    zipcode:{
        type:Number
    },
    locatioon:{
        type:String
    },
    contactNumber:{
        type:Number
    }
},{
    timestamps:true
})

const Address=mongoose.model("Addres",AddressSchema)
export default Address