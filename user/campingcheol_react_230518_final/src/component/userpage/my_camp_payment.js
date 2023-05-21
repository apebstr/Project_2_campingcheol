import UserMenu from "./user_menu";
import "../../css/userpage.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Rating } from "@material-ui/lab";
import { Box, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { MyActions } from "../../reduxs/actions/my_action";
import { ReviewActions } from "../../reduxs/actions/review_action";
import axios from "axios";
import { baseUrl } from "../../apiurl";
import style from "../../css/userpage.module.css";

const MyCampPayment = () => {
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const userKeynum = localStorage.getItem("userKeynum");

  const payList = useSelector((state) => state.my.payList);
  const pv = useSelector((state) =>
    state.my.pv ? state.my.pv : { currentPage: 1 }
  );

  const pageNumbers = [];
  for (let i = pv.startPage; i <= pv.endPage; i++) {
    pageNumbers.push(i);
  }

  const [campKeyNum, setCampKeyNum] = useState("");
  const [campReviewDTO, setCampReviewDTO] = useState({});
  const [campPayKeyNum, setCampPayKeyNum] = useState("");

  const config = {
    headers: {
      Authorization: localStorage.getItem("Authorization"),
    },
  };

  const getPayList = (currentPage, userKeynum, config) => {
    dispatch(MyActions.getPayList(currentPage, userKeynum, config));
  };

  useEffect(() => {
    getPayList(pv.currentPage, userKeynum, config);
  }, []);

  const [value, setValue] = useState(3); // 별점

  const [showIndex, setShowIndex] = useState(0);

  const handleShow = (index) => {
    setShow(true);
    setShowIndex(index);
    setCampKeyNum(payList[index].campKeyNum);
  };

  const [show, setShow] = useState(false);

  //후기작성
  const [reviewContent, setReviewContent] = useState(""); //내용

  const ReviewContent = (e) => {
    setReviewContent(e.target.value);
  };

  const handleClose = () => {
    setShow(false);
    setReviewContent("");
    setValue(3);
  };

  const [isSaved, setIsSaved] = useState(false);

  const handleSave = async (campKeyNum, campReview, campPayKeyNum) => {
    console.log(campPayKeyNum);

    const campReviewDTO = {
      userKeynum: userKeynum,
      campReviewContent: reviewContent,
      campReviewRating: value,
    };
    console.log(campReviewDTO.userKeynum);
    console.log(userKeynum);
    dispatch(ReviewActions.saveCreview(campKeyNum, campReviewDTO, config)).then(
      () => {
        setIsSaved(true);
      }
    );
    await axios.put(
      `${baseUrl}/my/review/camp/true/${campPayKeyNum}`,
      null,
      config
    );
    handleClose();
    dispatch(MyActions.getPayList(pv.currentPage, userKeynum, config));
  };

  return (
    <>
      <div className='user'>
        <UserMenu />
        <div className='campPay'>
          <h1 style={{ marginLeft: "-190px" }}> 캠핑장 이용내역</h1>

          <table className='cPaylist'>
            <thead className='cPaynav'>
              <tr>
                <th>예약번호</th>
                <th>캠핑장</th>
                <th>객실명/객실갯수</th>
                <th>체크인/체크아웃</th>
                <th>결제금액</th>
                <th>상태</th>
              </tr>
            </thead>

            <tbody className='paypaycamp'>
              {payList && payList.length > 0 ? (
                payList.map((pay, index) => (
                  <tr key={pay.campPayKeyNum}>
                    <th style={{ height: "300px" }}>{pay.campReservNum}</th>
                    <th className='campPayImage'>
                      <Link
                        to={`/camp/view/${pay.campKeyNum}`}
                        style={{ textDecoration: "none", color: "white" }}
                      >
                        <img
                          src={pay.campImg}
                          alt='campImage'
                          style={{ width: "300px", height: "200px" }}
                        />
                      </Link>
                      <tr className='cName' id='cName'>
                        <span
                          style={{
                            display: "inline-block",
                            marginTop: "10px",
                            color: "gray",
                          }}
                        >
                          {pay.campName}
                        </span>
                      </tr>
                    </th>

                    <th>
                      {pay.campRoom} / {pay.campRoomCount}
                    </th>
                    <th style={{ fontSize: "13pt" }}>
                      {pay.campReservStart.substr(0, 10)}
                      <br /> ~ {pay.campReservEnd.substr(0, 10)}
                      <br />
                      <span style={{ fontSize: "8.5pt", color: "gray" }}>
                        (예약일 : {pay.campReservDate})
                      </span>
                    </th>

                    <th>{pay.campPayAmt}원</th>

                    <th className='writeReview' colSpan='2'>
                      {pay.campReservCheck}

                      {pay.campReviewCheck === "true" ? (
                        <button
                          type='submit'
                          className='btn btn-review'
                          id='btnreview'
                          onClick={() => handleShow(index)}
                          disabled={pay.campReviewCheck}
                        >
                          후기작성완료
                        </button>
                      ) : (
                        <button
                          type='submit'
                          className='btn btn-outline'
                          id='btnoutline'
                          onClick={() => handleShow(index)}
                        >
                          후기작성하기
                        </button>
                      )}
                      <>
                        <Modal
                          key={pay.index}
                          show={show && showIndex === index}
                          onHide={handleClose}
                        >
                          <Modal.Header closeButton>
                            <Modal.Title> 후기 작성하기</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <div id='thismodal'>
                              <p>{pay.campName}</p>
                              <p>
                                <img src={pay.campImg} alt='campImage' />
                              </p>
                              <div className='reviewRating'>
                                <Box>
                                  <Typography>평점 주기</Typography>
                                  <Rating
                                    name='starts'
                                    value={value}
                                    onChange={(event, newValue) => {
                                      setValue(newValue);
                                    }}
                                  />
                                </Box>
                              </div>
                              <textarea
                                className='writeCamp'
                                placeholder='후기를 작성해주세요'
                                value={reviewContent}
                                onChange={ReviewContent}
                              />
                            </div>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button variant='secondary' onClick={handleClose}>
                              닫기
                            </Button>
                            <Button
                              variant='primary'
                              onClick={() => {
                                handleSave(
                                  campKeyNum,
                                  campReviewDTO,
                                  pay.campPayKeyNum
                                );
                              }}
                            >
                              저장
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </>
                    </th>
                  </tr>
                ))
              ) : (
                <tr
                  style={{
                    color: "rgb(39, 157, 230)",
                  }}
                >
                  <td
                    colSpan='3'
                    style={{
                      display: "flex",
                      textAlign: "center",
                      marginLeft: "350px",
                      marginTop: "100px",
                      fontSize: "30px",
                    }}
                  >
                    <span>캠핑장 이용내역이 없습니다.</span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className={style.orderdPaging}>
        {pv.totalCount > 0 ? (
          <nav arial-label='...'>
            <ul className='pagination' style={{ marginLeft: "150px" }}>
              <li
                className={
                  pv.startPage <= 1 ? "page-item disabled" : "page-item"
                }
              >
                <span
                  className='page-link'
                  onClick={() =>
                    getPayList(pv.startPage - pv.blockPage, userKeynum, config)
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
                    onClick={() => getPayList(pnum, userKeynum, config)}
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
                    getPayList(pv.startPage + pv.blockPage, userKeynum, config)
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
    </>
  );
};

export default MyCampPayment;
