import { NextFunction } from "express";
import { validationResult } from "express-validator";
import { formatValidationError } from "../helpers/format-errors";
import { Account } from "../models/account.model";
import accountService from "../services/account.service";
import { Request, Response } from "express";

export class AccountController {
  addAccount(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(formatValidationError(errors.array()));
    }
    const { accountName, dateOfBirth, accountType, initialBalance } = req.body;
    const account = new Account(accountName, dateOfBirth, accountType, initialBalance);

    const addedAccountIndex = accountService.createAccount(account);

    if (!addedAccountIndex) {
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
    return res.status(201).json({
      message: "Account created successfully",
      data: {
        accountNumber: account.accountNumber,
        accountName: account.accountName,
        accountType: account.accountType,
        initialBalance: account.initialBalance,
      },
    });
  }
}
