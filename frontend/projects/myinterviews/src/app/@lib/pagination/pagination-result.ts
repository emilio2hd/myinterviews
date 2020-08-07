export interface PaginatedResult<T> {
  data: T[];
  pageSize: number;
  currentPage: number;
  nextPage: number;
  prevPage: number;
  totalCount: number;
  isEmpty: boolean;
}
