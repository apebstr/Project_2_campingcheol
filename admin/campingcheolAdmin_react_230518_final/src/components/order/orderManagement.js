import { useEffect, useState } from "react";
import check from "../../image/check.png";
import list from "../../image/list.png";
import style from "../../css/orderManagement.module.css";
import DatePicker from "react-datepicker";
import PageNavigation from "./page_nav";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { orderActions } from "../../reduxs/actions/order_action";
import SearchDate from "../common/searchDatePicker";

import { useNavigate } from "react-router-dom";
import OrderDetail from "./orderDetail";

const OrderProdManagement = () => {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState("a");
  const [endDate, setEndDate] = useState("a");

  const [selectedState, setSelectedState] = useState("all");
  const [selectedSearchKey, setSelectedSearchKey] = useState("void");
  const [selectedSearchWord, setSelectedSearchWord] = useState("");

  const List = useSelector((state) => state.order.orderList);
  const pv = useSelector((state) =>
    state.order.pv ? state.order.pv : { currentPage: 1 }
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
    state: selectedState,
    searchKey: selectedSearchKey,
    searchWord: selectedSearchWord,
  });

  const getOrderList = (currentPage, params) => {
    dispatch(orderActions.getOrderList(currentPage, params, config));
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

  //주문상태 변경
  const updateOrderCheck = (e) => {
    e.preventDefault();
    console.log("click");

    checkItems.forEach((item) => {
      dispatch(
        orderActions.updateOrderCheck(item, {
          headers: { Authorization: localStorage.getItem("Authorization") },
        })
      );
    });

    window.location.replace(`/admin/orders/prod`);
  };

  /////////////////////////

  //select state
  const handleChageSelectState = (e) => {
    setSelectedState(e.target.value);
    console.log("SelectState : " + e.target.value);
  };

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
      state: selectedState,
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

    getOrderList(pv.currentPage, params);
  };

  ///////////////////////////
  //모달창
  const [modalOpen, setModalOpen] = useState(false);
  const [orderNum, setOrderNum] = useState(null);
  // console.log(modalOpen);

  //상세버튼 모달 open
  const openModalDetail = (prodOrderNum) => {
    setModalOpen(true); // 모달 창 열기
    setOrderNum(prodOrderNum);
  };

  //상세모달 close
  const closeModalDetail = (currentPage, parmas) => {
    console.log(currentPage);
    console.log(parmas);
    setOrderNum(null);
    setModalOpen(false);
    getOrderList(currentPage, parmas);
  };

  //////////////////////////
  useEffect(() => {
    getOrderList(1, params);
  }, []);

  return (
    <div>
      <div className={style.managmentCommon}>
        <div className={style.commonTop}>
          <div className={style.commonRight}>
            <p className={style.topbar}>캠핑용품 주문 관리</p>
          </div>
        </div>
        <div className={style.commonUnder}>
          <div className={style.managmentContent}>
            {/* 관리자페이지갈아끼워야하는부분 시작 */}
            <div className={style.managmentContentTop}>
              <div>
                <p className={style.membetText}>
                  <img src={check} />
                  주문을 검색하세요
                </p>
              </div>
              <div className={style.membersearch}>
                <table>
                  <tr>
                    <td>주문 조회 기간</td>
                    <SearchDate setStart={setStartDate} setEnd={setEndDate} />
                  </tr>
                  <tr>
                    <td>주문 상태</td>
                    <td colSpan='2'>
                      <select
                        className={style.memberStatus}
                        onChange={handleChageSelectState}
                        value={selectedState}
                      >
                        <option name='state' value='all'>
                          전체
                        </option>
                        <option name='state' value='new'>
                          신규주문
                        </option>
                        <option name='state' value='fin'>
                          주문확인
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
                        <option name='searchKey' value='id'>
                          아이디
                        </option>
                        <option name='searchKey' value='ordernum'>
                          주문번호
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
                  주문 목록
                </p>
                <p className={style.memberSubText}>
                  선택 : {checkItems.length}개 / 검색결과 :{" "}
                  {totalCount ? totalCount : 0} 개
                </p>
                <p className={style.controllBtn}>
                  <button
                    type='button'
                    className='btn btn-outline-primary'
                    onClick={updateOrderCheck}
                  >
                    발주 확인
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
                          checked={
                            List && checkItems.length === List.length
                              ? true
                              : false
                          }
                        />
                      </th>
                      <th>주문번호</th>
                      <th>처리상태</th>
                      <th>주문일자</th>
                      <th>주문ID</th>
                      <th>상품명</th>
                      <th>결제금액</th>
                      <th>결제방법</th>
                      <th>결제확인</th>
                      <th>상세보기</th>
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
                            <td>{list.prodOrderNum}</td>
                            <td
                              style={{
                                color:
                                  list.prodOrderCheck === "1" ? "red" : "black",
                              }}
                            >
                              {list.prodOrderCheck === "1"
                                ? "신규주문"
                                : "주문완료"}
                            </td>
                            {/* 1신규주문 2발주확인 */}
                            <td>
                              {new Date(list.orderData).toLocaleDateString()}
                            </td>
                            <td>{list.userID ? list.userID : "탈퇴회원"}</td>
                            <td>
                              {list.totalProdCount === "1"
                                ? `${
                                    list.prodTitle
                                      ? list.prodTitle.substring(0, 20)
                                      : "제목 없음"
                                  }...`
                                : `${
                                    list.prodTitle
                                      ? list.prodTitle.substring(0, 20)
                                      : "제목 없음"
                                  }...외 ${list.totalProdCount - 1}건`}
                            </td>

                            <td>
                              {parseInt(list.totalPayAmt).toLocaleString()}원
                            </td>
                            <td>{list.prodOrderMethod}</td>
                            <td>
                              {list.prodPayCheck === "1"
                                ? "결제완료"
                                : "결제실패"}
                            </td>
                            <td>
                              <button
                                onClick={() => {
                                  openModalDetail(list.prodOrderNum);
                                }}
                              >
                                상세
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <>
                        <tr>
                          <td colSpan='10'>검색결과가 없습니다.</td>
                        </tr>
                      </>
                    )}
                  </tbody>
                  {orderNum && (
                    <OrderDetail
                      open={modalOpen}
                      close={closeModalDetail}
                      header='주문 상세보기'
                      prodOrderNum={orderNum}
                      currentPage={pv.currentPage}
                      state={selectedState}
                      searchKey={selectedSearchKey}
                      searchWord={selectedSearchWord}
                    />
                  )}
                </table>
              </div>
              <div className='d-flex justify-content-center'>
                {pv && getOrderList ? (
                  <>
                    <PageNavigation
                      getOrderList={getOrderList}
                      startDate={startDate}
                      endDate={endDate}
                      state={selectedState}
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

export default OrderProdManagement;
