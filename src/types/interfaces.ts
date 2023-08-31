export interface IRepository<T> {
  addItem(item: T): number;
  getAllItems(): T[];
}
