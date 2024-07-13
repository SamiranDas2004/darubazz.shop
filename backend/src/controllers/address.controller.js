import Address from "../models/address.model.js";
import User from "../models/user.model.js";

export const createAddress = async (req, res) => {
    try {
        const { username, state, city, zipcode, location,contactNumber } = req.body;

        // Check if any required field is missing
        if (!username || !state || !city || !zipcode || !location) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Find the user by username
        const findUser = await User.findOne({ username });
        if (!findUser) {
            return res.status(404).json("User not found");
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
        throw new Error(error.message)
    }
};


