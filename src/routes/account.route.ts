import { Router } from "express";
import { addAccountValidation } from "../validation/add-account.validation";
import { AccountController } from "../controllers/account.controller";

const accountController = new AccountController();
const router = Router();

router.post("/add-account", addAccountValidation(), accountController.addAccount);

export default router;
