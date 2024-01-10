import express from 'express';

import * as columnController from "../controllers/columnController.js"

import { authenticate } from '../middlewares/auth.js';




const router = express.Router();




router.route("/addColumn").post(columnController.addColumn)

router.route("/getColumn").post(columnController.getColumn)

router.route("/updateColumn").post(columnController.updateColumn)
router.route("/updateColumnName").post(columnController.UpdateColumnName)

router.route("/deleteColumn").post(columnController.DeleteColumn)




export default router;