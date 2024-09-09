import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Star, ShoppingCart, Loader } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Order = () => {
  const [order, setOrder] = useState(null);
  const [message, setMessage] = useState("");
  const [ratingValue, setRatingValue] = useState(0);
  const [isAllowedToRate, setIsAllowedToRate] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`https://darubazz-in.onrender.com/api/product/findbyid/${id}`);
        setOrder(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching order:", error);
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  const handleCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("User must be logged in");
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      const productId = order._id;

      const response = await axios.post(
        "https://darubazz-in.onrender.com/api/user/cart",
        { productId, userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        setMessage("Added to Cart");
      } else {
        setMessage("Cannot create the cart");
      }
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleRating = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("User must be logged in");
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
          { userId, productId: id, value: ratingValue }
        );
        setIsAllowedToRate(true);
        setMessage("Rating submitted successfully");
      } else {
        setIsAllowedToRate(false);
        setMessage("You are not allowed to rate this product");
      }
    } catch (error) {
      console.error(error);
      setMessage("Error submitting rating");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!order) {
    return <Alert variant="destructive">Failed to load product information</Alert>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{order.productname}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="aspect-w-1 aspect-h-1">
              <img
                src={order.imageUrl}
                alt={order.productname}
                className="object-cover rounded-lg shadow-lg"
              />
            </div>
            <div>
              <p className="text-gray-600 mb-4">{order.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary">Price: ${order.price}</Badge>
                <Badge variant="outline">{order.category}</Badge>
                <Badge variant="outline">{order.brand}</Badge>
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Rate This Product</h3>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-6 h-6 cursor-pointer ${
                        star <= ratingValue ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                      onClick={() => setRatingValue(star)}
                    />
                  ))}
                </div>
                <Button onClick={handleRating} className="mt-2">
                  Submit Rating
                </Button>
              </div>
              {isAllowedToRate && (
                <Alert>
                  <AlertDescription>You rated this product {ratingValue} stars</AlertDescription>
                </Alert>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Button onClick={handleCart} className="w-full">
            <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
          </Button>
        </CardFooter>
      </Card>
      {message && (
        <Alert className="mt-4" variant={message.includes("Error") ? "destructive" : "default"}>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default Order;