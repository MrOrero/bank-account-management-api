import { Router } from "express";
import { addAccountValidation, getAccountValidation } from "../validation/account.validation";
import { AccountController } from "../controllers/account.controller";

const accountController = new AccountController();
const router = Router();

router.post("/add-account", addAccountValidation(), accountController.addAccount);

router.get("/:accountNumber/details", getAccountValidation(), accountController.getAccount);

export default router;
