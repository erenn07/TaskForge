import express from 'express';
import * as businessController from "../controllers/businessController.js"



const router = express.Router();


router.route("/addbusiness").post(businessController.addBusiness)
router.route("/getbusiness").get(businessController.getBusiness)
router.route("/deletebusiness").get(businessController.deleteBusiness)
router.route("/updatebusiness/:id").post(businessController.updateBusiness)



export default router;
