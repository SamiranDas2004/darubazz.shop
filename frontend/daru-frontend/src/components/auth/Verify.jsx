import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function Verify() {
    const {username}=useParams()

const [user,setUser]=useState({
    username:username,
    verifyCode:''
})

const navigate=useNavigate()
    const handelSubmit=async(e)=>{
     try {
           e.preventDefault();
   
        const   response=await axios.post("http://localhost:8000/api/user/verify",user)
           if (!response) {
            console.log(" server issue");
           }
           if (response.status ===200) {
            navigate('/user/login')
           }
           console.log(response.status);
     } catch (error) {
        console.log(error);
     }
    }
   
  return (
    <div>

<form onClick={handelSubmit} class="max-w-sm mx-auto"> 
  <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
  <input 
  value={user.verifyCode}
  onChange={(e)=>setUser({...user,verifyCode:e.target.value})}
  
  type="email" id="email" aria-describedby="helper-text-explanation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com"/>

  <p id="helper-text-explanation" class="mt-2 text-sm text-gray-500 dark:text-gray-400">We’ll never share your details. Read our <a href="#" class="font-medium text-blue-600 hover:underline dark:text-blue-500">Privacy Policy</a>.</p>

  <button
    type="submit"
    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
>
   VerifyMe
</button>

</form>


    </div>
  )
}

export default Verify