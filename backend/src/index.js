import express from 'express';
import cors from "cors";
import connectDB from '../db/dbconnect.js';
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = 8000;

const corsOptions = {
    origin: "https://darubazz.shop",
    credentials: true, // Allow credentials like cookies, authorization headers
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed methods
    allowedHeaders: ["Content-Type", "Authorization"] // Allow specific headers
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json({ limit: "20kb" }));

app.get("/", (req, res) => {
    res.send("darubazz");
});

import userRouter from './router/user.router.js';
app.use('/api/user', userRouter);

import productRouter from './router/product.router.js';
app.use('/api/product', productRouter);

import orderRouter from './router/order.router.js';
app.use('/api/order', orderRouter);

import addressRouter from './router/address.router.js';
app.use('/api/address', addressRouter);

import paymentRouter from './router/paymentrouter.js';
app.use('/api/payment', paymentRouter);

app.listen(port, async () => {
    await connectDB();
    console.log("The server is listening on port ", port);
});
