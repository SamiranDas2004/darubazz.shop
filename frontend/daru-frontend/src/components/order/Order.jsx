import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import BasicRating from "../allProducts/Rate";

function Order() {
  const [order, setOrder] = useState(null);
  const [message, setMessage] = useState("");
  const [ratingValue, setRatingValue] = useState(0); // Add state for rating value
  const { id } = useParams();
  const [isAllowdornot, setIsAllowedOrnot] = useState('');
  const navigate = useNavigate();
console.log(ratingValue);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/product/findbyid/${id}`
        );
        setOrder(response.data);
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };

    fetchOrder();
  }, [id]);

  const handelCart = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("User must be logged in");
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      console.log("User information from token", decodedToken.userId);

      const userId = decodedToken.userId;
      const productId = order._id;

      const response = await axios.post(
        "http://localhost:8000/api/user/cart",
        {
          productId,
          userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.status);

      if (response.status === 200) {
        setMessage("Added to cart");
      } else {
        setMessage("Cannot create the cart");
      }
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.message || error.message}`);
    }
  };

  const IsAllowedRating = async (id,value) => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("User must be logged in");
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      console.log("User information from token", decodedToken.userId);

      const userId = decodedToken.userId;
      const response = await axios.post(
        "http://localhost:8000/api/order/ratingallowornot",
        { userId, Id: id }
      );

      const sendRating= await axios.post("http://localhost:8000/api/order/giverating",{userId, productId:id,value:ratingValue})
      console.log(sendRating.data);
      
console.log(response.data);

      setIsAllowedOrnot(response.data);
      console.log(isAllowdornot);
    } catch (error) {
      console.log(error);
    }
  };

  if (!order) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-md mx-auto rounded overflow-hidden shadow-lg">
      {message && (
        <p className="bg-red-100 text-green-500 py-2 px-4 mb-4">{message}</p>
      )}
      <div className="px-6 py-4">
        <div className="aspect-w-16 aspect-h-9">
          <img
            className="object-cover w-full h-full"
            src={order.imageUrl}
            alt={order.productname}
          />
        </div>
        <div onClick={() => IsAllowedRating(order._id)}>
          <p className=" font-bold font-serif">    Rate This Product: {isAllowdornot ? `Your Gave ${ratingValue}⭐` : "Not Allowed"}</p>
          <BasicRating value={ratingValue} setValue={setRatingValue} />
          {/* Pass props */}
        </div>
     
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{order.productname}</div>
        <p className="text-gray-700 text-base">{order.description}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <p className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-green-500 mr-2 mb-2">
          Price:{order.price}
        </p>
        <p className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {order.category}
        </p>
        <p className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {order.brand}
        </p>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handelCart}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default Order;
