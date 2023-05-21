import React, { useEffect, useState } from "react";
import "../../css/camp_view.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CampMapList from "./camp_maplist.js";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import CampJjim from "./camp_jjim.js";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { campActions } from "../../reduxs/actions/camp_action";
import PageNavigation from "./page_nav";
import PageNavigationReview from "./page_nav_review";
import { baseUrl } from "../../apiurl";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import Typography from "@material-ui/core/Typography";
import DateRangeIcon from "@material-ui/icons/DateRange";
import dateicon from "../../image/dateSelector (2).png";
import emptyheart from "../../image/emptyheart.png";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import ko from "date-fns/locale/ko"; //캘린더 한글출력
registerLocale("ko", ko);

const CampView = () => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const [activeTab, setActiveTab] = useState("home");
  const [value, setValue] = React.useState(3);
  const { num } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const campSiteDetail = useSelector((state) => state.campSite.campSiteDetail);
  const userID = localStorage.userID;

  const campReviewList = useSelector((state) => state.campSite.campReviewList); // 캠핑장 후기
  const pv = useSelector((state) =>
    state.campSite.pv ? state.campSite.pv : { currentPage: 1 }
  );

  //캠핑장 후기 가져오기
  const getCampReview = (currentPage, num) => {
    dispatch(campActions.getCampReview(currentPage, num));
  };

  const config = {
    headers: {
      Authorization: localStorage.getItem("Authorization"),
    },
  };

  //캠핑장 상세내용 가져오기
  const getCampDetail = (num, formData) => {
    if (userID) {
      dispatch(campActions.getCampDetail(num, userID, formData, config));
    } else {
      dispatch(campActions.getCampDetailW(num));
    }
  };

  useEffect(() => {
    getCampDetail(num, userID);
    getCampReview(pv.currentPage, num);
  }, []);

  if (startDate) {
    var startYear = startDate.getFullYear();
    var startMonth = ("0" + (startDate.getMonth() + 1)).slice(-2);
    var startDay = ("0" + startDate.getDate()).slice(-2);

    var StartDateString = `${startYear}/${startMonth}/${startDay}`;
  }

  if (endDate) {
    var endYear = endDate.getFullYear();
    var endMonth = ("0" + (endDate.getMonth() + 1)).slice(-2);
    var endDay = ("0" + endDate.getDate()).slice(-2);

    var endDateString = `${endYear}/${endMonth}/${endDay}`;
  }

  //////////////////////////////////////////////////////////////////////////////////////

  //캘린더 날짜 눌렀을 때 예약 가능여부 확인
  const reservData = {
    campKeyNum: campSiteDetail.campKeyNum,
    dateArray: [],
  };

  let currentDate = new Date(startDate);

  while (currentDate < endDate) {
    reservData.dateArray.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  const nextDate = new Date(currentDate);
  nextDate.setDate(currentDate.getDate() + 1);

  if (nextDate.getMonth() !== currentDate.getMonth()) {
    // 일수를 1로 설정하여 다음 달의 첫 번째 날로 이동
    currentDate.setDate(1);
    currentDate.setMonth(currentDate.getMonth() + 1);
  } else {
    // 다음 날짜로 이동
    currentDate = nextDate;
  }

  console.log("데이트어레이", reservData.dateArray);
  console.log("리저브데이터:", reservData);

  //날짜 선택 완료 버튼 클릭 후 서버날짜 형변환 및 날짜 겹치는지 확인
  const handleDateSelect = (roomName) => {
    if (reservData.dateArray.length > 0) {
      const transformedRooms = campSiteDetail.campRooms.map((room) => {
        const transformedStartDate = new Date(room.campReservStart);
        const transformedEndDate = new Date(room.campReservEnd);

        return {
          ...room,
          campReservStart: transformedStartDate,
          campReservEnd: transformedEndDate,
        };
      });

      const dateSelect = transformedRooms.some((room) => {
        return reservData.dateArray.some((date) => {
          return (
            date >= room.campReservStart &&
            date <= room.campReservEnd &&
            room.campRoom == roomName
          );
        });
      });

      return dateSelect;
    }
  };

  //////////////////////////////////////////////////////////////////////////////////////

  //예약하기 버튼1
  const handleReser1 = (e) => {
    e.preventDefault();

    if (!startDate || !endDate) {
      setShow(true);
      return;
    }

    const params = {
      campName: campSiteDetail.campName,
      campImg: campSiteDetail.campImg,
      campOption: "2인용 텐트",
      campPrice: "50,000",
      startDate: StartDateString,
      endDate: endDateString,
    };

    if (userID) {
      navigate("/camp/view/order", { state: params });
    } else {
      alert("로그인 페이지로 이동합니다");
      navigate(`/login`);
    }
  };

  //예약하기 버튼2
  const handleReser2 = (e) => {
    e.preventDefault();

    if (!startDate || !endDate) {
      setShow(true);
      return;
    }

    const params = {
      campName: campSiteDetail.campName,
      campImg: campSiteDetail.campImg,
      campOption: "3인용 텐트",
      campPrice: "100,000",
      startDate: StartDateString,
      endDate: endDateString,
    };

    if (userID) {
      navigate("/camp/view/order", { state: params });
    } else {
      alert("로그인 페이지로 이동합니다");
      navigate(`/login`);
    }
  };

  //예약하기 버튼3
  const handleReser3 = (e) => {
    e.preventDefault();

    if (!startDate || !endDate) {
      setShow(true);
      return;
    }

    const params = {
      campName: campSiteDetail.campName,
      campImg: campSiteDetail.campImg,
      campOption: "4인용 텐트",
      campPrice: "120,000",
      startDate: StartDateString,
      endDate: endDateString,
    };

    if (userID) {
      navigate("/camp/view/order", { state: params });
    } else {
      alert("로그인 페이지로 이동합니다");
      navigate(`/login`);
    }
  };

  // 팝업
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  return (
    <>
      <Modal show={show} onHide={handleClose} style={{ marginTop: "400px" }}>
        <Modal.Header closeButton>
          {/* <Modal.Title>Modal heading</Modal.Title> */}
        </Modal.Header>
        <Modal.Body style={{ margin: "auto" }}>날짜를 선택해주세요</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
      <div className='camp-view-container'>
        <div className='camp-detail'>
          {/* 캠핑장 사진 */}
          <div className='camp-img'>
            <img src={campSiteDetail.campImg} />
            {campSiteDetail.campLineIntro ? (
              <div className='campViewIntro'>
                "{campSiteDetail.campLineIntro}"
              </div>
            ) : (
              ""
            )}
          </div>
          <div className='camp-content'>
            <div className='campviewNameAddr'>
              <p className='camp_tt'>{campSiteDetail.campName}</p>
              <p className='camp_address'>{campSiteDetail.campAddr}</p>
            </div>

            {/*찜하기*/}
            <div className='camp_jjim'>
              {userID ? (
                <CampJjim />
              ) : (
                <div>
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      alert("로그인 페이지로 이동합니다.");
                      navigate("/login");
                    }}
                  >
                    <img src={emptyheart} />
                  </span>
                </div>
              )}
            </div>

            <div className='campview_rating'>
              <Box component='fieldset' mb={3} borderColor='transparent'>
                <Typography component='legend'>
                  {campSiteDetail.avgRating
                    ? `평점: ${campSiteDetail.avgRating} / 5`
                    : `평점: 0.0 / 5`}
                </Typography>
                <Rating
                  name='read-only'
                  value={Number(campSiteDetail.avgRating)}
                  readOnly
                />
              </Box>
            </div>

            <div className='row'>
              <table className='campEnvTable'>
                <tbody>
                  {campSiteDetail.campEnv ? (
                    <tr>
                      <th>캠핑장환경</th>
                      <td>{campSiteDetail.campEnv}</td>
                    </tr>
                  ) : (
                    ""
                  )}

                  {campSiteDetail.campType ? (
                    <tr>
                      <th>캠핑장유형</th>
                      <td>{campSiteDetail.campType}</td>
                    </tr>
                  ) : (
                    ""
                  )}

                  {campSiteDetail.campFcity ? (
                    <tr>
                      <th>부대시설</th>
                      <td>{campSiteDetail.campFcity}</td>
                    </tr>
                  ) : (
                    ""
                  )}
                  {campSiteDetail.campAvailable ? (
                    <tr>
                      <th>주변이용가능시설</th>
                      <td>{campSiteDetail.campAvailable}</td>
                    </tr>
                  ) : (
                    ""
                  )}

                  {campSiteDetail.campHomePage ? (
                    <tr>
                      <th>홈페이지주소</th>
                      <td>
                        <a href={campSiteDetail.campHomePage}>
                          {campSiteDetail.campHomePage}
                        </a>
                      </td>
                    </tr>
                  ) : (
                    ""
                  )}

                  {campSiteDetail.campTel ? (
                    <tr>
                      <th>캠핑장연락처</th>
                      <td>{campSiteDetail.campTel}</td>
                    </tr>
                  ) : (
                    ""
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div>
          {campSiteDetail.campIntro ? (
            <div className='camp-infomation'>
              <p className='camp-title'>숙소 소개</p>
              <hr />
              <div className='camp-intro'>
                <p>{campSiteDetail.campIntro}</p>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>

        {/* 탭설정 */}
        <div
          style={{
            clear: "both",
            paddingTop: campSiteDetail.campIntro ? "10px" : "70px",
          }}
        >
          <ul className='nav nav-tabs' id='myTab' role='tablist'>
            <li className='nav-item' role='presentation'>
              <button
                className={`nav-link ${activeTab === "home" ? "active" : ""}`}
                id='home-tab'
                data-bs-toggle='tab'
                data-bs-target='#home'
                type='button'
                role='tab'
                aria-controls='home'
                aria-selected='true'
                onClick={() => setActiveTab("home")}
              >
                숙소예약
              </button>
            </li>
            <li className='nav-item' role='presentation'>
              <button
                className={`nav-link ${
                  activeTab === "profile" ? "active" : ""
                }`}
                id='profile-tab'
                data-bs-toggle='tab'
                data-bs-target='#profile'
                type='button'
                role='tab'
                aria-controls='profile'
                aria-selected='false'
                onClick={() => setActiveTab("profile")}
              >
                숙소후기
              </button>
            </li>
          </ul>
        </div>

        <div className='tab-content' id='myTabContent'>
          <div
            className={`tab-pane fade ${
              activeTab === "home" ? "show active" : ""
            }`}
            id='home'
            role='tabpanel'
            aria-labelledby='home-tab'
          >
            {/*캘린더*/}
            <div className='camp_calendar'>
              <div className='datePic' style={{ float: "left" }}>
                <div className='selectDate'>
                  <p>
                    <img
                      src={dateicon}
                      style={{ width: "25px", marginRight: "10px" }}
                    />
                    체크인
                  </p>
                  <DatePicker
                    placeholderText='⭐ 체크인 날짜 선택하기'
                    selected={startDate}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    locale='ko' //한글로 변환
                    dateFormat='yyyy년 MM월 dd일'
                    minDate={new Date()} //현재 날짜의 전 날짜 선택 불가
                    className='datePicker'
                    onChange={(date) => setStartDate(date)}
                  />
                </div>

                <div className='selectDate'>
                  <p>
                    {" "}
                    <img
                      src={dateicon}
                      style={{ width: "25px", marginRight: "10px" }}
                    />
                    체크아웃
                  </p>
                  <DatePicker
                    placeholderText='⭐ 체크아웃 날짜 선택하기'
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    className='datePicker'
                    locale='ko' //한글로 변환
                    dateFormat='yyyy년 MM월 dd일'
                  />
                </div>
              </div>
            </div>

            <div className='camp-room-list'>
              <ul>
                <li>
                  <div className='camp-list-con'>
                    <div>
                      {campSiteDetail.campPics ? (
                        <img src={campSiteDetail.campPics[0]} />
                      ) : (
                        0
                      )}

                      <div className='camp_cont'>
                        <h4 className='camp_tt'>2인용 텐트</h4>
                        <div className='camp_info'>
                          <div className='roomPrice_btn'>
                            <div className='camp_room_price'>1박 50,000원</div>
                            {handleDateSelect("2인용 텐트") ? (
                              <button
                                type='button'
                                className='btn btn-secondary'
                                id='campRervBtn'
                                disabled
                                style={{ backgroundColor: "gray" }}
                              >
                                예약불가
                              </button>
                            ) : (
                              <button
                                type='button'
                                className='btn btn-primary'
                                onClick={handleReser1}
                                id='campRervBtn'
                              >
                                예약하기
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className='camp-list-con'>
                    <div>
                      {campSiteDetail.campPics ? (
                        <img src={campSiteDetail.campPics[1]} />
                      ) : (
                        0
                      )}

                      <div className='camp_cont'>
                        <h4 className='camp_tt'>3인용 텐트</h4>
                        <div className='camp_info'>
                          <div className='roomPrice_btn'>
                            <div className='camp_room_price'>1박 100,000원</div>
                            {handleDateSelect("3인용 텐트") ? (
                              <button
                                type='button'
                                className='btn btn-secondary'
                                id='campRervBtn'
                                disabled
                                style={{ backgroundColor: "gray" }}
                              >
                                예약불가
                              </button>
                            ) : (
                              <button
                                type='button'
                                className='btn btn-primary'
                                onClick={handleReser2}
                                id='campRervBtn'
                              >
                                예약하기
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className='camp-list-con'>
                    <div>
                      {campSiteDetail.campPics ? (
                        <img src={campSiteDetail.campPics[2]} />
                      ) : (
                        0
                      )}

                      <div className='camp_cont'>
                        <h4 className='camp_tt'>4인용 텐트</h4>
                        <div className='camp_info'>
                          <div className='roomPrice_btn'>
                            <div className='camp_room_price'>
                              1박 120,000 원
                            </div>

                            {handleDateSelect("4인용 텐트") ? (
                              <button
                                type='button'
                                className='btn btn-secondary'
                                id='campRervBtn'
                                disabled
                                style={{ backgroundColor: "gray" }}
                              >
                                예약불가
                              </button>
                            ) : (
                              <button
                                type='button'
                                className='btn btn-primary'
                                onClick={handleReser3}
                                id='campRervBtn'
                              >
                                예약하기
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>

              <div className='campMapArea'>
                <p className='camp-map'> 숙소 지도 </p>
                <hr />
                <p className='mapAddr'>
                  <b>주소 :</b> {campSiteDetail.campAddr}
                </p>
                <CampMapList />
              </div>
            </div>
          </div>

          {/* 캠핑장 이용후기 확인 */}
          <div
            className={`tab-pane fade ${
              activeTab === "profile" ? "show active" : ""
            }`}
            id='profile'
            role='tabpanel'
            aria-labelledby='profile-tab'
          >
            {campReviewList ? (
              <div>
                {campReviewList.map((review) => (
                  <div className='prodReview'>
                    <p className='reviewProdName'>
                      {review.userNick ? review.userNick : "탈퇴한 회원"}
                    </p>
                    <p className='reviewRating'>
                      <Box
                        component='fieldset'
                        mb={review.campReviewRating}
                        borderColor='transparent'
                      >
                        <Rating
                          name='read-only'
                          value={review.campReviewRating}
                          readOnly
                        />
                      </Box>
                    </p>
                    <p className='reviewContent'>{review.campReviewContent}</p>
                    <p className='reviewDate'>{review.campReviewDate}</p>
                  </div>
                ))}
                {/* 캠핑장 후기 페이징처리*/}
                <div className='view-paging'>
                  {pv ? (
                    <PageNavigationReview
                      getCampReview={getCampReview}
                      num={num}
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            ) : (
              <div>등록된 후기가 없습니다.</div>
            )}
            {/* </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default CampView;
