import { useEffect, useState } from "react";
import check from "../../image/check.png";
import list from "../../image/list.png";
import style from "../../css/orderManagement.module.css";
import SearchDate from "../common/searchDatePicker";
import PageNavigation from "./page_nav";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { reviewActions } from "../../reduxs/actions/review_action";

import { useNavigate } from "react-router-dom";

const ReviewManagement = () => {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState("a");
  const [endDate, setEndDate] = useState("a");

  const [selectedRating, setSelectedRating] = useState("zzz");
  const [selectedSearchKey, setSelectedSearchKey] = useState("void");
  const [selectedSearchWord, setSelectedSearchWord] = useState("");

  const List = useSelector((state) => state.review.reviewList);
  const pv = useSelector((state) =>
    state.review.pv ? state.review.pv : { currentPage: 1 }
  );
  const totalCount = pv.totalCount;

  const [params, setParams] = useState({
    startDate: startDate,
    endDate: endDate,
    rating: selectedRating,
    searchKey: selectedSearchKey,
    searchWord: selectedSearchWord,
  });

  const config = {
    headers: {
      Authorization: localStorage.getItem("Authorization"),
    },
  };

  const getReviewList = (currentPage, params) => {
    dispatch(reviewActions.getReviewList(currentPage, params, config));
  };

  const getReviewDelete = (prodReviewNum) => {
    dispatch(reviewActions.getReviewDelete(prodReviewNum, config));
  };

  //////////////////////////////////////

  // 체크된 아이템을 담을 배열
  const [checkItems, setCheckItems] = useState([]);

  // 체크박스 단일 선택
  const handleSingleCheck = (checked, id) => {
    console.log(checked, id);
    if (checked) {
      // 단일 선택 시 체크된 아이템을 배열에 추가
      setCheckItems((prev) => [...prev, id]);
      console.log(checkItems);
    } else {
      // 단일 선택 해제 시 체크된 아이템을 제외한 배열 (필터)
      setCheckItems(checkItems.filter((el) => el !== id));
    }
  };

  // 체크박스 전체 선택
  const handleAllCheck = (checked) => {
    console.log(checked);
    if (checked) {
      // 전체 선택 클릭 시 데이터의 모든 아이템(id)를 담은 배열로 checkItems 상태 업데이트
      const idArray = [];
      List.forEach((el) => idArray.push(el.prodReviewNum));

      setCheckItems(idArray);
    } else {
      // 전체 선택 해제 시 checkItems 를 빈 배열로 상태 업데이트
      setCheckItems([]);
    }
  };

  /////////////////////////

  //select rating
  const handleChageSelectRating = (e) => {
    setSelectedRating(e.target.value);
    console.log("SelectRating : " + e.target.value);
  };

  //select searchkey
  const handleChageSelectSearchkey = (e) => {
    setSelectedSearchKey(e.target.value);
    console.log("SelectSearchkey : " + e.target.value);
  };

  //searchword
  const handleSearchWordChange = (e) => {
    setSelectedSearchWord(e.target.value);
  };

  // 검색버튼
  const searchbtn = async (e) => {
    e.preventDefault();

    const params = {
      startDate: startDate,
      endDate: endDate,
      rating: selectedRating,
      searchKey: selectedSearchKey,
      searchWord: selectedSearchWord,
    };
    console.log(params);

    if (selectedSearchKey === "void" && selectedSearchWord !== "") {
      alert("검색옵션을 선택해주세요");
      return false;
    } else if (selectedSearchKey !== "void" && selectedSearchWord === "") {
      alert("검색어를 입력해주세요");
      return false;
    }

    getReviewList(pv.currentPage, params);
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    // 모든 삭제가 완료될 때까지 기다립니다.
    await Promise.all(checkItems.map((item) => getReviewDelete(item)));

    const params = {
      startDate: startDate,
      endDate: endDate,
      rating: selectedRating,
      searchKey: selectedSearchKey,
      searchWord: selectedSearchWord,
    };

    // 삭제가 완료된 후에 getReviewList() 함수를 호출합니다.
    getReviewList(pv.currentPage, params);
  };
  ///////////////////////////

  function isHttpUrl(url) {
    return url.startsWith("https://");
  }
  /////////////////////////

  useEffect(() => {
    getReviewList(1, params);
  }, []);

  return (
    <div>
      <div className={style.managmentCommon}>
        <div className={style.commonTop}>
          <div className={style.commonRight}>
            <p className={style.topbar}>캠핑용품 리뷰 관리</p>
          </div>
        </div>
        <div className={style.commonUnder}>
          <div className={style.managmentContent}>
            {/* 관리자페이지갈아끼워야하는부분 시작 */}
            <div className={style.managmentContentTop}>
              <div>
                <p className={style.membetText}>
                  <img src={check} />
                  리뷰를 검색하세요
                </p>
              </div>
              <div className={style.membersearch}>
                <table>
                  <tr>
                    <td>리뷰 등록 기간</td>
                    <SearchDate setStart={setStartDate} setEnd={setEndDate} />
                  </tr>
                  <tr>
                    <td>평점</td>
                    <td colSpan='2'>
                      <select
                        className={style.memberStatus}
                        onChange={handleChageSelectRating}
                        value={selectedRating}
                      >
                        <option name='rating' value='zzz'>
                          전체
                        </option>
                        <option name='rating' value='aaa'>
                          5
                        </option>
                        <option name='rating' value='bbb'>
                          4
                        </option>
                        <option name='rating' value='ccc'>
                          3
                        </option>
                        <option name='rating' value='ddd'>
                          2
                        </option>
                        <option name='rating' value='eee'>
                          1
                        </option>
                      </select>
                    </td>
                  </tr>

                  <tr>
                    <td>검색어</td>
                    <td>
                      <select
                        className={style.searchCategory}
                        onChange={handleChageSelectSearchkey}
                        value={selectedSearchKey}
                      >
                        <option name='searchKey' value='void'>
                          선택
                        </option>
                        <option name='searchKey' value='prodKeyNum'>
                          상품번호
                        </option>
                        <option name='searchKey' value='prodTitle'>
                          상품명
                        </option>
                        <option name='searchKey' value='userID'>
                          작성자ID
                        </option>
                      </select>
                    </td>
                    <td>
                      <input
                        type='text'
                        className={style.searchWord}
                        placeholder='검색어를 입력하세요'
                        onChange={handleSearchWordChange}
                      />
                      <button
                        type='button'
                        className='btn btn-primary'
                        onClick={searchbtn}
                      >
                        검색
                      </button>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
            <div className={style.managmentContentUnder}>
              <div className={style.memListTop}>
                <p className={style.membetText}>
                  <img src={list} />
                  리뷰 목록
                </p>
                <p className={style.memberSubText}>
                  선택 : {checkItems.length}개 / 검색결과 :{" "}
                  {totalCount ? totalCount : 0} 개
                </p>
                <p className={style.controllBtn}>
                  <button
                    type='button'
                    className='btn btn-outline-primary'
                    onClick={handleDelete}
                  >
                    삭제
                  </button>
                </p>
              </div>
              <div className={style.memberList}>
                <table>
                  <thead>
                    <tr>
                      <th>
                        <input
                          type='checkbox'
                          name='select-all'
                          onChange={(e) => handleAllCheck(e.target.checked)}
                          //데이터 개수와 체크된 아이템의 개수가 다를 경우 선택 해제 (하나라도 해제 시 선택 해제)
                          checked={checkItems.length === 5 ? true : false}
                        />
                      </th>
                      <th>리뷰번호</th>
                      <th colSpan='2'>상품명</th>
                      <th>작성자ID</th>
                      <th>닉네임</th>
                      <th>리뷰내용</th>
                      <th>별점</th>
                      <th>작성일</th>
                    </tr>
                  </thead>
                  <tbody>
                    {List && List.length !== 0 ? (
                      List.map((list) => {
                        return (
                          <tr key={list.prodReviewNum}>
                            <td style={{ width: "50px" }}>
                              <input
                                type='checkbox'
                                name={`select-${list.prodReviewNum}`}
                                onChange={(e) =>
                                  handleSingleCheck(
                                    e.target.checked,
                                    list.prodReviewNum
                                  )
                                }
                                // 체크된 아이템 배열에 해당 아이템이 있을 경우 선택 활성화, 아닐 시 해제
                                checked={
                                  checkItems.includes(list.prodReviewNum)
                                    ? true
                                    : false
                                }
                              />
                            </td>
                            <td style={{ width: "80px" }}>
                              {list.prodReviewNum}
                            </td>
                            <td style={{ width: "90px" }}>
                              {list.prodImage && (
                                <img
                                  src={
                                    isHttpUrl(list.prodImage)
                                      ? list.prodImage
                                      : "/images/" + list.prodImage
                                  }
                                  width='80'
                                  height='80'
                                />
                              )}
                            </td>
                            <td style={{ width: "200px" }}>
                              {list.prodTitle
                                ? list.prodTitle.substring(0, 20) + "..."
                                : "제목이 없습니다."}
                            </td>
                            <td style={{ width: "85px" }}>
                              {list.userID ? list.userID : "탈퇴회원"}
                            </td>
                            <td style={{ width: "85px" }}>
                              {list.userNick ? list.userNick : "탈퇴회원"}
                            </td>
                            <td>{list.prodReviewContent}</td>
                            <td style={{ width: "70px" }}>
                              {list.prodReviewRating}
                            </td>
                            <td style={{ width: "120px" }}>
                              {new Date(
                                list.prodReviewDate
                              ).toLocaleDateString()}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <>
                        <tr>
                          <td colSpan='9'>검색결과가 없습니다.</td>
                        </tr>
                      </>
                    )}
                  </tbody>
                </table>
              </div>
              <div className='d-flex justify-content-center'>
                {totalCount && getReviewList ? (
                  <>
                    <PageNavigation
                      getReviewList={getReviewList}
                      startDate={startDate}
                      endDate={endDate}
                      selectedRating={selectedRating}
                      selectedSearchKey={selectedSearchKey}
                      selectedSearchWord={selectedSearchWord}
                    />
                  </>
                ) : (
                  <>{/* <PageNavigation getList={SearchProdList} /> */}</>
                )}
              </div>
            </div>
            {/* 관리자페이지갈아끼워야하는부분 끝 */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewManagement;
