import { Router } from "express";
import {  createAddress } from "../controllers/address.controller.js";

const addressRouter=Router()

addressRouter.route("/orderaddress").post(createAddress)

export default addressRouter