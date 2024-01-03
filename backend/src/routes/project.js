import express from 'express';
import { authenticate } from '../middlewares/auth.js';
import * as projectController from "../controllers/projectController.js"


const router = express.Router();



router.route("/addProject").post(authenticate,projectController.addProject)
router.route("/getProjects").get(projectController.getProjects)

router.route("/projectDetails/:id").post(projectController.projectDetails)
router.route("/deleteProject").post(projectController.deleteProject)



export default router;
