import mongoose from "mongoose";


const connectDB = () => {
  mongoose.connect(process.env.MONGODB_URI);
  console.log("mongoDB database connected");
};

export default connectDB;