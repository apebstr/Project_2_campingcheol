import { useSelector } from "react-redux";

const PageNavigationSearch = (props) => {
  const { searchNoticeList, pv, searchWords } = props;

  const params = {
    currentPage: pv.currentPage,
    table: searchWords.table,
    searchKey: searchWords.searchKey,
    searchWord: searchWords.searchWord,
  };

  // const pv = useSelector((state) =>
  //   state.prod.pv ? state.prod.pv : { currentPage: 1 }
  // );

  console.log("페이지 작동확인", params);

  const pageNumbers = [];
  for (let i = pv.startPage; i <= pv.endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav arial-label="Page navigation example">
      <ul className="pagination">
        <li className={pv.startPage <= 1 ? "page-item disabled" : "page-item"}>
          <span
            className="page-link"
            onClick={() =>
              searchNoticeList(pv.startPage - pv.blockPage, params)
            }
          >
            &laquo;
          </span>
        </li>

        {pageNumbers.map((pnum, idx) => (
          <li
            key={pnum}
            className={pv.currentPage === pnum ? "page-item active" : null}
            aria-current={pv.currentPage === pnum ? "page" : null}
          >
            <span
              className="page-link"
              onClick={() => searchNoticeList(pnum, params)}
            >
              {pnum}
            </span>
          </li>
        ))}

        <li
          className={
            pv.endPage >= pv.totalPage ? "page-item disalbed" : "page-item"
          }
        >
          <span
            className="page-link"
            onClick={() =>
              searchNoticeList(pv.startPage + pv.blockPage, params)
            }
          >
            &raquo;
          </span>
        </li>
      </ul>
    </nav>
  );
};

export default PageNavigationSearch;
