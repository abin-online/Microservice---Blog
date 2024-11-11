import { Router } from "express";
import userController from "../controller/userController";

const router: Router = Router();

router.post("/api/userService/signup", userController.signup);
router.post("/api/userService/login", userController.login);

export default router;
