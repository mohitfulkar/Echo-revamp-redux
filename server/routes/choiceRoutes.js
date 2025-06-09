// routes/categoryRoutes.js
import express from "express";
import { getCategories, getPanelists } from "../controllers/choiceController.js";
const router = express.Router();

router.get("/categories", getCategories);
router.get("/panelists", getPanelists);

export default router;
