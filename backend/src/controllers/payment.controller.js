import Razorpay from 'razorpay';
import dotenv from 'dotenv';

dotenv.config();

const paymentHandler = async (req, res) => {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_API_KEY,
      key_secret: process.env.RAZORPAY_API_SECRET
    });

    const options = {
      amount: req.body.amount,
      currency: req.body.currency,
      receipt: req.body.receipt,
      payment_capture: req.body.payment_capture
    };

    const order = await razorpay.orders.create(options);

    if (!order) {
      return res.status(500).send("Error creating order");
    }

    res.json(order);
  } catch (error) {
    console.error('Error creating order:', error); // Log the actual error
    return res.status(500).send(error.message);
  }
};

export default paymentHandler;
