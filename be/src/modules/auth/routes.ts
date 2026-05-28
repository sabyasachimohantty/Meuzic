import { Router } from "express";
import { loginController, logoutController, refreshController, signupController } from "./controller.js";

const router = Router();

router.post("/signup", signupController);

router.post("/login", loginController);

router.post("/refresh", refreshController);

router.get("/logout", logoutController);

export default router;