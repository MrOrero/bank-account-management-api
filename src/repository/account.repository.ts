import { Account } from "../models/account.model";
import { BaseRepository } from "./base.repository";

export class AccountRepository extends BaseRepository<Account> {
  findAccountByName(accountName: string): Account | undefined {
    return this.items.find(account => account.accountName === accountName);
  }
}

export default new AccountRepository();
