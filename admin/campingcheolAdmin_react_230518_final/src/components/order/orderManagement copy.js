import { useEffect, useState } from "react";
import check from "../../image/check.png";
import list from "../../image/list.png";
import style from "../../css/orderManagement.module.css";
import DatePicker from "react-datepicker";
import PageNavigation from "./page_nav";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { orderActions } from "../../reduxs/actions/order_action";

import { useNavigate } from "react-router-dom";

const OrderProdManagement = () => {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(new Date());

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

  const getOrderList = (currentPage) => {
    dispatch(orderActions.getOrderList(currentPage, config));
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

  useEffect(() => {
    getOrderList(1);
  }, []);

  return (
    <div>
      <div className={style.managmentCommon}>
        <div className={style.commonTop}>
          <div className={style.commonRight}>
            <p className={style.topbar}>주문 관리</p>
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
                    <td>
                      <DatePicker
                        className={style.calendar}
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                      />
                    </td>
                    <td>
                      <DatePicker
                        className={style.calendar}
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>주문 상태</td>
                    <td colSpan='2'>
                      <select className={style.memberStatus}>
                        <option name='orderStatus'>전체</option>
                        <option name='orderStatus'>신규주문</option>
                        <option name='orderStatus'>주문확인</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>주문 종류</td>
                    <td colSpan='2'>
                      <select className={style.memberStatus}>
                        <option name='prodCategory'>전체</option>
                        <option name='prodCategory'>텐트</option>
                        <option name='prodCategory'>캠핑가구</option>
                        <option name='prodCategory'>랜턴</option>
                        <option name='prodCategory'>취사용품</option>
                        <option name='prodCategory'>캠핑매트</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>검색어</td>
                    <td>
                      <select className={style.searchCategory}>
                        <option name='searchCategory'>전체</option>
                        <option name='searchCategory'>아이디</option>
                        <option name='searchCategory'>수취인 주소</option>
                        <option name='searchCategory'>상품번호</option>
                        <option name='searchCategory'>주문번호</option>
                      </select>
                    </td>
                    <td>
                      <input
                        type='text'
                        className={style.searchWord}
                        placeholder='검색어를 입력하세요'
                      />
                      <button type='button' className='btn btn-primary'>
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
                  <button type='button' className='btn btn-outline-primary'>
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
                            checkItems.length === List.length ? true : false
                          }
                        />
                      </th>
                      <th>주문번호</th>
                      <th>처리상태</th>
                      <th>주문일자</th>
                      <th>주문상세번호</th>
                      <th>상품이미지</th>
                      <th>상품명</th>
                      <th>결제금액</th>
                      <th>결제방법</th>
                      <th>결제확인</th>
                      <th>주문자</th>
                      <th>수취인</th>
                    </tr>
                  </thead>
                  <tbody>
                    {List &&
                      List.length !== 0 &&
                      List.map((list) => {
                        return (
                          <tr>
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
                            <td>{list.prodOrderCheck}</td>
                            <td>{list.prodDate}</td>
                            <td>{list.prodDetailNum}</td>
                            <td>
                              <img
                                src={list.prodImage}
                                width='100'
                                height='100'
                              />
                            </td>
                            <td>{list.prodTitle}</td>
                            <td>{list.prodpayAmt}</td>
                            <td>{list.prodOrderMethod}</td>
                            <td>
                              {list.prodPayCheck === "0"
                                ? "결제완료"
                                : "결제실패"}
                            </td>
                            <td>{list.userName}</td>
                            <td>{list.porderRecName}</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
              <div className='d-flex justify-content-center'>
                {totalCount && getOrderList ? (
                  <>
                    <PageNavigation getList={getOrderList} />
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
