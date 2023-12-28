import express from 'express';
import { authenticate } from '../middlewares/auth.js';
import * as projectController from "../controllers/projectController.js"


const router = express.Router();



router.route("/addProject").post(authenticate,projectController.addProject)
router.route("/getProject").get(authenticate,projectController.getProject)
router.route("/getProjectDetails").get(authenticate,projectController.getProjectDetails)



export default router;
