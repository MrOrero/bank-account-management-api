import { body, param, query } from "express-validator";
import { AccountType } from "../types/enum";
import { isFuture, isValid, parse } from "date-fns";

export const addAccountValidation = () => {
  return [
    body("accountName", "Please enter a valid account name")
      .matches(/^[A-Za-z]+(\s[A-Za-z]+)*$/) // accepts only alphabets with a single whitespace between words
      .withMessage("Account name must have only alphabets")
      .ltrim()
      .rtrim()
      .isLength({ min: 2, max: 40 })
      .withMessage("Account name must have a minimum of 2 alphabets and maximum of 40"),
    body("dateOfBirth", "Please enter a valid Date of birth").custom(value => {
      const dob = parse(value, "dd-MM-yyyy", new Date());

      if (!isValid(dob)) {
        throw new Error("Invalid date (dd-MM-yyyy)");
      }

      if (isFuture(dob)) {
        throw new Error("Date of birth cannot be in the future");
      }

      return true;
    }),
    body("accountType", "Please enter a valid Account Type").custom(value => {
      if (!(value in AccountType)) {
        throw new Error("Account Type must be either SAVINGS, CURRENT, FIXED or CREDIT");
      }
      return true;
    }),

    body("initialBalance", "Please enter a Initial Balance")
      .isFloat({ min: 0 })
      .withMessage("Initial balance must be a non-negative number"),
  ];
};

export const getAccountValidation = () => {
  return [
    param("accountNumber", "Please enter a valid account number")
      .isNumeric()
      .withMessage("Account number must be a number")
      .isLength({ min: 10, max: 10 })
      .withMessage("Account number must be 10 digits"),
  ];
};

export const getAllAccountsValidation = () => {
  return [
    query("page", "Please enter a valid page number")
      .optional()
      .isNumeric()
      .withMessage("Page number must be a number"),
    query("pageSize", "Please enter a valid page size")
      .optional()
      .isNumeric()
      .withMessage("Page size must be a number"),
  ];
};
