import express from 'express';
import * as customerController from "../controllers/customerController.js"
import { authenticate } from '../middlewares/auth.js';

const router = express.Router();

router.route("/addCustomer").post(customerController.addCustomer)
router.route("/getCustomers").get(customerController.getCustomers)
router.route("/deleteCustomers").get(customerController.deleteCustomer)
router.route("/updateCustomer/:id").post(customerController.updateCustomer)
export default router;