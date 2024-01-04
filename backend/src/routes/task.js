import express from 'express';
import * as taskController from "../controllers/taskController.js"
import { authenticate } from '../middlewares/auth.js';

const router = express.Router();

router.route("/addTask").post(taskController.addTask)
router.route("/getTask").post(taskController.getTask)
router.route("/updateTask").post(taskController.updateTask)
router.route("/deleteTask").post(taskController.deleteTask)

export default router;