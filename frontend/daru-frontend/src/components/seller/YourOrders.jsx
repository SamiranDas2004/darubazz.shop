import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function YourOrders() {
    const [orders, setOrders] = useState([]);
    const { userId } = useParams();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.post("http://localhost:8000/api/order/orders", { userId });
                if (!response.data) {
                    console.log("Error in POST method");
                }
                console.log(response.data);
                setOrders(response.data);
            } catch (error) {
                throw new Error(error.message);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div>
            {orders.map((order, index) => (
                <div key={index}>
                    <div>Product Name: {order.productId.productname}</div>
                    <div>Brand: {order.productId.brand}</div>
                    <div>Price: {order.price}</div>
                    <img src={order.productId.imageUrl} alt={order.productId.productname} style={{ maxWidth: "100px" }} />
                    <div>Category: {order.productId.category}</div>
                </div>
            ))}
        </div>
    );
}

export default YourOrders;
