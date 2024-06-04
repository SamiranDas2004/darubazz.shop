import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

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
            const response = await axios.post("http://localhost:8000/api/user/signup", user);
            if (!response) {
                console.log("No response from server");
            }
            if (response.status === 200) {
                navigate(`/user/verification/${user.username}`);
            }
            console.log(response.data);
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <div className='grid grid-cols-6'>
            <form onSubmit={register} className='grid col-span-1 max-w-sm mx-auto'>
                <div className='mb-5'>
                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                    <input
                        value={user.username}
                        onChange={(e) => setUser({ ...user, username: e.target.value })}
                        type="text" id="username"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        placeholder="Username" required
                    />
                </div>
                <div className='mb-5'>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        type="email" id="email"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        placeholder="email" required
                    />
                </div>
                <div className='mb-5'>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                    <input
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                        type="password" id="password"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Register new account
                </button>
            </form>
            <div className='grid col-span-4'>
                <img src='https://content.gotoliquorstore.com/images/Pickup-Delivery1.jpg' alt="Background"/>
            </div>
        </div>
    )
}

export default Registration;
