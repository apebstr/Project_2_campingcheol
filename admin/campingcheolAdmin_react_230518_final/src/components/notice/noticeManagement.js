import { useEffect, useState } from "react";
import check from "../../image/check.png";
import list from "../../image/list.png";
import style from "../../css/noticeManagement.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { noticeActions } from "../../reduxs/actions/notice_action";
import PageNavigation from "./page_nav";
import PageNavigationSearch from "./page_nav_search";
import axios from "axios";

const NoticeManagement = () => {
  const [startDate, setStartDate] = useState(new Date());
  const dispatch = useDispatch();
  const navigator = useNavigate();

  //검색
  const [selectedtable, setSelectedtable] = useState("plus");
  const [selectedSearchKey, setSelectedSearchKey] = useState("null");
  const [selectedSearchWord, setSelectedSearchWord] = useState("");

  const [currentPage, setCurrentPage] = useState("");

  const noticeList = useSelector((state) => state.notice.noticeList);
  const pv = useSelector((state) =>
    state.notice.pv ? state.notice.pv : { currentPage: 1 }
  );

  //검색결과없을때
  const [searchResult, setSearchResult] = useState([]);
  //위까지

  const config = {
    headers: {
      Authorization: localStorage.getItem("Authorization"),
    },
  };

  const getNoticeList = (currentPage) => {
    dispatch(noticeActions.getNoticeList(currentPage));
  };

  const searchNoticeList = (currentPage, params) => {
    dispatch(noticeActions.searchNoticeList(currentPage, params, config));
  };

  //select table
  const handleChageSelectPosting = (e) => {
    setSelectedtable(e.target.value);
    console.log("Selectedtable : " + e.target.value);
  };

  //select searchKey
  const handleChageSelectSearch = (e) => {
    setSelectedSearchKey(e.target.value);
    console.log("selectedSearchKey : " + e.target.value);
  };

  //searchword
  const handleSearchWordChange = (e) => {
    setSelectedSearchWord(e.target.value);
  };

  //searchButton
  const handleSearchNotice = (e) => {
    e.preventDefault();

    // 검색어 검색항목을 선택 안할 경우
    if (selectedSearchKey === "null") {
      alert("검색항목을 선택해주세요");
      return;
    }

    // 검색어가 비어있을 경우 알림창을 띄우기
    if (!selectedSearchWord) {
      alert("검색어를 입력하세요.");
      return;
    }

    const params = {
      table: selectedtable,
      searchKey: selectedSearchKey,
      searchWord: selectedSearchWord,
    };
    console.log(params);

    searchNoticeList(1, params);
  };

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
    if (searchNoticeList.length === 0) return; // 검색결과가 없으면 리턴
    if (checked) {
      // 전체 선택 클릭 시 데이터의 모든 아이템(id)를 담은 배열로 checkItems 상태 업데이트
      const idArray = [];
      noticeList.forEach((el) => idArray.push(el.noticeNum));
      setCheckItems(idArray);
    } else {
      // 전체 선택 해제 시 checkItems 를 빈 배열로 상태 업데이트
      setCheckItems([]);
    }
  };

  // 체크된 아이템의 개수가 5개가 아니면 전체 선택 체크박스 선택 해제
  useEffect(() => {
    if (checkItems.length !== 5) {
      const selectAllCheckBox = document.querySelector(
        'input[name="select-all"]'
      );
      selectAllCheckBox.checked = false;
    }
  }, [checkItems]);

  const getCheckedItemCount = () => {
    return checkItems.length;
  };

  const [selectedStatus, setSelectedStatus] = useState("전체");
  // 필터링된 게시글 목록
  const [filteredNotices, setFilteredNotices] = useState([]);

  // 게시 상태 필터링 이벤트 핸들러
  useEffect(() => {
    if (selectedStatus === "전체") {
      setFilteredNotices(noticeList);
    } else {
      const filtered = noticeList.filter(
        (noticeList) =>
          noticeList.noticeState === (selectedStatus === "게시 중" ? "1" : "2")
      );
      setFilteredNotices(filtered);
    }
  }, [noticeList, selectedStatus]);

  //게시상태수정
  const handleNoticeStateChange = (e) => {
    e.preventDefault();
    checkItems.forEach(async (num) => {
      // 현재 notice의 상태값 가져오기
      const notice = noticeList.find((n) => n.noticeNum === num);

      // noticeState 값 변경
      const newNoticeState = notice.noticeState === "1" ? "2" : "1";

      const formData = new FormData();
      formData.append("noticeNum", num);
      formData.append("noticeState", newNoticeState);
      formData.append("noticeTitle", notice.noticeTitle);
      formData.append("noticeContent", notice.noticeContent);
      formData.append("currentPage", pv.currentPage);

      await dispatch(
        noticeActions.getNoticeUpdate(formData, {
          headers: { Authorization: localStorage.getItem("Authorization") },
        })
      );
    });
    // 값이 변경된 후, 다시 해당 페이지를 불러오는 작업 추가
    window.location.replace("/admin/notice");
  };

  //삭제
  const handleDelete = (e) => {
    e.preventDefault();
    checkItems.forEach((num) => {
      dispatch(
        noticeActions.getNoticeDelete(num, {
          headers: { Authorization: localStorage.getItem("Authorization") },
        })
      );
    });
    window.location.replace("/admin/notice");
    // 삭제가 완료된 후, 다시 해당 페이지를 불러오는 작업 추가
  };

  //useEffect
  useEffect(() => {
    getNoticeList(1);
  }, []);

  return (
    <div>
      <div className={style.managmentCommon}>
        <div className={style.commonTop}>
          <div className={style.commonRight}>
            <p className={style.topbar}>공지사항 관리</p>
          </div>
        </div>

        <div className={style.commonUnder}>
          <div className={style.managmentContent}>
            {/* 관리자페이지갈아끼워야하는부분 시작 */}
            <div className={style.managmentContentTop}>
              <div>
                <p className={style.membetText}>
                  <img src={check} />
                  공지사항 등록 및 관리
                </p>
              </div>
              <div className={style.membersearch}>
                <table>
                  <tr>
                    <td>게시 상태</td>
                    <td colSpan='2'>
                      <select
                        className={style.memberStatus}
                        onChange={handleChageSelectPosting}
                        value={selectedtable}
                      >
                        <option name='table' value='plus'>
                          전체
                        </option>
                        <option name='table' value='on'>
                          게시 중
                        </option>
                        <option name='table' value='off'>
                          게시 중지
                        </option>
                      </select>
                    </td>
                  </tr>

                  <tr>
                    <td>검색어</td>
                    <td>
                      <select
                        className={style.searchCategory}
                        onChange={handleChageSelectSearch}
                        value={selectedSearchKey}
                      >
                        <option name='null' value='null'>
                          선택
                        </option>
                        <option name='searchKey' value='noticeTitle'>
                          제목
                        </option>
                        <option name='searchKey' value='noticeContent'>
                          내용
                        </option>
                        <option name='searchKey' value='all'>
                          제목+내용
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
                        onClick={handleSearchNotice}
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
                  공지사항 목록
                </p>
                <p className={style.memberSubText}>
                  선택 : {getCheckedItemCount()}개 / 검색결과 :{" "}
                  {pv?.totalCount || 0}개
                </p>

                <p className={style.controllBtn}>
                  <Link
                    className='btn btn-outline-primary'
                    to='/admin/notice/write'
                    button
                    type='button'
                  >
                    글쓰기
                  </Link>

                  <button
                    type='button'
                    className='btn btn-outline-primary'
                    onClick={handleDelete}
                  >
                    삭제
                  </button>

                  <button
                    type='button'
                    className='btn btn-outline-primary'
                    onClick={handleNoticeStateChange}
                  >
                    게시 상태
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
                        />
                      </th>
                      <th>번호</th>
                      <th>제목</th>
                      <th>작성일</th>
                      <th>작성자</th>
                      <th>조회수</th>
                      <th>게시상태</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(!noticeList || noticeList.length === 0) && (
                      <tr>
                        <td colSpan='7' style={{ textAlign: "center" }}>
                          검색 결과가 없습니다.
                        </td>
                      </tr>
                    )}
                    {noticeList &&
                      noticeList.length !== 0 &&
                      noticeList.map((notice) => {
                        return (
                          <>
                            <tr key={notice.noticeNum}>
                              <td>
                                <input
                                  type='checkbox'
                                  name={`select-${notice.noticeNum}`}
                                  onChange={(e) =>
                                    handleSingleCheck(
                                      e.target.checked,
                                      notice.noticeNum
                                    )
                                  }
                                  checked={
                                    checkItems.includes(notice.noticeNum)
                                      ? true
                                      : false
                                  }
                                />
                              </td>
                              <td>{notice.noticeNum}</td>
                              <td>
                                <Link
                                  to={`/admin/notice/view/${notice.noticeNum}`}
                                >
                                  {notice.noticeTitle}
                                </Link>
                              </td>
                              <td>
                                {new Date(
                                  notice.noticeRegdate
                                ).toLocaleDateString()}
                              </td>
                              <td>{notice.adminId}</td>
                              <td>{notice.noticeReadCount}</td>
                              <td
                                style={{
                                  color:
                                    notice.noticeState === "1"
                                      ? "black"
                                      : "red",
                                }}
                              >
                                {notice.noticeState === "1"
                                  ? "게시 중"
                                  : "게시 중지"}
                              </td>
                            </tr>
                          </>
                        );
                      })}
                  </tbody>
                </table>
              </div>
              <div className='d-flex justify-content-center'>
                {searchNoticeList ? (
                  searchNoticeList.length !== 0 ? (
                    <PageNavigationSearch
                      searchNoticeList={searchNoticeList}
                      pv={pv}
                      selectedtable={selectedtable}
                      selectedSearchKey={selectedSearchKey}
                      selectedSearchWord={selectedSearchWord}
                    />
                  ) : (
                    <p style={{ textAlign: "center" }}>검색 결과가 없습니다.</p>
                  )
                ) : (
                  <PageNavigation getNoticeList={getNoticeList} />
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

export default NoticeManagement;
