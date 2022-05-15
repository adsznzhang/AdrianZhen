interface Pagination {
  currentPage: number;
  prevPagePath: string;
  nextPagePath: string;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  total:number;
  group:any;
}

export default Pagination;
