import style from "../../css/userpage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { ReviewActions } from "../../reduxs/actions/review_action";

const ProdReviewPage = () => {
  const dispatch = useDispatch();
  const userKeynum = localStorage.getItem("userKeynum");
  const previewList = useSelector((state) => state.review.previewList);

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("Authorization"),
    },
  };

  const getPreviewList = (currentPage, userKeynum, config) => {
    dispatch(ReviewActions.getPreviewList(currentPage, userKeynum, config));
  };

  useEffect(() => {
    getPreviewList(prodPv.currentPage, userKeynum, config);
    console.log(previewList);
  }, []);

  const prodPv = useSelector((state) =>
    state.review.prodPv ? state.review.prodPv : { currentPage: 1 }
  );

  const pageNumbersProd = [];
  for (let i = prodPv.startPage; i <= prodPv.endPage; i++) {
    pageNumbersProd.push(i);
  }

  return (
    <div className={style.orderdPaging}>
      {prodPv.totalCount ? (
        <nav arial-label='...'>
          <ul className='pagination' style={{ marginLeft: "350px" }}>
            <li
              className={
                prodPv.startPage <= 1 ? "page-item disabled" : "page-item"
              }
            >
              <span
                className='page-link'
                onClick={() =>
                  getPreviewList(
                    prodPv.startPage - prodPv.blockPage,
                    userKeynum,
                    config
                  )
                }
              >
                &laquo;
              </span>
            </li>

            {pageNumbersProd.map((pnum) => (
              <li
                className={
                  prodPv.currentPage === pnum ? "page-item active" : null
                }
                aria-current={prodPv.currentPage === pnum ? "page" : null}
                key={pnum}
              >
                <span
                  className='page-link'
                  onClick={() => getPreviewList(pnum, userKeynum, config)}
                >
                  {pnum}
                </span>
              </li>
            ))}

            <li
              className={
                prodPv.endPage >= prodPv.totalPage
                  ? "page-item disabled"
                  : "page-item"
              }
            >
              <span
                className='page-link'
                onClick={() =>
                  getPreviewList(
                    prodPv.startPage + prodPv.blockPage,
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

export default ProdReviewPage;
