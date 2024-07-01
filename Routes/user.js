import { createUser, handleUserSignin } from "../controllers/user.js";
import express from 'express';
const router=express.Router();


router.post('/',createUser);

router.post('/login',handleUserSignin);
export default router;