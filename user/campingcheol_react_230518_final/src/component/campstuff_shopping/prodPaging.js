import { useEffect } from "react";
import { useSelector } from "react-redux";

const PageNavigation = ({ getProdList }) => {
  const pv = useSelector((state) =>
    state.prod.pv ? state.prod.pv : { currentPage: 1 }
  );

  const pageNumbers = [];
  for (let i = pv.startPage; i <= pv.endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav arial-label="...">
      <ul className="pagination">
        <li className={pv.startPage <= 1 ? "page-item disabled" : "page-item"}>
          <span
            className="page-link"
            onClick={() =>
              getProdList(pv.startPage - pv.blockPage, pv.category)
            }
          >
            &laquo;
          </span>
        </li>

        {pageNumbers.map((pnum) => (
          <li
            className={pv.currentPage === pnum ? "page-item active" : null}
            aria-current={pv.currentPage === pnum ? "page" : null}
            key={pnum}
          >
            <span
              className="page-link"
              onClick={() => getProdList(pnum, pv.category)}
            >
              {pnum}
            </span>
          </li>
        ))}

        <li
          className={
            pv.endPage >= pv.totalPage ? "page-item disabled" : "page-item"
          }
        >
          <span
            className="page-link"
            onClick={() =>
              getProdList(pv.startPage + pv.blockPage, pv.category)
            }
          >
            &raquo;
          </span>
        </li>
      </ul>
    </nav>
  );
};

export default PageNavigation;
