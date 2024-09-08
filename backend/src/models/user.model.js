import mongoose from 'mongoose';

const UserSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            match: [/.+\@.+\..+/, 'Please use a valid email address']
        },
        password: {
            type: String,
            required: true
        },
        contactNumber: {
            type: Number,
        },
        verifyCode: {
            type: String,
        },
        verifyCodeExpiry: {
            type: Date // Corrected field name and data type
        },
        isVerified: {
            type: Boolean,
            default:false
        },
    },
    { timestamps: true }
);



const User = mongoose.model("users", UserSchema);
export default User;
