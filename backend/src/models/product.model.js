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
            type:String,
            required:true
        },
        imageUrl:{
            type:String,
        },
        category:{
            type:String,
            default:"daru"
        },
        createdBy:{
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