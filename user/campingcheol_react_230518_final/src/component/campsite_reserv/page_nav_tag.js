import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const PageNavigationTag = (props) => {
  const { getTagSearch, tags } = props;

  const pv = useSelector((state) =>
    state.campSite.pv ? state.campSite.pv : { currentPage: 1 }
  );

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
            onClick={() => getTagSearch(pv.startPage - pv.blockPage, tags)}
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
              onClick={() => getTagSearch(pnum, tags)}
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
            onClick={() => getTagSearch(pv.startPage + pv.blockPage, tags)}
            style={{ cursor: 'pointer' }}
          >
            &raquo;
          </span>
        </li>
      </ul>
    </nav>
  );
};

export default PageNavigationTag;
