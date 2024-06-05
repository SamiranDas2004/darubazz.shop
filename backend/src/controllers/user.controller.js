import { json } from "express";
import { sendEmail } from "../helper/sendVerificationEmail.js";
import User from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
export const register=async(req,res)=>{
     // get user details from frontend
  // validation - not empty
  // check if user already exists: username, email
  // check for images, check for avatar
  // upload them to cloudinary, avatar
  // create user object - create entry in db
  // remove password and refresh token field from response
  // check for user creation
  // return res
try {
    

    const verifyCode= Math.floor(Math.random() * (9870 + 1)).toString();
    const {username,email,password}=req.body
    
    if (!(username&& email&& password)) {
      return  res.send("all the fields are required").status(400)
    }
    
    const hashedPassword=await bcrypt.hash(password,10)
    const userExists=await User.findOne({
       username
    })
    if (userExists) {
       return res.status(409).json("user already exist")
    }
    
   const user= await User.create({
        username,email,password:hashedPassword,verifyCode:verifyCode
    })


const emailResponse=sendEmail(email,username,verifyCode)

if (!emailResponse) {
        return res.send("problem in  email section").status(401)
}
    return res.send("the user is created successflly").status(200)
    

    
} catch (error) {
    throw new Error(error.message)
}

}

 // Ensure the correct path to your User model

export const verifyUser = async (req, res) => {
  try {
    const { username, verifyCode } = req.body;

    // Uncomment this if the username needs to be decoded
    // const decodedUsername = decodeURIComponent(username);

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).send("User not found");
    }

    const isCodeValid = user.verifyCode === verifyCode;

    if (isCodeValid) {
      user.isVerified = true;

      await user.save();

      return res.status(200).send("User verified successfully");
    } else {
      return res.status(400).send("Invalid verification code");
    }
  } catch (error) {
    console.log("Error in verify:", error);
    return res.status(500).send({ error: error.message });
  }
};


export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User not found with this email" });
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(401).json({ message: "Password is not correct" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '6h' });

    // Set token in HTTP-only cookie
    res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict' });

    // Return the token in the response JSON
    return res.status(200).json({ message: "User logged in successfully", user, token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


export const logout = (req, res) => {
  try {
    console.log("in logout");
    res.clearCookie('token', { httpOnly: true, secure: true, sameSite: 'strict' });
    return res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};



