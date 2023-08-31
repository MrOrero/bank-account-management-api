import { IRepository } from "../types/interfaces";

export class BaseRepository<T> implements IRepository<T> {
  protected items: T[] = [];

  addItem(item: T): number {
    return this.items.push(item);
  }

  getAllItems(): T[] {
    return this.items;
  }
}
