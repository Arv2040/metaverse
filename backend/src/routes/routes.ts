import express from 'express';
import { userLogin,userRegister } from '../controllers/authcontrollers';
const router  = express.Router();




router.post("/register",userRegister as any);
router.post("/login",userLogin as any);




export default router;
