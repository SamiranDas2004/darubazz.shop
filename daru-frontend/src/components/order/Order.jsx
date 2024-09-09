import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import BasicRating from "../allProducts/Rate";
import toast, { Toaster } from 'react-hot-toast';

function Order() {
  const [order, setOrder] = useState(null);
  const [message, setMessage] = useState("");
  const [ratingValue, setRatingValue] = useState(0);
  const { id } = useParams();
  const [isAllowdornot, setIsAllowedOrnot] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(
          `https://darubazz-in.onrender.com/api/product/findbyid/${id}`
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
      const userId = decodedToken.userId;
      const productId = order._id;

      const response = await axios.post(
        "https://darubazz-in.onrender.com/api/user/cart",
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

      if (response.status === 200) {
        toast.success("Added To Cart");
      } else {
        toast.error(response.data);
      }
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.message || error.message}`);
    }
  };

  const IsAllowedRating = async (id, value) => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      console.log("User must be logged in");
      return;
    }
  
    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;

      const response = await axios.post(
        "https://darubazz-in.onrender.com/api/order/ratingallowornot",
        { userId, Id: id }
      );
  
      if (response.data) {
        const sendRating = await axios.post(
          "https://darubazz-in.onrender.com/api/order/giverating",
          { userId, productId: id, value: value }
        );
        setIsAllowedOrnot(true);
      } else {
        setIsAllowedOrnot(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!order) {
    return <p className="text-center text-gray-600">Loading...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <Toaster position="top-right" reverseOrder={false} />

      {message && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {message}
        </div>
      )}

      <div className="bg-gray-100 p-6">
        <div className="aspect-w-16 aspect-h-9">
          <img
            className="w-full h-full object-cover rounded-md"
            src={order.imageUrl}
            alt={order.productname}
          />
        </div>
        <div className="mt-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{order.productname}</h2>
          <p className="text-gray-600 mb-4">{order.description}</p>

          <div className="mb-4">
            <span className="bg-gray-200 text-green-500 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded">
              Price: ${order.price}
            </span>
            <span className="bg-gray-200 text-gray-700 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded">
              {order.category}
            </span>
            <span className="bg-gray-200 text-gray-700 text-sm font-semibold px-2.5 py-0.5 rounded">
              Brand: {order.brand}
            </span>
          </div>

          <div
            onClick={() => IsAllowedRating(order._id, ratingValue)}
            className="cursor-pointer bg-gray-100 p-4 rounded-md shadow-inner"
          >
            <p className="text-lg font-serif text-gray-800">
              {isAllowdornot ? `You Gave ${ratingValue} ⭐` : "Rate This Product"}
            </p>
            <BasicRating value={ratingValue} setValue={setRatingValue} />
          </div>

          <button
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
            onClick={handelCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Order;
