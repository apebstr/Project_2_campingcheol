import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const PageNavigation = (props) => {
  const { getCampList, search, campDo } = props;

  const params = {
    campDo: campDo,
    searchWord: search,
  };

  const pv = useSelector((state) =>
    state.campSite.pv ? state.campSite.pv : { currentPage: 1 }
  );
  console.log(pv);

  const pageNumbers = [];
  for (let i = pv.startPage; i <= pv.endPage; i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {}, []);

  return (
    <nav arial-label='...'>
      <ul className='pagination'>
        <li className={pv.startPage <= 1 ? 'page-item disabled' : 'page-item'}>
          <span
            className='page-link'
            onClick={() => getCampList(pv.startPage - pv.blockPage, params)}
            style={{ cursor: 'pointer' }}
          >
            &laquo;
          </span>
        </li>
        {pageNumbers.map((pnum) => (
          <li
            className={pv.currentPage === pnum ? 'page-item active' : null}
            aria-current={pv.currentPage === pnum ? 'page' : null}
            key={pnum}
          >
            {/* #! 나오는게 싫으면 span 태그로 처리하면 됨 */}

            <span
              className='page-link'
              onClick={() => getCampList(pnum, params)}
              style={{ cursor: 'pointer' }}
            >
              {pnum}
            </span>
          </li>
        ))}

        <li
          className={
            pv.endPage >= pv.totalPage ? 'page-item disabled' : 'page-item'
          }
        >
          <span
            className='page-link'
            onClick={() => getCampList(pv.startPage + pv.blockPage, params)}
            style={{ cursor: 'pointer' }}
          >
            &raquo;
          </span>
        </li>
      </ul>
    </nav>
  );
};

export default PageNavigation;
