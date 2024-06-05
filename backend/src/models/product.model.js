import mongoose from "mongoose";

const productSchema=mongoose.Schema(
    {
        productname:{
            type:String,
            required:true
        },
        brand:{
            type:String,

        },
        price:{
            type:Number,
            required:true
        },
        imageUrl:{
            type:String,
        },
        category:{
            type:String,
            default:"daru"
        },
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"users"
        }

    },
{
    timestamps:true
}

)
const Product=mongoose.model("products",productSchema)
export default Product