import express from 'express';
import { authenticate } from '../middlewares/auth.js';
import * as projectController from "../controllers/projectController.js"


const router = express.Router();



router.route("/addProject").post(projectController.addProject)
router.route("/getProjects").post(projectController.getProjects)
router.route("/getProjectss").get(projectController.getProjects2)


router.route("/projectDetails/:id").post(projectController.projectDetails)
router.route("/deleteProject").post(projectController.deleteProject)


export default router;
