import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast'; 

function Registration() {
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    const register = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("https://darubazz-in.onrender.com/api/user/signup", user);
            if (response.data && response.status === 200) {
                toast.success("Signup Successful");
                setTimeout(() => {
                    navigate('/');
                }, 2500);
            } else {
                toast.error("Registration failed. Please try again later.");
            }
            console.log(response.data);
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
                console.log(error.response.data);
            } else if (error.request) {
                toast.error("No response received from the server.");
                console.log(error.request);
            } else {
                toast.error("An unexpected error occurred.");
                console.log('Error', error.message);
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-200 to-purple-200 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-xl border border-gray-200">
                <div>
                    <h2 className="text-center text-4xl font-extrabold text-gray-900 mb-6">
                        Register an account
                    </h2>
                    <p className="text-center text-gray-600 mb-8">Create a new account to get started.</p>
                </div>
                <form onSubmit={register} className="space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                            <input
                                value={user.username}
                                onChange={(e) => setUser({ ...user, username: e.target.value })}
                                type="text" id="username"
                                className="appearance-none rounded-md block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="Username" required
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                            <input
                                value={user.email}
                                onChange={(e) => setUser({ ...user, email: e.target.value })}
                                type="email" id="email"
                                className="appearance-none rounded-md block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="Email address" required
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                value={user.password}
                                onChange={(e) => setUser({ ...user, password: e.target.value })}
                                type="password" id="password"
                                className="appearance-none rounded-md block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="Password" required
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
                        >
                            Register
                        </button>
                    </div>
                </form>
                <Toaster position="top-right" reverseOrder={false} />
            </div>
        </div>
    );
}

export default Registration;
