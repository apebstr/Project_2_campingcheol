import { useSelector } from "react-redux";

const PageNavigationSite = (props) => {
  const {
    getSiteList,

    selectedCategory,
    selectedSearchKey,
    selectedSearchWord,
  } = props;

  const params = {
    category: selectedCategory,
    searchKey: selectedSearchKey,
    searchWord: selectedSearchWord,
  };

  const pv = useSelector((state) =>
    state.prod.campPv ? state.prod.campPv : { currentPage: 1 }
  );

  const pageNumbers = [];
  for (let i = pv.startPage; i <= pv.endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav arial-label='Page navigation example'>
      <ul className='pagination'>
        <li className={pv.startPage <= 1 ? "page-item disabled" : "page-item"}>
          <span
            className='page-link'
            onClick={() => getSiteList(pv.startPage - pv.blockPage, params)}
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
              className='page-link'
              onClick={() => getSiteList(pnum, params)}
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
            className='page-link'
            onClick={() => getSiteList(pv.startPage + pv.blockPage, params)}
          >
            &raquo;
          </span>
        </li>
      </ul>
    </nav>
  );
};

export default PageNavigationSite;
