import { Account } from "../models/account.model";
import { BaseRepository } from "./base.repository";

export class AccountRepository extends BaseRepository<Account> {
  findAccountByNumber(accountNumber: number): Account | undefined {
    return this.items.find(account => account.accountNumber === accountNumber);
  }
}

export default new AccountRepository();
