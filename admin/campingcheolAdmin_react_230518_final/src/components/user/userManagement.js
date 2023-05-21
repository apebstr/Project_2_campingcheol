import { useEffect, useState } from "react";
import style from "../../css/userManagement.module.css";
import check from "../../image/check.png";
import list from "../../image/list.png";
import PageNavigation from "./page_nav";
import PageNavigationSearch from "./page_nav_search";

// import TableRowDrop from './table_row_drop';
// import TableRowUser from './table_row_user';
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../reduxs/actions/user_action";

const UserManagement = () => {
  const dispatch = useDispatch();

  var thisYear = new Date().getFullYear(); // 현재 연도

  const [selected, setSelected] = useState("userInfo");
  const [selectedSearchKey, setSelectedSearchKey] = useState("userID");
  const [selectedSearchWord, setSelectedSearchWord] = useState("");

  const params = {
    table: selected,
    searchKey: selectedSearchKey,
    searchWord: selectedSearchWord,
  };

  const userList = useSelector((state) => state.user.userList);
  const dropList = useSelector((state) => state.user.dropList);

  const pv = useSelector((state) =>
    state.user.pv ? state.user.pv : { currentPage: 1 }
  );
  const totalCount = pv.totalCount;

  const config = {
    headers: {
      Authorization: localStorage.getItem("Authorization"),
    },
  };

  const getUserList = (currentPage, params) => {
    dispatch(userActions.getUserList(currentPage, params, config));
  };

  const getUserDropList = (currentPage) => {
    dispatch(userActions.getUserDropList(currentPage, config));
  };

  //////////////////////검색

  //select 회원조회
  const handleChageSelectUser = (e) => {
    setSelected(e.target.value);
    console.log("selected : " + selected);
    if (e.target.value === "userInfo") {
      console.log("전체회원 " + e.target.value);
      getUserList(1);
    } else if (e.target.value === "userDrop") {
      console.log("탈퇴회원 " + e.target.value);
      getUserDropList(1);
    }
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
  const handleSearchUser = (e) => {
    e.preventDefault();

    const params = {
      table: selected,
      searchKey: selectedSearchKey,
      searchWord: selectedSearchWord,
    };
    console.log(params);

    getUserList(1, params);
  };

  useEffect(() => {
    getUserList(1, params);
    handleAllCheck(false);
  }, []);

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
      userList.forEach((el) => idArray.push(el.userKeynum));
      setCheckItems(idArray);
    } else {
      // 전체 선택 해제 시 checkItems 를 빈 배열로 상태 업데이트
      setCheckItems([]);
    }
  };
  /////////////////////////

  //회원탈퇴
  const handleUpdateDropUser = (e) => {
    e.preventDefault();
    console.log("click");

    checkItems.forEach((item) => {
      dispatch(
        userActions.updateDropUser(item, {
          headers: { Authorization: localStorage.getItem("Authorization") },
        })
      );
    });

    window.location.replace(`/admin/user`);
  };

  return (
    <div>
      <div className={style.managmentCommon}>
        <div className={style.commonTop}>
          <div className={style.commonRight}>
            <p className={style.topbar}>회원관리</p>
          </div>
        </div>
        <div className={style.commonUnder}>
          <div className={style.managmentContent}>
            {/* 관리자페이지갈아끼워야하는부분 시작 */}
            <div className={style.managmentContentTop}>
              <div>
                <p className={style.membetText}>
                  <img src={check} />
                  회원을 검색하세요
                </p>
              </div>
              <div className={style.membersearch}>
                <table>
                  <tr>
                    <td>회원 분류</td>
                    <td>
                      <select
                        className={style.memberStatus}
                        onChange={handleChageSelectUser}
                        value={selected}
                      >
                        <option name='memberStatus' value='userInfo'>
                          일반 회원
                        </option>
                        <option name='memberStatus' value='userDrop'>
                          탈퇴 회원
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
                        <option name='searchKey' value='userID'>
                          ID
                        </option>
                        <option name='searchKey' value='userName'>
                          이름
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
                        onClick={handleSearchUser}
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
                  회원 목록
                </p>

                {selected === "userInfo" ? (
                  <>
                    <p className={style.memberSubText}>
                      선택 : {checkItems.length}명 / 검색결과 :
                      {totalCount ? totalCount : 0} 명
                    </p>
                    <p className={style.controllBtn}>
                      <button
                        type='button'
                        className='btn btn-outline-primary'
                        onClick={handleUpdateDropUser}
                      >
                        탈퇴회원으로 전환
                      </button>
                    </p>
                  </>
                ) : (
                  <>
                    <p className={style.memberSubText}>
                      검색결과 :{totalCount ? totalCount : 0} 명
                    </p>
                  </>
                )}
              </div>
            </div>

            {userList && selected === "userInfo" ? (
              <>
                <div className={style.memberList}>
                  <table>
                    <thead>
                      <tr>
                        <th>
                          <input
                            type='checkbox'
                            name='select-all'
                            onChange={(e) => handleAllCheck(e.target.checked)}
                            // 데이터 개수와 체크된 아이템의 개수가 다를 경우 선택 해제 (하나라도 해제 시 선택 해제)
                            checked={checkItems.length === 5 ? true : false}
                          />
                        </th>
                        <th>회원번호</th>
                        <th>아이디</th>
                        <th>이름</th>
                        <th>닉네임</th>
                        <th>연락처</th>
                        <th>주소</th>
                        <th>성별</th>
                        <th>나이</th>
                        <th>가입일</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userList && userList.length !== 0 ? (
                        userList.map((user) => {
                          return (
                            // <TableRowUser user={user} key={user.userKeynum} />
                            <tr key={user.userKeynum}>
                              <td>
                                <input
                                  type='checkbox'
                                  name={`select-${user.userKeynum}`}
                                  onChange={(e) =>
                                    handleSingleCheck(
                                      e.target.checked,
                                      user.userKeynum
                                    )
                                  }
                                  // 체크된 아이템 배열에 해당 아이템이 있을 경우 선택 활성화, 아닐 시 해제
                                  checked={
                                    checkItems.includes(user.userKeynum)
                                      ? true
                                      : false
                                  }
                                />
                              </td>
                              <td>{user.userKeynum}</td>
                              <td>{user.userID}</td>
                              <td>{user.userName}</td>
                              <td>{user.userNick}</td>
                              <td>{user.userPhone}</td>
                              <td>
                                {user.userAddr
                                  ? user.userAddr
                                      .replace(/\//g, " ")
                                      .substring(0, 30) + "..."
                                  : ""}
                              </td>
                              <td>{user.userSex === "1" ? "남성" : "여성"}</td>
                              <td>{thisYear - user.userAge}</td>
                              <td>
                                {new Date(
                                  user.userRegdate
                                ).toLocaleDateString()}
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <>
                          <>
                            <tr>
                              <td colSpan='10'>검색결과가 없습니다.</td>
                            </tr>
                          </>
                        </>
                      )}
                    </tbody>
                  </table>
                </div>
                <div className='d-flex justify-content-center'>
                  {getUserList ? (
                    <>
                      <PageNavigationSearch
                        getUserList={getUserList}
                        selected={selected}
                        selectedSearchKey={selectedSearchKey}
                        selectedSearchWord={selectedSearchWord}
                      />
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </>
            ) : (
              <>
                <div className={style.memberList}>
                  <table>
                    <thead>
                      <tr>
                        <th>탈퇴번호</th>
                        <th>회원번호</th>
                        <th>아이디</th>
                        <th>이름</th>
                        <th>탈퇴일</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dropList && dropList.length != 0 ? (
                        dropList.map((drop) => {
                          return (
                            // <TableRowDrop user={user} key={user.dropKeynum} />
                            <tr key={drop.dropKeynum}>
                              <td>{drop.dropKeynum}</td>
                              <td>{drop.userKeynum}</td>
                              <td>{drop.userID}</td>
                              <td>{drop.userName}</td>
                              <td>
                                {new Date(
                                  drop.userDropdate
                                ).toLocaleDateString()}
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <>
                          <tr>
                            <td colSpan='5'>검색결과가 없습니다.</td>
                          </tr>
                        </>
                      )}
                    </tbody>
                  </table>
                </div>
                <div className='d-flex justify-content-center'>
                  {totalCount && getUserDropList ? (
                    <>
                      <PageNavigation getUserDropList={getUserDropList} />
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </>
            )}

            {/* 관리자페이지갈아끼워야하는부분 끝 */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
