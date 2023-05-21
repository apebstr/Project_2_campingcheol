import style from "../../css/prodDetail.module.css";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Rating from "@material-ui/lab/Rating";
// import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { prodActions } from "../../reduxs/actions/prodAction";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ProdView = ({ cartCal }) => {
  const navigator = useNavigate();
  const dispatch = useDispatch();

  //상품 상세고유번호 가져오기
  const prodKeyNum = useParams().prodKeyNum;
  const prodDetail = useSelector((state) => state.prod.prodDetail);
  console.log(prodDetail);

  //기본 개수 저장하기
  const [buttonCount, setButtonCount] = useState(1);

  //후기관련 객체 가져오기
  const reviewList = useSelector((state) => state.prod.prodReviewList);
  const pv = useSelector((state) => state.prod.pv);
  const pageNumbers = [];
  const avgRating = useSelector((state) => state.prod.avgRating);

  if (reviewList) {
    for (let i = pv.startPage; i <= pv.endPage; i++) {
      pageNumbers.push(i);
    }
  }

  const getReviewList = (currentPage, prodKeyNum) => {
    dispatch(prodActions.getProdReviewList(currentPage, prodKeyNum));
    // navigator(`/prod/list/${currentPage}`);
  };

  const prodBuyCountUp = () => {
    if (prodDetail.prodStock <= buttonCount) {
      return;
    }

    setButtonCount(buttonCount + 1);
  };

  const prodBuyCountDown = () => {
    if (buttonCount <= 1) {
      return;
    }
    setButtonCount(buttonCount - 1);
  };

  const insertCart = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // 아래거로 써줘야합니다 ~~
    // formData.append("userKeynum", localStorage.userKeynum);
    formData.append("userKeynum", localStorage.getItem("userKeynum"));

    formData.append("prodKeyNum", prodKeyNum);
    formData.append("prodCartCount", buttonCount);

    await dispatch(
      prodActions.insertCart(formData, {
        headers: {
          Authorization: localStorage.getItem("Authorization"),
        },
      })
    );

    cartCal(localStorage.getItem("userKeynum"));
    setButtonCount(1);
    setShow(true);
  };

  // 결제창으로 이동
  const goToOrder = () => {
    if (prodDetail.prodStock < buttonCount) {
      alert("구매하시려는 수량보다 많습니다.");
      return;
    }
    navigator("/prod/order", {
      state: { prodDetail: prodDetail, productCount: buttonCount },
    });
  };

  useEffect(() => {
    dispatch(prodActions.getProdDetail(prodKeyNum));
    if (pv) {
      dispatch(prodActions.getProdReviewList(pv.currentPage, prodKeyNum));
    }

    console.log("reviewList", reviewList);
  }, []);

  //장바구니 팝업
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const goToCart = () => {
    navigator("/my/prod/cart");
  };

  // //상품이미지
  // const getImage = async (imagename) => {
  //   // const imagename = "3fe9a765-8518-4722-a598-f4ffead2f40d_basic3.png";
  //   console.log(imagename);
  //   const imageFile = await dispatch(prodActions.getImage(imagename));
  //   console.log(imageFile);

  //   const url = window.URL.createObjectURL(imageFile);
  //   console.log(url);

  //   return url;
  // };

  function isHttpUrl(url) {
    return url.startsWith("https://");
  }
  const [imageUrl, setImageUrl] = useState("");

  const getImage = async (imagename) => {
    try {
      const imageFile = await dispatch(prodActions.getImage(imagename));
      const url = window.URL.createObjectURL(imageFile);
      setImageUrl(url);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (prodDetail.prodImage) {
      if (isHttpUrl(prodDetail.prodImage)) {
        setImageUrl(prodDetail.prodImage);
      } else {
        getImage(prodDetail.prodImage);
      }
    }
  }, [prodDetail.prodImage]);

  return (
    <div className={style.prodDetail}>
      <div>
        <Modal
          show={show}
          onHide={handleClose}
          backdropClassName={style.cartAlert}
          style={{ marginTop: "400px" }}
        >
          <Modal.Header closeButton>
            {/* <Modal.Title>Modal heading</Modal.Title> */}
          </Modal.Header>
          <Modal.Body style={{ margin: "auto" }}>
            장바구니 추가 완료 !
          </Modal.Body>
          <Modal.Footer>
            <Button variant='warning' onClick={goToCart}>
              장바구니 가기
            </Button>
            <Button variant='secondary' onClick={handleClose}>
              닫기
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <p className={style.topText}>상품정보</p>

      <div className={style.prodExpain}>
        <div className={style.prodLeft}>
          <img src={imageUrl} />
        </div>
        <div className={style.prodRight}>
          <p className={style.prodCategory}>{prodDetail.prodCategory}</p>
          <p className={style.prodBrand}>{prodDetail.prodBrand}</p>
          <p className={style.prodName}>{prodDetail.prodTitle}</p>
          <p className={style.ratingMean}>상품평점 {avgRating} / 5</p>
          <Box
            style={{ marginLeft: "28px" }}
            component='fieldset'
            mb={3}
            borderColor='transparent'
          >
            <Rating name='read-only' value={avgRating} readOnly />
          </Box>

          {prodDetail.prodStock - buttonCount <= 4 ? (
            prodDetail.prodStock == 0 ? (
              <div className={style.soldout}>
                <div> 품절입니다.</div>
              </div>
            ) : (
              <p className={style.prodStock}>
                ⚠️ 재고 : {prodDetail.prodStock}
              </p>
            )
          ) : (
            ""
          )}
          <div className={style.prodCount_price}>
            <p className={style.prodCount}>
              <button onClick={prodBuyCountDown}>
                <ExpandMoreIcon />
              </button>
              <input type='text' value={buttonCount} />
              <button onClick={prodBuyCountUp}>
                <ExpandLessIcon />
              </button>
            </p>
            <p className={style.prodPrice}>{prodDetail.prodPrice}원</p>
          </div>
          <form>
            <div className={style.buyBtn}>
              <button type='button' class='btn btn-primary' onClick={goToOrder}>
                구매하기
              </button>
              {/* <button
                onClick={() => {
                  insertCart();
                  cartCal(localStorage.getItem("userKeynum"));
                }}
                class="btn btn-secondary"
              >
                장바구니
              </button> */}
              <button onClick={insertCart} class='btn btn-secondary'>
                장바구니
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className={style.prodRating}>
        <p className={style.prodReadCount}>
          조회수 : {prodDetail.prodReadCount}회
        </p>
        <div className={style.prodRatingTop}>
          <p>상품후기</p>
          <hr />
        </div>

        {reviewList ? (
          reviewList.map((review) => {
            return (
              <div className={style.prodReview}>
                {review.userNick ? (
                  <p className={style.reviewProdName}>{review.userNick}</p>
                ) : (
                  <p className={style.reviewProdName}>탈퇴한 회원</p>
                )}
                <p className={style.reviewRating}>
                  <Box component='fieldset' mb={3} borderColor='transparent'>
                    <Rating
                      name='read-only'
                      value={review.prodReviewRating}
                      readOnly
                    />
                  </Box>
                </p>
                <p className={style.reviewContent}>
                  {review.prodReviewContent}
                </p>
                <p className={style.reviewDate}>{review.prodReviewDate}</p>
              </div>
            );
          })
        ) : (
          <div> 등록된 후기가 없습니다. </div>
        )}
        {/* 후기페이징 */}
        {reviewList ? (
          <div className={style.reviewPaging}>
            {pv ? (
              <nav arial-label='...'>
                <ul className='pagination'>
                  <li
                    className={
                      pv.startPage <= 1 ? "page-item disabled" : "page-item"
                    }
                  >
                    <span
                      className='page-link'
                      onClick={() =>
                        getReviewList(pv.startPage - pv.blockPage, prodKeyNum)
                      }
                    >
                      &laquo;
                    </span>
                  </li>

                  {pageNumbers.map((pnum) => (
                    <li
                      className={
                        pv.currentPage === pnum ? "page-item active" : null
                      }
                      aria-current={pv.currentPage === pnum ? "page" : null}
                      key={pnum}
                    >
                      <span
                        className='page-link'
                        onClick={() => getReviewList(pnum, prodKeyNum)}
                      >
                        {pnum}
                      </span>
                    </li>
                  ))}

                  <li
                    className={
                      pv.endPage >= pv.totalPage
                        ? "page-item disabled"
                        : "page-item"
                    }
                  >
                    <span
                      className='page-link'
                      onClick={() =>
                        getReviewList(pv.startPage + pv.blockPage, prodKeyNum)
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
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ProdView;
