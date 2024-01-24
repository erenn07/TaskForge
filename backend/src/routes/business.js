import express from 'express';
import * as businessController from "../controllers/businessController.js"



const router = express.Router();


router.route("/addbusiness").post(businessController.addBusiness)
router.route("/getbusiness").get(businessController.getBusiness)



export default router;
