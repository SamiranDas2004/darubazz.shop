import mongoose from "mongoose";

const AddressSchema=mongoose.Schema({
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
        type:string
    }
},{
    timestamps:true
})

const Address=mongoose.model("Addres",AddressSchema)
export default Address