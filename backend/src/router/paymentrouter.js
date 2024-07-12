import { Router } from 'express';
import paymentHandler from '../controllers/payment.controller.js';

const paymentRouter = Router();

paymentRouter.route('/payment').post(paymentHandler);

export default paymentRouter;
