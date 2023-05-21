import { useDispatch, useSelector } from "react-redux";
import { noticeActions } from "../../reduxs/actions/notice_action";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PageNavigation from "./page_nav";
import TableRow from "./table_row";
// import style from '../../css/noticelist.css';
import style from "../../css/noticeManagement.module.css";
import { useState } from "react";
import PageNavigationSearch from "./page_nav_search";
// import list from "../../image/list.png";

import aleart from "../../image/aleart.png";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const NoticeList = () => {
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const currentPage = useParams().currentPage;
  const p_table = useParams().table;
  const p_searchWords = useParams().searchKey;
  const p_selectedSearchWord = useParams().searchWord;

  console.log("listParams", useParams());

  //검색
  const [searchWords, setSearchWord] = useState({
    table: p_table ? "on" : "on",
    searchKey: p_searchWords ? p_searchWords : "",
    searchWord: p_selectedSearchWord ? p_selectedSearchWord : "",
  });

  // const [currentPage, setCurrentPage] = useState('');

  const noticeList = useSelector((state) => state.notice.noticeList);
  const pv = useSelector((state) =>
    state.notice.pv ? state.notice.pv : { currentPage: 1 }
  );

  const config = {
    headers: {
      Authorization: localStorage.getItem("Authorization"),
    },
  };

  const getNoticeList = (currentPage) => {
    console.log("일반 출력");
    dispatch(noticeActions.getNoticeList(currentPage));
    navigator(`/notice/list/${currentPage}`);
  };

  const searchNoticeList = (currentPage, params) => {
    console.log("검색 출력", params);
    dispatch(noticeActions.searchNoticeList(currentPage, params, config));
    navigator(
      `/notice/list/${currentPage}/${params.table}/${params.searchKey}/${params.searchWord}`
    );
  };

  //select searchKey
  const handleChageSelectSearch = (e) => {
    console.log(e.target.value);
    setSearchWord({ ...searchWords, searchKey: e.target.value });
  };

  //searchword
  const handleSearchWordChange = (e) => {
    setSearchWord({ ...searchWords, searchWord: e.target.value });
  };

  //searchButton
  const handleSearchNotice = (e) => {
    e.preventDefault();
    // console.log("하...", searchWords.searchWord, forSearch);
    // 검색어 검색항목을 선택 안할 경우
    if (searchWords.searchKey === "null") {
      setShow(true);
      return;
    }

    if (searchWords.searchWord === p_selectedSearchWord) {
      setShow(true);
      return;
    }

    // 검색어가 비어있을 경우 알림창을 띄우기
    if (!searchWords.searchWord) {
      setShow(true);
      return;
    }

    const params = {
      table: searchWords.table,
      searchKey: searchWords.searchKey,
      searchWord: searchWords.searchWord,
    };
    console.log(params);

    searchNoticeList(1, params);
  };

  const gotoback = (e) => {
    e.preventDefault();
    window.location.href = "/notice/list/1";
  };

  useEffect(() => {
    if (searchWords.searchWord) {
      searchNoticeList(currentPage, searchWords);
    } else {
      getNoticeList(currentPage);
    }
  }, [currentPage]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  return (
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
        {searchWords.searchWord ? (
          <Modal.Body style={{ margin: "auto" }}>
            검색항목을 선택해주세요
          </Modal.Body>
        ) : (
          <Modal.Body style={{ margin: "auto" }}>
            검색어를 작성해주세요
          </Modal.Body>
        )}

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
      <div className={style.managmentCommon}>
        <div className={style.commonTop}>
          <p>공지사항</p>
        </div>
        <div className={style.commonUnder}>
          <div className={style.managmentContent}>
            {/* 관리자페이지갈아끼워야하는부분 시작 */}

            <div className={style.memListTop}>
              <p className={style.membetText}>
                <img src={aleart} style={{ width: "130px" }} /> 캠핑철의 소식을
                확인하세요 !
              </p>
              {searchWords.searchWord ? (
                <p className={style.memberSubText}>
                  검색결과 : {pv?.totalCount || 0}개
                </p>
              ) : (
                <p className={style.memberSubText}>
                  총 게시글 : {pv?.totalCount || 0}개
                </p>
              )}
            </div>
            <div className={style.memberList}>
              {noticeList && noticeList.length > 0 ? (
                <>
                  <table className={style.table}>
                    <thead>
                      <tr>
                        <th>번호</th>
                        <th style={{ width: "600px" }}>제목</th>
                        <th>작성일</th>
                        <th>작성자</th>
                        <th>조회수</th>
                      </tr>
                    </thead>
                    <tbody>
                      {noticeList.map((notice) => {
                        return (
                          <TableRow
                            notice={notice}
                            navigator={navigator}
                            key={notice.noticeNum}
                            currentPage={currentPage}
                            searchWords={searchWords}
                          />
                        );
                      })}
                    </tbody>
                  </table>
                  <div className={style.boardPage}>
                    {pv && searchWords.searchWord ? (
                      <>
                        <PageNavigationSearch
                          searchNoticeList={searchNoticeList}
                          pv={pv}
                          searchWords={searchWords}
                        />
                      </>
                    ) : (
                      <PageNavigation getNoticeList={getNoticeList} />
                    )}
                  </div>
                  <div className={style.boardSearch}>
                    <div>
                      <select
                        className={style.searchChoose}
                        onChange={handleChageSelectSearch}
                        value={searchWords.searchKey}
                      >
                        <option name="null" value="null">
                          선택
                        </option>
                        <option name="searchKey" value="noticeTitle">
                          제목
                        </option>
                        <option name="searchKey" value="noticeContent">
                          내용
                        </option>
                        <option name="searchKey" value="all">
                          제목+내용
                        </option>
                      </select>

                      <input
                        type="text"
                        className={style.searchWord}
                        placeholder="검색어를 입력하세요"
                        onChange={handleSearchWordChange}
                        defaultValue=""
                      />

                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleSearchNotice}
                      >
                        검색
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>작성일</th>
                        <th>작성자</th>
                        <th>조회수</th>
                      </tr>
                    </thead>
                  </table>
                  <p style={{ textAlign: "center", marginBottom: "50px" }}>
                    검색 결과가 없습니다.
                  </p>
                  <div style={{ textAlign: "center" }}>
                    <button
                      onClick={gotoback}
                      className="btn btn-primary"
                      style={{ marginBottom: "50px" }}
                    >
                      리스트
                    </button>

                    <div>
                      <select
                        className={style.searchChoose}
                        onChange={handleChageSelectSearch}
                        value={searchWords.searchKey}
                      >
                        <option name="null" value="null">
                          선택
                        </option>
                        <option name="searchKey" value="noticeTitle">
                          제목
                        </option>
                        <option name="searchKey" value="noticeContent">
                          내용
                        </option>
                        <option name="searchKey" value="all">
                          제목+내용
                        </option>
                      </select>

                      <input
                        type="text"
                        className={style.searchWord}
                        placeholder="검색어를 입력하세요"
                        onChange={handleSearchWordChange}
                      />

                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleSearchNotice}
                      >
                        검색
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
            {/* 관리자페이지갈아끼워야하는부분 끝 */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default NoticeList;
