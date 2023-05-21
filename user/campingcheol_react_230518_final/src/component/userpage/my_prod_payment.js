import UserMenu from "./user_menu";
import style from "../../css/userpage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { prodActions } from "../../reduxs/actions/prodAction";
import { useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import axios from "axios";
import { baseUrl } from "../../apiurl";
import { Link } from "react-router-dom";
import { MyActions } from "../../reduxs/actions/my_action";
import PageNavigation from "./page_nav";

const MyProdPayment = () => {
  // const userKeynum = localStorage.getItem("userKeynum");
  const userKeynum = localStorage.getItem("userKeynum");

  const dispatch = useDispatch();

  const orderedList = useSelector((state) => state.my.selectProd);
  const pv = useSelector((state) =>
    state.my.pv ? state.my.pv : { currentPage: 1 }
  );

  const pageNumbers = [];
  for (let i = pv.startPage; i <= pv.endPage; i++) {
    pageNumbers.push(i);
  }
  ///////////////////
  const getProdPay = (currentPage, userKeynum) => {
    dispatch(
      MyActions.getProdPay(currentPage, userKeynum, {
        headers: {
          Authorization: localStorage.getItem("Authorization"),
        },
      })
    );
    // navigator(`/prod/list/${currentPage}`);
  };

  // 팝업 관련

  const [show, setShow] = useState(false);
  const [showIndex, setShowIndex] = useState(0);
  const handleClose = () => {
    setShow(false);

    setReviewContent("");
    setValue(2);
  };
  const handleShow = (index) => {
    setShow(true);
    setShowIndex(index);
  };

  // 후기 작성
  const [reviewContent, setReviewContent] = useState(""); //내용

  const [value, setValue] = useState(2); // 별점

  const contentSet = (e) => {
    setReviewContent(e.target.value);
  };

  const saveReveiw = async (prodKeyNum, prodDetailNum) => {
    const formData = new FormData();
    formData.append("userKeynum", userKeynum);
    formData.append("prodKeyNum", prodKeyNum);
    formData.append("prodReviewContent", reviewContent);
    formData.append("prodReviewRating", value);

    //후기저장하기
    await axios.post(`${baseUrl}/prod/reviewSave`, formData, {
      headers: {
        Authorization: localStorage.getItem("Authorization"),
      },
    });
    //후기 저장후 후기 작성여부 True로 바꾸기

    await axios
      .put(`${baseUrl}/prod/changeWhetherReview/${prodDetailNum}`, null, {
        headers: {
          Authorization: localStorage.getItem("Authorization"),
        },
      })
      .then((response) => response.data);
    window.location.reload(); //새로고침
    // dispatch(prodActions.getOrderedList(currentPage, userKeynum));
  };

  useEffect(() => {
    getProdPay(pv.currentPage, userKeynum);
    console.log(orderedList);
    console.log(pv);

    // console.log(orderedList[0].whetherReview);
  }, [dispatch]);

  ///////////////////
  function isHttpUrl(url) {
    return url.startsWith("https://");
  }
  const [imageUrls, setImageUrls] = useState({});

  const getImage = async (prod) => {
    try {
      const imageFile = await dispatch(prodActions.getImage(prod.prodImage));
      const url = window.URL.createObjectURL(imageFile);
      setImageUrls((prevState) => ({
        ...prevState,
        [prod.prodKeyNum]: url,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (orderedList) {
      orderedList.forEach((prod) => {
        if (prod.prodImage) {
          if (isHttpUrl(prod.prodImage)) {
            setImageUrls((prevState) => ({
              ...prevState,
              [prod.prodKeyNum]: prod.prodImage,
            }));
          } else {
            getImage(prod);
          }
        }
      });
    }
  }, [orderedList]);

  return (
    <>
      <div className={style.user}>
        <UserMenu />
        <div className={style.prodPay}>
          <h1>캠핑용품 결제내역</h1>
          <hr />
          <table className={style.cPaylist} style={{ marginTop: 20 }}>
            <thead>
              <tr>
                <th>주문번호</th>
                <th>주문상세번호</th>
                <th>결제일</th>
                <th>상품사진</th>
                <th>상품이름</th>
                <th>갯수</th>
                <th>결제금액</th>
                <th>상태</th>
              </tr>
            </thead>
            <tbody>
              {orderedList && orderedList.length > 0 ? (
                orderedList.map((prod, index) => {
                  return (
                    <tr key={prod.prodDetailNum}>
                      <td>{prod.prodOrderNum}</td>
                      <td>{prod.prodDetailNum}</td>
                      <td>{prod.prodDate}</td>
                      <td>
                        <Link to={"/prod/view/" + prod.prodKeyNum}>
                          <img
                            style={{
                              width: "200px",
                              height: "200px",
                              padding: "10px",
                            }}
                            src={imageUrls[prod.prodKeyNum]}
                          />
                        </Link>
                      </td>
                      <td>
                        <Link
                          to={"/prod/view/" + prod.prodKeyNum}
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          <strong>{prod.prodTitle}</strong>
                        </Link>
                      </td>
                      <td>{prod.prodCartCount}</td>
                      <td>
                        {Number(prod.prodpayAmt).toLocaleString("kp-KR")}원
                      </td>
                      <td className={style.writeReview}>
                        {prod.prodOrderCheck === "1"
                          ? "상품준비중"
                          : "배송완료"}
                        <br />
                        {prod.whetherReview === "false" ? (
                          <>
                            <button
                              class='btn btn-outline'
                              style={{ border: "solid green 3px" }}
                              type='submit'
                              id={style.btnreview}
                              onClick={() => handleShow(index)}
                            >
                              후기쓰기
                            </button>
                            <Modal
                              show={show && showIndex === index}
                              onHide={handleClose}
                              backdrop='static'
                              backdropClassName={style.customColor}
                              centered
                            >
                              <Modal.Header closeButton>
                                <Modal.Title>후기 작성하기</Modal.Title>
                              </Modal.Header>
                              <Modal.Body
                                style={{
                                  width: "500px",
                                  height: "500px",
                                  margin: "auto",
                                }}
                              >
                                <p
                                  style={{
                                    textAlign: "center",
                                  }}
                                >
                                  {prod.prodTitle}
                                </p>
                                <img
                                  src={imageUrls[prod.prodKeyNum]}
                                  style={{
                                    width: "200px",
                                    height: "200px",
                                    display: "block",
                                    margin: "auto",
                                  }}
                                />
                                <div className={style.ratingArea}>
                                  <Box
                                    component='fieldset'
                                    mb={3}
                                    borderColor='transparent'
                                  >
                                    <Typography component='legend'>
                                      평점 주기
                                    </Typography>
                                    <Rating
                                      name='simple-controlled'
                                      value={value}
                                      onChange={(event, newValue) => {
                                        setValue(newValue);
                                      }}
                                    />
                                  </Box>
                                </div>
                                <textarea
                                  className={style.reviewWrite}
                                  placeholder='후기를 작성해주세요'
                                  value={reviewContent}
                                  onChange={contentSet}
                                />
                              </Modal.Body>
                              <Modal.Footer>
                                <Button
                                  variant='secondary'
                                  onClick={handleClose}
                                >
                                  닫기
                                </Button>
                                <Button
                                  variant='primary'
                                  onClick={() => {
                                    handleClose();
                                    saveReveiw(
                                      prod.prodKeyNum,
                                      prod.prodDetailNum
                                    );
                                  }}
                                >
                                  저장
                                </Button>
                              </Modal.Footer>
                            </Modal>
                          </>
                        ) : (
                          <button
                            type='button'
                            class='btn btn-outline'
                            style={{ border: "solid #85c585 3px" }}
                            disabled
                          >
                            후기작성완료
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan='3'
                    style={{
                      whiteSpace: "pre",
                      display: "flex",
                      fontSize: "30px",
                      color: "rgb(39, 157, 230)",
                      marginLeft: "350px",
                      marginTop: "50px",
                      border: "none",
                    }}
                  >
                    <strong>캠핑용품 결제내역이 없습니다.</strong>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className={style.orderdPaging}>
        {pv.totalCount && orderedList ? (
          <>
            <PageNavigation getProdPay={getProdPay} userKeynum={userKeynum} />
          </>
        ) : (
          ""
        )}
        {/* {pv ? (
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
                    getProdList(pv.startPage - pv.blockPage, userKeynum)
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
                    onClick={() => getProdList(pnum, userKeynum)}
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
                    getProdList(pv.startPage + pv.blockPage, userKeynum)
                  }
                >
                  &raquo;
                </span>
              </li>
            </ul>
          </nav>
        ) : (
          ""
        )} */}
      </div>
    </>
  );
};

export default MyProdPayment;
