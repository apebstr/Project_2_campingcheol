import style from "../../css/userpage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { ReviewActions } from "../../reduxs/actions/review_action";

const CampReviewPage = () => {
  const dispatch = useDispatch();
  const userKeynum = localStorage.getItem("userKeynum");
  const creviewList = useSelector((state) => state.review.creviewList);

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("Authorization"),
    },
  };
  const getCreviewList = (currentPage, userKeynum, config) => {
    dispatch(ReviewActions.getCreviewList(currentPage, userKeynum, config));
    console.log(creviewList);
  };

  useEffect(() => {
    getCreviewList(campPv.currentPage, userKeynum, config);
  }, []);

  const campPv = useSelector((state) =>
    state.review.campPv ? state.review.campPv : { currentPage: 1 }
  );
  const pageNumbersCamp = [];
  for (let i = campPv.startPage; i <= campPv.endPage; i++) {
    pageNumbersCamp.push(i);
  }

  return (
    <div className={style.orderdPaging}>
      {campPv.totalCount ? (
        <nav arial-label='...'>
          <ul className='pagination' style={{ marginLeft: "350px" }}>
            <li
              className={
                campPv.startPage <= 1 ? "page-item disabled" : "page-item"
              }
            >
              <span
                className='page-link'
                onClick={() =>
                  getCreviewList(
                    campPv.startPage - campPv.blockPage,
                    userKeynum,
                    config
                  )
                }
              >
                &laquo;
              </span>
            </li>

            {pageNumbersCamp.map((pnum) => (
              <li
                className={
                  campPv.currentPage === pnum ? "page-item active" : null
                }
                aria-current={campPv.currentPage === pnum ? "page" : null}
                key={pnum}
              >
                <span
                  className='page-link'
                  onClick={() => getCreviewList(pnum, userKeynum, config)}
                >
                  {pnum}
                </span>
              </li>
            ))}

            <li
              className={
                campPv.endPage >= campPv.totalPage
                  ? "page-item disabled"
                  : "page-item"
              }
            >
              <span
                className='page-link'
                onClick={() =>
                  getCreviewList(
                    campPv.startPage + campPv.blockPage,
                    userKeynum,
                    config
                  )
                }
              >
                &raquo;
              </span>
            </li>
          </ul>
        </nav>
      ) : (
        ""
      )}
    </div>
  );
};

export default CampReviewPage;
