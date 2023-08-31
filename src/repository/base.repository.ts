import { IRepository } from "../types/interfaces";

export class BaseRepository<T> implements IRepository<T> {
  protected items: T[] = [];

  addItem(item: T): number {
    return this.items.push(item);
  }

  getAllItems(page?: string, pageSize?: string): { data: T[]; total: number } {
    if (page !== undefined && pageSize !== undefined) {
      // Convert page and pageSize to numbers
      const pageNum = +page;
      const size = +pageSize;
      const startIndex = (pageNum - 1) * size;
      const endIndex = startIndex + size;

      // Slice the items array based on pagination
      const paginatedItems = this.items.slice(startIndex, endIndex);

      return { data: paginatedItems, total: this.items.length };
    } else {
      // If page and pageSize are not provided, return all items
      return { data: this.items, total: this.items.length };
    }
  }
}
