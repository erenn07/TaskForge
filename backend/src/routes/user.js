import express from 'express';
import { authenticate } from '../middlewares/auth.js';
import * as userController from "../controllers/userController.js"


const router = express.Router();

router.get('/profile', authenticate, (req, res) => {
  console.log(req.user)
  res.json({ message: `Welcome ${req.user.firstName}` });
});

router.route("/getProfile").get(authenticate,userController.getProfile)
router.route("/getInfo").get(userController.getInfo)



export default router;
