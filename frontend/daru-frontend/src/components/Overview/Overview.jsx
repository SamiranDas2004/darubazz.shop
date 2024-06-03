import React from 'react'
import { useNavigate } from 'react-router-dom'

function Overview() {

    const navigate=useNavigate()
const handelNavigate=()=>{
navigate('/product')    }



  return (
<div className="flex flex-col items-center">
  <h1 className='font-bold font-serif text-5xl'>How it works</h1>
  <div className="flex justify-center space-x-4">
    <div className="flex flex-col items-center p-4">
      <img 
        className="block mb-4" 
        src="https://content.gotoliquorstore.com/images/how-it-works/ic_step1.png" 
        alt="Step 1"
      />
      <h1 className="font-serif font-bold text-3xl">Enter Address</h1>
    </div>
    <div className="flex flex-col items-center p-4">
      <img 
        className="block mb-4" 
        src="https://content.gotoliquorstore.com/images/how-it-works/ic_step2.png" 
        alt="Step 2"
      />
      <h1 className="font-serif font-bold text-3xl">Choose Product</h1>
    </div>
    <div className="flex flex-col items-center p-4">
      <img 
        className="block mb-4" 
        src="https://content.gotoliquorstore.com/images/how-it-works/ic_step3.png" 
        alt="Step 3"
      />
      <h1 className="font-serif font-bold text-3xl">Wait For Delivery</h1>
    </div>
  </div>
  <div className="mt-12">
    <button
      onClick={handelNavigate}
      className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded text-2xl"
      style={{ backgroundColor: '#85004b' }}
    >
      Click here to shop
    </button>
  </div>
</div>

  )
}

export default Overview