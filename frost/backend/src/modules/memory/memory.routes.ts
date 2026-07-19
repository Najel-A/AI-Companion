import { Router } from "express";
import * as memoryController from "./memory.controller";

const router = Router();

router.get("/search", memoryController.search);

export default router;
