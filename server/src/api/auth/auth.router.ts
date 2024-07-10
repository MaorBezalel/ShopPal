import { Router } from "express";
import authController from "@/api/auth/auth.controller";

import tryCatchMiddleware from "@/middlewares/tryCatch.middleware";

const router = Router();

router.get('/refresh-token', tryCatchMiddleware(authController.refreshToken));

export default router;