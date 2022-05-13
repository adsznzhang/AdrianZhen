interface Pagination {
  currentPage: number;
  prevPagePath: string;
  nextPagePath: string;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  numPages:number;
}

export default Pagination;
