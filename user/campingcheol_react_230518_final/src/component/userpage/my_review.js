import UserMenu from "./user_menu";
import "../../css/userpage.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Box, Typography } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ReviewActions } from "../../reduxs/actions/review_action";
import axios from "axios";
import { baseUrl } from "../../apiurl";
import style from "../../css/userpage.module.css";
import ProdReviewPage from "./prodReview_page";
import CampReviewPage from "./campReview_page";

const MyReview = () => {
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const userKeynum = localStorage.getItem("userKeynum");

  const creviewList = useSelector((state) => state.review.creviewList);
  const previewList = useSelector((state) => state.review.previewList);
  const CKNList = useSelector((state) => state.review.CKNList);
  const PRNList = useSelector((state) => state.review.PRNList);

  const [campKeyNum, setCampKeyNum] = useState("");
  const [campRewNum, setCampRewNum] = useState("");
  const [campReviewDTO, setCampReviewDTO] = useState({});

  const [prodReviewNum, setProdReviewNum] = useState("");
  const [prodReviewDTO, setProdReviewDTO] = useState({});

  const campPv = useSelector((state) =>
    state.review.campPv ? state.review.campPv : { currentPage: 1 }
  );

  const prodPv = useSelector((state) =>
    state.review.prodPv ? state.review.prodPv : { currentPage: 1 }
  );
  const pageNumbersCamp = [];
  for (let i = campPv.startPage; i <= campPv.endPage; i++) {
    pageNumbersCamp.push(i);
  }

  const pageNumbersProd = [];
  for (let i = prodPv.startPage; i <= prodPv.endPage; i++) {
    pageNumbersProd.push(i);
  }

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

  const getPreviewList = (currentPage, userKeynum, config) => {
    dispatch(ReviewActions.getPreviewList(currentPage, userKeynum, config));
    console.log(previewList);
  };

  useEffect(() => {
    getPreviewList(prodPv.currentPage, userKeynum, config);
  }, []);

  const [showCampTable, setShowCampTable] = useState(true);
  const [showProdTable, setShowProdTable] = useState(false);

  const handleShowCampTable = () => {
    setShowCampTable(true);
    setShowProdTable(false);
  };

  const handleShowProdTable = () => {
    setShowCampTable(false);
    setShowProdTable(true);
  };

  const [value, setValue] = useState(3); // 별점

  const [value2, setValue2] = useState(3); // 별점

  const [showIndex, setShowIndex] = useState(0);

  const [showIndex2, setShowIndex2] = useState(0);

  const [reviewContent, setReviewContent] = useState(""); //내용

  const [reviewContent2, setReviewContent2] = useState(""); //내용

  const handleShow = async (index, campRewNum, e) => {
    e.preventDefault();

    setShow(true);
    setShowIndex(index);
    setCampKeyNum(creviewList[index].campKeyNum);

    if (campRewNum) {
      // 수정하는 경우
      const { data } = await axios.get(
        `${baseUrl}/my/review/camp/modal/${campRewNum}`,
        config
      );
      setValue(data.campReviewRating);
      setReviewContent(data.campReviewContent);
    } else {
      // 새로 작성하는 경우
      setValue(0);
      setReviewContent("");
    }
  };

  const [show, setShow] = useState(false);

  const [show2, setShow2] = useState(false);

  const handleClose = () => {
    setShow(false);

    setReviewContent("");
    setValue(3);
  };

  const handleUpdate = (campRewNum, campReviewDTO, e) => {
    e.preventDefault();
    const newCampReviewDTO = {
      campReviewContent: reviewContent,
      campReviewRating: value,
    };

    dispatch(
      ReviewActions.updateCreview(campRewNum, newCampReviewDTO, config)
    ).then(() => {
      setCampReviewDTO(newCampReviewDTO);
      getCreviewList(campPv.currentPage, userKeynum, config);
    });

    handleClose();
    getCreviewList(campPv.currentPage, userKeynum, config);
  };

  const handleCampDelete = (campRewNum, e) => {
    e.preventDefault();

    const confirmResult = window.confirm(
      "삭제하시면 다시 후기 작성을 할 수 없습니다. 정말 삭제하시겠습니까?"
    );

    if (confirmResult) {
      dispatch(ReviewActions.getCreviewDelete(campRewNum, config));
      dispatch(
        ReviewActions.getCreviewList(campPv.currentPage, userKeynum, config)
      );
      navigator(`/my/review`);
    }
  };

  //캠핑용품
  const handleShow2 = async (index2, prodReviewNum, e) => {
    e.preventDefault();
    console.log(prodReviewNum);

    setShow2(true);
    setShowIndex2(index2);
    setProdReviewNum(previewList[index2].prodReviewNum);

    if (prodReviewNum) {
      // 수정하는 경우
      const { data } = await axios.get(
        `${baseUrl}/my/review/prod/modal/${prodReviewNum}`,
        config
      );
      console.log(data);
      console.log("별점은", data.prodReviewRating);
      //setProdReviewNum(data.prodReviewNum);
      setValue2(data.prodReviewRating);
      setReviewContent2(data.prodReviewContent);
    } else {
      // 새로 작성하는 경우
      setValue2(0);
      setReviewContent2("");
    }
  };

  const handleClose2 = () => {
    setShow2(false);

    setReviewContent2("");
    setValue2(3);
  };

  const handleUpdate2 = async (prodReviewNum, e) => {
    e.preventDefault();
    const newprodReviewDTO = {
      prodReviewNum: prodReviewNum,
      prodReviewContent: reviewContent2,
      prodReviewRating: value2,
    };
    console.log(newprodReviewDTO);
    await axios.put(
      `${baseUrl}/my/review/prod/update`,
      newprodReviewDTO,
      config
    );

    handleClose2();
    getPreviewList(prodPv.currentPage, userKeynum, config);
  };

  const handleProdDelete = (prodReviewNum, e) => {
    e.preventDefault();

    const confirmResult = window.confirm(
      "삭제하시면 다시 후기 작성을 할 수 없습니다. 정말 삭제하시겠습니까?"
    );

    if (confirmResult) {
      dispatch(ReviewActions.getPreviewDelete(prodReviewNum, config));
      dispatch(
        ReviewActions.getPreviewList(prodPv.currentPage, userKeynum, config)
      );
      navigator(`/my/review`);
    }
  };

  return (
    <>
      <div className='user'>
        <UserMenu />
        <div className='myReview'>
          <h1>나의 후기</h1>
          <hr />
          <div>
            <div className='reviewList'>
              <div className='tableButtons'>
                <button
                  id='camp'
                  className={showCampTable ? "active" : ""}
                  onClick={handleShowCampTable}
                >
                  캠핑장
                </button>
                <div>|</div>
                <button
                  id='prod'
                  className={showProdTable ? "active" : ""}
                  onClick={handleShowProdTable}
                >
                  캠핑용품
                </button>
              </div>

              {showCampTable && (
                <div className='campReview'>
                  <table className='reviewList' style={{ marginTop: "50px" }}>
                    <thead>
                      <tr>
                        <th style={{ width: "320px" }}>캠핑장명</th>
                        <th style={{ width: "200px" }}>내용</th>
                        <th style={{ width: "50px" }}>별점</th>
                        <th style={{ textAlign: "center" }}>작성일</th>
                      </tr>
                    </thead>

                    <tbody>
                      {creviewList && creviewList.length > 0 ? (
                        creviewList.map((review, index) => (
                          <tr key={review.campRewNum}>
                            <th style={{ fontSize: "12pt" }}>
                              <Link
                                to={`/camp/view/${review.campKeyNum}`}
                                style={{
                                  textDecoration: "none",
                                  color: "black",
                                }}
                              >
                                {review.campName}
                              </Link>
                            </th>
                            <th style={{ fontSize: "12pt" }}>
                              {review.campReviewContent}
                            </th>
                            <th style={{ fontSize: "12pt" }}>
                              {review.campReviewRating}
                            </th>
                            <th style={{ fontSize: "12pt" }}>
                              {review.campReviewDate}&nbsp;&nbsp;&nbsp;
                              <button
                                className='btn btn-write'
                                id='write'
                                onClick={(e) =>
                                  handleShow(index, review.campRewNum, e)
                                }
                              >
                                수정
                              </button>
                              <>
                                <Modal
                                  key={review.index}
                                  show={show && showIndex === index}
                                  onHide={handleClose}
                                >
                                  <Modal.Header closeButton>
                                    <Modal.Title> 후기 수정하기</Modal.Title>
                                  </Modal.Header>
                                  <Modal.Body>
                                    <div id='thismodal'>
                                      <p>{review.campName}</p>
                                      <p>
                                        <img
                                          src={review.campImg}
                                          alt='campImage'
                                        />
                                      </p>
                                      <div className='reviewRating'>
                                        <Box>
                                          <Typography>평점 주기</Typography>
                                          <Rating
                                            name='campReviewRating'
                                            value={value}
                                            onChange={(event, newValue) => {
                                              setValue(newValue);
                                            }}
                                          />
                                        </Box>
                                      </div>
                                      <textarea
                                        className='writeCamp'
                                        name='campReviewContent'
                                        placeholder='후기를 작성해주세요'
                                        value={reviewContent}
                                        onChange={(e) => {
                                          setReviewContent(e.target.value);
                                        }}
                                      />
                                    </div>
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
                                      onClick={(e) =>
                                        handleUpdate(
                                          review.campRewNum,
                                          review.campReviewDTO,
                                          e
                                        )
                                      }
                                    >
                                      저장
                                    </Button>
                                  </Modal.Footer>
                                </Modal>
                              </>
                              <button
                                className='btn btn-delete'
                                id='delete'
                                onClick={(e) =>
                                  handleCampDelete(review.campRewNum, e)
                                }
                              >
                                삭제
                              </button>
                            </th>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan='3' style={{ border: "none" }}>
                            <strong>캠핑장 후기내역이 없습니다.</strong>
                          </td>
                        </tr>
                      )}
                      <CampReviewPage />
                    </tbody>
                  </table>
                </div>
              )}

              {showProdTable && (
                <div className='myprodReview' style={{ marginTop: "50px" }}>
                  <table className='reviewList'>
                    <thead>
                      <tr>
                        <th style={{ width: "319px" }}>상품명</th>
                        <th>내용</th>
                        <th>별점</th>
                        <th style={{ textAlign: "center" }}>작성일</th>
                      </tr>
                    </thead>
                    <tbody>
                      {previewList && previewList.length > 0 ? (
                        previewList.map((review, index2) => (
                          <tr key={review.prodKeyNum}>
                            <th>
                              <Link
                                to={"/prod/view/" + review.prodKeyNum}
                                style={{
                                  color: "black",
                                  textDecoration: "none",
                                  fontSize: "12pt",
                                }}
                              >
                                {review.prodTitle}
                              </Link>
                            </th>
                            <th style={{ fontSize: "12pt" }}>
                              <span
                                style={{
                                  display: "inline-block",
                                  width: "210px",
                                  height: "35px",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                  lineHeight: "40px",
                                }}
                              >
                                {review.prodReviewContent}
                              </span>
                            </th>
                            <th style={{ fontSize: "12pt" }}>
                              {review.prodReviewRating}
                            </th>
                            <th style={{ fontSize: "12pt" }}>
                              {review.prodReviewDate}&nbsp;&nbsp;&nbsp;
                              <button
                                className='btn btn_detail'
                                id='detail'
                                onClick={(e) =>
                                  handleShow2(index2, review.prodReviewNum, e)
                                }
                              >
                                수정
                              </button>
                              <>
                                <Modal
                                  key={review.index2}
                                  show={show2 && showIndex2 === index2}
                                  onHide={handleClose2}
                                >
                                  <Modal.Header closeButton>
                                    <Modal.Title> 후기 수정하기</Modal.Title>
                                  </Modal.Header>
                                  <Modal.Body>
                                    <div id='thismodal'>
                                      <p>{review.prodTitle}</p>
                                      <p>
                                        <img
                                          src={review.prodImage}
                                          alt='campImage'
                                        />
                                      </p>
                                      <div className='reviewRating'>
                                        <Box>
                                          <Typography>평점 주기</Typography>
                                          <Rating
                                            name='prodReviewRating'
                                            value={value2}
                                            onChange={(event, newValue2) => {
                                              setValue2(newValue2);
                                            }}
                                          />
                                        </Box>
                                      </div>
                                      <textarea
                                        className='writeProd'
                                        name='prodReviewContent'
                                        placeholder='후기를 작성해주세요'
                                        value={reviewContent2}
                                        onChange={(e) => {
                                          setReviewContent2(e.target.value);
                                        }}
                                      />
                                    </div>
                                  </Modal.Body>
                                  <Modal.Footer>
                                    <Button
                                      variant='secondary'
                                      onClick={handleClose2}
                                    >
                                      닫기
                                    </Button>
                                    <Button
                                      variant='primary'
                                      onClick={(e) =>
                                        handleUpdate2(review.prodReviewNum, e)
                                      }
                                    >
                                      저장
                                    </Button>
                                  </Modal.Footer>
                                </Modal>
                              </>
                              <button
                                className='btn btn-delete'
                                id='delete'
                                onClick={(e) =>
                                  handleProdDelete(review.prodReviewNum, e)
                                }
                              >
                                삭제
                              </button>
                            </th>
                          </tr>
                        ))
                      ) : (
                        <tr
                          style={{
                            display: "flex",
                            whiteSpace: "pre",
                            fontSize: "35px",
                            color: "rgb(39, 157, 230)",
                            marginLeft: "350px",
                            marginTop: "50px",
                          }}
                        >
                          <td colSpan='3' style={{ border: "none" }}>
                            <strong>캠핑용품 후기내역이 없습니다.</strong>
                          </td>
                        </tr>
                      )}

                      <ProdReviewPage />
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyReview;
