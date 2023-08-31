import { customAlphabet } from "nanoid";

const nanoId = customAlphabet("0123456789", 10);

export class Account {
  accountName: string;
  dateOfBirth: string;
  accountType: string;
  initialBalance: number;
  accountNumber?: number;

  constructor(
    accountName: string,
    dateOfBirth: string,
    accountType: string,
    initialBalance: number
  ) {
    this.accountName = accountName;
    this.dateOfBirth = dateOfBirth;
    this.accountType = accountType;
    this.initialBalance = initialBalance;
    this.accountNumber = this.generateAccountNumber();
  }

  generateAccountNumber(): number {
    return Number(nanoId());
  }
}
