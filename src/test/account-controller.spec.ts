// AccountController.test.ts
import { Request, Response, NextFunction } from "express";
import { AccountController } from "../controllers/account.controller";
import accountService from "../services/account.service";
import { Account } from "../models/account.model";

let accountController: AccountController;

describe("AccountController", () => {
  beforeEach(() => {
    accountController = new AccountController();
  });

  describe("addAccount tests", () => {
    it("should add an account and return a 201 response and account data if successful", async () => {
      // Set up
      const req = {
        body: {
          accountName: "John Doe",
          dateOfBirth: "1990-01-01",
          accountType: "Savings",
          initialBalance: 1000,
        },
      } as Request;
      const res: Response & {
        json: jest.Mock<any, [any]>;
        // Add other properties as needed
      } = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as any;
      const next = jest.fn() as NextFunction;

      // Call the method
      await accountController.addAccount(req, res, next);

      const addedAccountResponse = res.json.mock.calls[0][0]; //  capture the response object that was passed to the res.json() method

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(addedAccountResponse.message).toBe("successful");
      expect(addedAccountResponse.result).toEqual(
        expect.objectContaining({
          accountName: "John Doe",
          accountType: "Savings",
          initialBalance: 1000,
        })
      );
      expect(typeof addedAccountResponse.result.accountNumber).toBe("number");
      expect(addedAccountResponse.result.accountNumber.toString().length).toBe(10);
    });
  });
  describe("getAccountDetailsByAccountNumber tests", () => {
    let accountController: AccountController;
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let mockNext: jest.Mock<NextFunction>;

    beforeEach(() => {
      accountController = new AccountController();
      mockRequest = {
        params: {
          accountNumber: "12345",
        },
      };
      mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      mockNext = jest.fn();
    });

    it("should return account details when account is found", () => {
      const sampleAccount: Account = new Account("John Doe", "1990-01-01", "SAVINGS", 1000);
      //
      jest.spyOn(accountService, "findAccountByAccountNumber").mockReturnValue(sampleAccount);

      accountController.getAccountDetailsByAccountNumber(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "successful",
        result: sampleAccount,
      });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it("should return a 404 response when account is not found", () => {
      jest.spyOn(accountService, "findAccountByAccountNumber").mockReturnValue(undefined);

      // Call the method
      accountController.getAccountDetailsByAccountNumber(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      // Assertions
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Account not found",
        details: [`Account with account number ${mockRequest.params!.accountNumber} not found`],
      });
      expect(mockNext).not.toHaveBeenCalled();
    });
  });
  describe("getAllAccounts test", () => {
    let accountController: AccountController;
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let mockNext: jest.Mock<NextFunction>;

    beforeEach(() => {
      accountController = new AccountController();
      mockRequest = {
        query: {
          page: "1",
          pageSize: "10",
        },
      };
      mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      mockNext = jest.fn();
    });

    it("should return accounts when valid page and pageSize are provided", () => {
      const total = 2;
      const sampleAccounts = [
        new Account("John Doe", "1990-01-01", "SAVINGS", 1000),
        new Account("John Doe", "1990-01-01", "SAVINGS", 1000),
      ];

      jest
        .spyOn(accountService, "getAllAccounts")
        .mockReturnValue({ data: sampleAccounts, total: total });

      accountController.getAllAccounts(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "successful",
        result: { data: sampleAccounts, total: 2 },
      });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it("should return a 404 response when no accounts are found", () => {
      jest.spyOn(accountService, "getAllAccounts").mockReturnValue({ data: [], total: 0 });

      accountController.getAllAccounts(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "No accounts found",
      });
      expect(mockNext).not.toHaveBeenCalled();
    });
  });
});
