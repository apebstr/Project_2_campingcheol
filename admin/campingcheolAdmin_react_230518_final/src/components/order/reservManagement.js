import { useEffect, useState } from "react";
import check from "../../image/check.png";
import list from "../../image/list.png";
import style from "../../css/orderManagement.module.css";
import DatePicker from "react-datepicker";
import PageNavigationReserv from "./page_nav_campreserv";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { orderActions } from "../../reduxs/actions/order_action";
import SearchDate from "../common/searchDatePicker";

import { useNavigate } from "react-router-dom";

const OrderSiteManagement = () => {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState("a");
  const [endDate, setEndDate] = useState("a");

  const [selectedSearchKey, setSelectedSearchKey] = useState("void");
  const [selectedSearchWord, setSelectedSearchWord] = useState("");

  const List = useSelector((state) => state.order.reservList);
  const pv = useSelector((state) =>
    state.order.reservPv ? state.order.reservPv : { currentPage: 1 }
  );
  const totalCount = pv.totalCount;
  const config = {
    headers: {
      Authorization: localStorage.getItem("Authorization"),
    },
  };

  const [params, setParams] = useState({
    startDate: startDate,
    endDate: endDate,
    searchKey: selectedSearchKey,
    searchWord: selectedSearchWord,
  });

  const getReservList = (currentPage, params) => {
    dispatch(orderActions.getReservList(currentPage, params, config));
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
      List.forEach((el) => idArray.push(el.prodOrderNum));

      setCheckItems(idArray);
    } else {
      // 전체 선택 해제 시 checkItems 를 빈 배열로 상태 업데이트
      setCheckItems([]);
    }
  };
  /////////////////////////

  //select searchkey
  const handleChageSelectSearchkey = (e) => {
    setSelectedSearchKey(e.target.value);
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
      searchKey: selectedSearchKey,
      searchWord: selectedSearchWord,
    };
    console.log(params);

    if (params.searchKey === "ordernum") {
      if (/\D/.test(params.searchWord)) {
        alert("주문번호 검색은 숫자만 입력가능합니다.");
        return false;
      }
    }

    if (selectedSearchKey === "void" && selectedSearchWord !== "") {
      alert("검색옵션을 선택해주세요");
      return false;
    } else if (selectedSearchKey !== "void" && selectedSearchWord === "") {
      alert("검색어를 입력해주세요");
      return false;
    }

    getReservList(pv.currentPage, params);
  };

  /////////////////////////

  useEffect(() => {
    getReservList(1, params);
  }, []);

  return (
    <div>
      <div className={style.managmentCommon}>
        <div className={style.commonTop}>
          <div className={style.commonRight}>
            <p className={style.topbar}>캠핑장 예약 관리</p>
          </div>
        </div>
        <div className={style.commonUnder}>
          <div className={style.managmentContent}>
            {/* 관리자페이지갈아끼워야하는부분 시작 */}
            <div className={style.managmentContentTop}>
              <div>
                <p className={style.membetText}>
                  <img src={check} />
                  예약을 검색하세요
                </p>
              </div>
              <div className={style.membersearch}>
                <table>
                  <tr>
                    <td>예약 조회 기간</td>
                    <SearchDate setStart={setStartDate} setEnd={setEndDate} />
                  </tr>

                  <tr>
                    <td>검색어</td>
                    <td>
                      <select
                        className={style.searchCategory}
                        onChange={handleChageSelectSearchkey}
                        value={selectedSearchKey}
                      >
                        <option value='void'>선택</option>
                        <option value='campReservNum'>예약번호</option>
                        <option value='userName'>예약자명</option>
                        <option value='campName'>캠핑장</option>
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
                  예약 목록
                </p>
                <p className={style.memberSubText}>
                  선택 : {checkItems.length}개 / 검색결과 :{" "}
                  {totalCount ? totalCount : 0} 개
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
                      <th>예약번호</th>
                      <th>예약일</th>
                      <th>예약자명</th>
                      <th>연락처</th>
                      <th>캠핑장</th>
                      <th>선택객실</th>
                      <th>객실수</th>
                      <th>인원수</th>
                      <th>사용시작일</th>
                      <th>사용종료일</th>

                      <th>결제금액</th>
                      <th>결제여부</th>
                    </tr>
                  </thead>
                  <tbody>
                    {List && List.length !== 0 ? (
                      List.map((list) => {
                        return (
                          <tr key={list.prodOrderNum}>
                            <td>
                              <input
                                type='checkbox'
                                name={`select-${list.prodOrderNum}`}
                                onChange={(e) =>
                                  handleSingleCheck(
                                    e.target.checked,
                                    list.prodOrderNum
                                  )
                                }
                                // 체크된 아이템 배열에 해당 아이템이 있을 경우 선택 활성화, 아닐 시 해제
                                checked={
                                  checkItems.includes(list.prodOrderNum)
                                    ? true
                                    : false
                                }
                              />
                            </td>
                            <td>{list.campReservNum}</td>
                            <td>
                              {new Date(
                                list.campReservDate
                              ).toLocaleDateString()}
                            </td>
                            <td>
                              {list.userName ? list.userName : "탈퇴회원"}
                            </td>
                            <td>{list.userPhone ? list.userPhone : "-"}</td>
                            <td>{list.campName}</td>
                            <td>{list.campRoom}</td>
                            <td>{list.campRoomCount}</td>
                            <td>{list.campReservPerson}</td>
                            <td>
                              {new Date(
                                list.campReservStart
                              ).toLocaleDateString()}
                            </td>
                            <td>
                              {new Date(
                                list.campReservEnd
                              ).toLocaleDateString()}
                            </td>

                            <td>{list.campPayAmt}</td>
                            <td>{list.campReservCheck}</td>
                          </tr>
                        );
                      })
                    ) : (
                      <>
                        <tr>
                          <td colSpan='13'>검색결과가 없습니다.</td>
                        </tr>
                      </>
                    )}
                  </tbody>
                </table>
              </div>
              <div className='d-flex justify-content-center'>
                {totalCount && getReservList ? (
                  <>
                    <PageNavigationReserv
                      getReservList={getReservList}
                      startDate={startDate}
                      endDate={endDate}
                      searchKey={selectedSearchKey}
                      searchWord={selectedSearchWord}
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

export default OrderSiteManagement;
