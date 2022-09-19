export interface Pagination<T> {
  data: T[];
  total: number;
  limit: number;
  page: number;
}
