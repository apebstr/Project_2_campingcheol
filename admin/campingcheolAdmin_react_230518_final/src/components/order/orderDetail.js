import React, { useEffect } from "react";
import style from "../../css/orderDetail.module.css";
import { useDispatch, useSelector } from "react-redux";
import { orderActions } from "../../reduxs/actions/order_action";
import axios from "axios";
import { baseUrl } from "../../apiurl";

const OrderDetail = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const {
    open,
    close,
    header,
    prodOrderNum,
    currentPage,
    state,
    searchKey,
    searchWord,
  } = props;

  const params = {
    state: state,
    searchKey: searchKey,
    searchWord: searchWord,
  };
  console.log(prodOrderNum);
  console.log(params);

  const dispatch = useDispatch();

  const orderDetail = useSelector((state) => state.order.orderDetail);
  const orderProdDetail = useSelector((state) => state.order.orderProdDetail);

  const config = {
    headers: {
      Authorization: localStorage.getItem("Authorization"),
    },
  };

  const getOrderDetail = (prodOrderNum) => {
    dispatch(orderActions.getOrderDetail(prodOrderNum, config));
  };

  //주문상태 변경
  const updateOrderCheck = async (e) => {
    e.preventDefault();
    console.log("click");

    await axios
      .put(`${baseUrl}/admin/orders/updateordercheck/${prodOrderNum}`, config)
      .then((response) => {
        getOrderDetail(prodOrderNum);
        alert("발주확인 완료");
      })
      .catch((err) => {
        console.error(err.message);
      });

    // dispatch(
    //   orderActions.updateOrderCheck(prodOrderNum, {
    //     headers: { Authorization: localStorage.getItem("Authorization") },
    //   })
    // );
    // getOrderDetail(prodOrderNum);
    // alert("발주확인 완료");
  };

  useEffect(() => {
    if (open) {
      getOrderDetail(prodOrderNum);
    }
  }, [open]);

  useEffect(() => {
    document.body.style = `overflow: hidden`;
    return () => (document.body.style = `overflow: auto`);
  }, []);

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.

    //className={style.prodRight}>
    <div className={open ? `${style.openModal} ${style.modal}` : style.modal}>
      {open ? (
        <section>
          <header>
            {header}
            <button className={style.close} onClick={close}>
              &times;
            </button>
          </header>

          <main>
            <table className='style.insert_table' id='style.insert_table'>
              <tr>
                <th>주문번호</th>
                <td>{orderDetail.prodOrderNum}</td>
                <th>처리상태</th>
                <td
                  style={{
                    color: orderDetail.prodOrderCheck === "1" ? "red" : "black",
                  }}
                >
                  {orderDetail.prodOrderCheck === "1" ? "신규주문" : "주문완료"}
                </td>
                <th>주문일자</th>
                <td>{orderDetail.orderData}</td>
              </tr>
            </table>
            <h4>주문자 정보</h4>
            <table>
              <tr>
                <th>주문ID</th>
                <td>{orderDetail.userID ? orderDetail.userID : "탈퇴회원"}</td>
                <th>주문자명</th>
                <td>
                  {orderDetail.userName ? orderDetail.userName : "탈퇴회원"}
                </td>
              </tr>

              <tr>
                <th>수취인</th>
                <td>{orderDetail.porderRecName}</td>
                <th>배송연락처</th>
                <td>{orderDetail.porderContact}</td>
              </tr>

              <tr>
                <th>배송주소</th>
                <td colSpan='3'>
                  {orderDetail.porderRecAddr
                    ? orderDetail.porderRecAddr.replace(/\//g, " ")
                    : ""}
                </td>
              </tr>
              <tr>
                <th>배송메시지</th>
                <td colSpan='3'>{orderDetail.porderMessage}</td>
              </tr>
            </table>
            <h4>상품정보</h4>
            <table>
              <tr>
                <th>번호</th>
                <th>상품사진</th>
                <th>상품명</th>
                <th>상품금액</th>
                <th>주문갯수</th>
                <th>총금액</th>
              </tr>
              {orderProdDetail &&
                orderProdDetail.map((prod) => {
                  return (
                    <tr key={prod.prodDetailNum}>
                      <td>{prod.prodrm}</td>
                      <td>
                        <img
                          src={
                            prod.prodImage &&
                            prod.prodImage.startsWith("https://")
                              ? prod.prodImage
                              : "/images/" + prod.prodImage
                          }
                          width='200'
                          height='200'
                        />
                      </td>
                      <td>{prod.prodTitle}</td>
                      <td>{parseInt(prod.prodPrice).toLocaleString()}원</td>
                      <td>{prod.prodCartCount}개</td>
                      <td>{parseInt(prod.prodpayAmt).toLocaleString()}원</td>
                    </tr>
                  );
                })}
            </table>
            <h4>결제정보</h4>
            <table>
              <tr>
                <th>총갯수</th>
                <td>{orderDetail.totalProdCount}개</td>
                <th>총금액</th>

                <td>{parseInt(orderDetail.totalPayAmt).toLocaleString()}원</td>
              </tr>
              <tr>
                <th>결제방법</th>
                <td>{orderDetail.prodOrderMethod}</td>
                <th>결제확인</th>
                <td>
                  {orderDetail.prodPayCheck === "1" ? "결제완료" : "결제실패"}
                </td>
              </tr>
            </table>
          </main>
          <footer>
            {orderDetail.prodOrderCheck === "1" ? (
              <>
                <input
                  type='button'
                  id='update'
                  value='발주 확인'
                  onClick={updateOrderCheck}
                />
              </>
            ) : (
              ""
            )}

            <input
              type='button'
              value='닫기'
              onClick={() => {
                close(currentPage, params);
              }}
            />
          </footer>
        </section>
      ) : null}
    </div>
  );
};

export default OrderDetail;
