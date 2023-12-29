import express from 'express';
import { register, login, logout } from '../controllers/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout',logout)
//router.get('/checkUser',checkUser)
export default router;
