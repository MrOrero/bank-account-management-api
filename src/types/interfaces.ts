export interface IRepository<T> {
  addItem(item: T): number;
  getAllItems(page?: string, pageSize?: string): { data: T[]; total: number };
}
