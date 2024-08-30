import Address from "../models/address.model.js";
import User from "../models/user.model.js";

export const createAddress = async (req, res) => {
    try {
        const { username, state, city, zipcode, location, contactNumber, userId } = req.body;

        console.log(username, state, city, zipcode, location, contactNumber, userId);
        // Check if any required field is missing
        if (!username || !state || !city || !zipcode || !location || !contactNumber ) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if ( !userId) {
            return res.status(400).json({message:"Login Please"})
        }

        // Find the user by userId
        const findUser = await User.findById(userId);
        if (!findUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // Create the address
        const address = await Address.create({
            userId: findUser._id,
            username,
            state,
            city,
            zipcode,
            location,
            contactNumber
        });

        // Check if the address was successfully created
        if (!address) {
            return res.status(500).json({ message: "Failed to create address" });
        }

        return res.status(201).json({ message: "User address created successfully", address });
    } catch (error) {
        console.error("Error creating address:", error); // Log the error for debugging
        return res.status(500).json({ message: "Internal server error" });
    }
};
