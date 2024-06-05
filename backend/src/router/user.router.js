import { Router } from 'express';
import { login, logout, register, verifyUser } from '../controllers/user.controller.js';
import { authenticateJWT } from '../helper/checkLogin.js';
import { verifyToken } from '../helper/checkLogin.js';

const userRouter = Router();

userRouter.route('/signup').post(register);
userRouter.route('/verify').post(verifyUser);
userRouter.route('/login').post(login);
userRouter.route("/logout").get(authenticateJWT, logout);

userRouter.route('/status').get(verifyToken, (req, res) => {
  res.status(200).json({ message: 'Authenticated', userId: req.userId });
});

export default userRouter;
