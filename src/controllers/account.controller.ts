import { NextFunction } from "express";
import { validationResult } from "express-validator";
import { formatValidationError } from "../helpers/format-errors";
import { Account } from "../models/account.model";
import accountService from "../services/account.service";
import { Request, Response } from "express";

export class AccountController {
  addAccount(req: Request, res: Response, next: NextFunction) {
    // check for validation errors and return error message if any
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
      message: "successful",
      result: {
        accountNumber: account.accountNumber,
        accountName: account.accountName,
        accountType: account.accountType,
        initialBalance: account.initialBalance,
      },
    });
  }

  getAccountDetailsByAccountNumber(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(formatValidationError(errors.array()));
    }
    const accountNumber = Number(req.params.accountNumber);

    const account = accountService.findAccountByAccountNumber(accountNumber);
    if (!account) {
      return res.status(404).json({
        message: "Account not found",
        details: [`Account with account number ${accountNumber} not found`],
      });
    }
    return res.status(200).json({
      message: "successful",
      result: account,
    });
  }

  getAllAccounts(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(formatValidationError(errors.array()));
    }

    const page = req.query.page as string;
    const pageSize = req.query.pageSize as string;

    const accounts = accountService.getAllAccounts(page, pageSize);

    if (!accounts.data.length) {
      return res.status(404).json({
        message: "No accounts found",
      });
    }
    return res.status(200).json({
      message: "successful",
      result: accounts,
    });
  }
}
