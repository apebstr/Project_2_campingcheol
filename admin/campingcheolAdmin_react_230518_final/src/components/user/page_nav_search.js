import { useSelector } from "react-redux";

const PageNavigationSearch = (props) => {
  const { getUserList, selected, selectedSearchKey, selectedSearchWord } =
    props;

  const params = {
    table: selected,
    searchKey: selectedSearchKey,
    searchWord: selectedSearchWord,
  };

  console.log(params);

  const pv = useSelector((state) =>
    state.user.pv ? state.user.pv : { currentPage: 1 }
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
            onClick={() => getUserList(pv.startPage - pv.blockPage, params)}
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
              onClick={() => getUserList(pnum, params)}
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
            onClick={() => getUserList(pv.startPage + pv.blockPage, params)}
          >
            &raquo;
          </span>
        </li>
      </ul>
    </nav>
  );
};

export default PageNavigationSearch;
