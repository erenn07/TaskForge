import express from 'express';
import * as billController from "../controllers/billsController.js"



const router = express.Router();


router.route("/addbill").post(billController.addbill)
router.route("/getbill").get(billController.getBill)




export default router;
