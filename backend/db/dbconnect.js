import mongoose from "mongoose";

const mongodbURL =
  "mongodb+srv://samiran4209:Samiran123@cluster0.jk5bxgv.mongodb.net/";

const connectDB = () => {
  mongoose.connect(mongodbURL);
  console.log("mongoDB database connected");
};

export default connectDB;