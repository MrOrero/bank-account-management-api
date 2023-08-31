import { AccountRepository } from "../repository/account.repository";
import { Account } from "../models/account.model";
import { IRepository } from "../types/interfaces";

export class AccountService {
  constructor(private repository: IRepository<Account>) {}

  createAccount(item: Account): number {
    return this.repository.addItem(item);
  }

  getAllAccounts(page?: string, pageSize?: string): { data: Account[]; total: number } {
    return this.repository.getAllItems(page, pageSize);
  }

  findAccountByAccountNumber(accountNumber: number): Account | undefined {
    if (this.repository instanceof AccountRepository) {
      return this.repository.findAccountByNumber(accountNumber);
    }
    return undefined;
  }
}

export default new AccountService(new AccountRepository());
