import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast'; 

function Verify() {
    const { username } = useParams();

    const [user, setUser] = useState({
        username: username,
        verifyCode: ''
    });

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/api/user/verify", user);
            if (response.status === 200) {
              toast.success("Verification Successful");
              setTimeout(()=>{navigate('/user/login')},2500)  
            }
            console.log(response.status);
        } catch (error) {
          toast.error(error.response.data.message);
            console.error(error);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-500 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-center text-3xl font-extrabold text-gray-900">Verify Your Account</h2>
                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div>
                        <label htmlFor="verifyCode" className="block mb-2 text-sm font-medium text-gray-900">Verification Code</label>
                        <input
                            value={user.verifyCode}
                            onChange={(e) => setUser({ ...user, verifyCode: e.target.value })}
                            type="text" id="verifyCode"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 focus:outline-none focus:ring-2"
                            placeholder="Enter your verification code"
                            required
                        />
                    </div>

                    <div className="flex items-center justify-between mt-4">
                        <p className="text-sm text-gray-500">We'll send you a verification code to your email.</p>
                    </div>

                    <button
                        type="submit"
                        className="w-full mt-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 text-white font-medium rounded-lg text-sm px-6 py-3 transition duration-300 ease-in-out"
                    >
                        Verify Me
                    </button>
                    <Toaster position="top-right" reverseOrder={false} />
                </form>
            </div>
        </div>
    );
}

export default Verify;
