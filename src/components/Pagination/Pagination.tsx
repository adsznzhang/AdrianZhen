import React from "react";

import classNames from "classnames";
import { Link } from "gatsby";

import { PAGINATION } from "@/constants";

import * as styles from "./Pagination.module.scss";

type Props = {
  prevPagePath: string;
  nextPagePath: string;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  numPages:number;
  currentPage:number;

};

const Pagination = ({
  prevPagePath,
  nextPagePath,
  hasNextPage,
  hasPrevPage,
  numPages,
  currentPage,
}: Props) => {
  const prevClassName = classNames(styles.previousLink, {
    [styles.disable]: !hasPrevPage,
  });

  const nextClassName = classNames(styles.nextLink, {
    [styles.disable]: !hasNextPage,
  });

  const pagePath = (page:any) => (page <= 1 ? '/' : `/page/${page-1}/`);
  let pageNumbers = [];

  // If there are <= 7 pages, we'll never need an ellipsis.
  if (numPages <= 7) {
    for (let i = 1; i <= numPages; i++) {
      pageNumbers.push(i);
    }
  } else if (currentPage <= 4) {
    // 1 2 3 4 5 ... n
    pageNumbers = [1, 2, 3, 4, 5, '…', numPages];
  } else if (currentPage < numPages - 3) {
    // 1 ... c-1 c c+1 ... n
    pageNumbers = [1, '…', currentPage - 1, currentPage, currentPage + 1, '…', numPages];
  } else {
    // 1 ... n-4 n-3 n-2 n-1 n
    pageNumbers = [1, '…', numPages - 4, numPages - 3, numPages - 2, numPages - 1, numPages];
  }
  return (
    <div className={styles.pagination}>
      <div className={styles.previous}>
        <Link
          rel="prev"
          to={hasPrevPage ? prevPagePath : "/"}
          className={prevClassName}
        >
          {PAGINATION.PREV_PAGE}
        </Link>
      </div>
      <ul className={styles.listcontainer}>
        {pageNumbers.map((pn, i) => (
          <li key={`pagenum-${i}`}>
            {pn == '…' ? (
              <p>…</p>
            ) : (
              <Link to={pagePath(pn)}  className={pn == currentPage+1 ? styles.selected : ''}>
                {pn}
              </Link>
            )}
          </li>
        ))}
      </ul>
     
      <div className={styles.next}>
        <Link
          rel="next"
          to={hasNextPage ? nextPagePath : "/"}
          className={nextClassName}
        >
          {PAGINATION.NEXT_PAGE}
        </Link>
      </div>
    </div>
  );
};

export default Pagination;
