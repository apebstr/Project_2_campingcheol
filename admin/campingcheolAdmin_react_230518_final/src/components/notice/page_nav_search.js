import { useSelector } from 'react-redux';

const PageNavigationSearch = (props) => {
  const {
    searchNoticeList,
    pv,
    selectedSearchKey,
    selectedSearchWord,
    selectedtable,
  } = props;

  const params = {
    table: selectedtable,
    searchKey: selectedSearchKey,
    searchWord: selectedSearchWord,
  };

  console.log(params);

  // const pv = useSelector((state) =>
  //   state.prod.pv ? state.prod.pv : { currentPage: 1 }
  // );

  console.log(pv);
  console.log(pv.totalCount);
  console.log(pv.currentPage);

  const pageNumbers = [];
  for (let i = pv.startPage; i <= pv.endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav arial-label='Page navigation example'>
      <ul className='pagination'>
        <li className={pv.startPage <= 1 ? 'page-item disabled' : 'page-item'}>
          <span
            className='page-link'
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
            className={pv.currentPage === pnum ? 'page-item active' : null}
            aria-current={pv.currentPage === pnum ? 'page' : null}
          >
            <span
              className='page-link'
              onClick={() => searchNoticeList(pnum, params)}
            >
              {pnum}
            </span>
          </li>
        ))}

        <li
          className={
            pv.endPage >= pv.totalPage ? 'page-item disalbed' : 'page-item'
          }
        >
          <span
            className='page-link'
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
