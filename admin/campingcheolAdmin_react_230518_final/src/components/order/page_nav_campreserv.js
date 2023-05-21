import { useSelector } from "react-redux";

const PageNavigationReserv = (props) => {
  const { getReservList, startDate, endDate, searchKey, searchWord } = props;

  const params = {
    startDate: startDate,
    endDate: endDate,
    searchKey: searchKey,
    searchWord: searchWord,
  };

  const pv = useSelector((state) =>
    state.order.reservPv ? state.order.reservPv : { currentPage: 1 }
  );

  console.log(pv);
  console.log(params);

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
            onClick={() => getReservList(pv.startPage - pv.blockPagem, params)}
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
              onClick={() => getReservList(pnum, params)}
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
            onClick={() => getReservList(pv.startPage + pv.blockPage, params)}
          >
            &raquo;
          </span>
        </li>
      </ul>
    </nav>
  );
};

export default PageNavigationReserv;
