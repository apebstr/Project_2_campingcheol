import { useSelector } from "react-redux";
import "../../css/camp_view_order.css";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Iamport from "react-iamport";
import { useNavigate } from "react-router-dom";
import { loadTossPayments } from "@tosspayments/payment-sdk";

const CampViewOrder = () => {
  const { state } = useLocation();
  const campSiteDetail = useSelector((state) => state.campSite.campSiteDetail);
  const navigator = useNavigate();
 const [dateCout, setDateCount] = useState();

  //총 결제가격
  const [totalPrice, setTotalPrice] = useState(state.campPrice);

  const [campPay, setcampPay] = useState({
    campPayment: "",
    campPayCheck: "",
    campPayAmt: totalPrice,
  });

  //인원 선택
  const [numOfPeople, setNumOfPeople] = useState("인원을 선택하세요");

  const handlePeople = (num) => {
    setNumOfPeople(num);
  };

  //객실수량 선택
  const [numOfRoom, setNumOfRoom] = useState(1);

  const handleRoom = (room) => {
    setNumOfRoom(room);
  };

  //숫자에 콤마가 있으면 곱하지를 못함
  //parseInt(state.campPrice.replace(/,/g, '')) * numOfRoom 으로 콤마 빼주고
  //.toLocaleString('kp-KR')로 다시 콤마 넣어주기
  //예약화면에서 계산된 총 금액을 업데이트(선택한 날짜에 따라 달라짐)
  useEffect(() => {
    if (state.campPrice && state.startDate && state.endDate) {
      // 컴포넌트가 처음 렌더링될 때 실행됨
      const startDateObj = new Date(state.startDate); // state.startDate 값을 Date 객체로 변환(현재 날짜와 시간객체)
      const endDateObj = new Date(state.endDate); // state.endDate 값을 Date 객체로 변환(현재 날짜와 시간객체)
      const days = Math.ceil(
        (endDateObj - startDateObj) / (1000 * 60 * 60 * 24)
      ); // endDateObj 와 startDateObj의 차이를 계산해서 일(day) 단위로 반환
      //Math.ceil 함수 => 소수점 이하의 값을 올림해서 최소한의 기간을 계산
      setDateCount(days);



      //총 가격 계산
      const totalPrice = (
        parseInt(state.campPrice.replace(/,/g, "")) * //parseInt를 사용해서 숫자로 변환
        days *
        numOfRoom
      ).toLocaleString("kp-KR"); //앞의 모든 값들을 toLocaleString() 함수 사용하여 한국통화 단위에 맞게 변환
      setTotalPrice(totalPrice); //최종적으로 변환된 값을 setTotalPrice() 함수를 사용해 totalPrice 상태값에 저장
    } else {
      setTotalPrice(0); //만약 state.campPrice나 , 날짜가 존재하지 않는다면 가격을 0으로 보여주기
    }
  }, [numOfRoom, state.campPrice, state.startDate, state.endDate]);
  //이 배열내의 값이 변경될 때마다 useEffect 훅이 실행되게 함

  var today = new Date();

  var year = today.getFullYear();
  var month = ("0" + (today.getMonth() + 1)).slice(-2);
  var day = ("0" + today.getDate()).slice(-2);

  var dateString = year + "/" + month + "/" + day;

  const finalData = {
    campingImg: campSiteDetail.campImg,
    campingNum: campSiteDetail.campKeyNum,
    campingName: state.campName,
    regDate: dateString,
    checkIn: state.startDate,
    checkOut: state.endDate,
    campingInfo: state.campOption,
    campingRoomNum: numOfRoom,
    campingPeople: numOfPeople,
    campingAddr: campSiteDetail.campAddr,
    campingPhone: campSiteDetail.campTel,
    campingFcity: campSiteDetail.campFcity,
    campingAvailable: campSiteDetail.campAvailable,
    campPayment: campPay.campPayment,
    campPayAmt: totalPrice,
  };

  localStorage.setItem("finalInfo", JSON.stringify(finalData));

  //토스관련

  const clientKey = "test_ck_ODnyRpQWGrNLq2BnljL3Kwv1M9EN";
  const tossPay = async (e) => {
    e.preventDefault();

    const tossPayments = await loadTossPayments(clientKey);

    await tossPayments.requestPayment("카드", {
      amount: 10,
      orderId: "N1H0TmJOl7qT3Z-UPVSOz",
      orderName: "토스 티셔츠 외 2건",
      customerName: "박토스",
      successUrl: "http://localhost:3000/camp/view/orderfin",
      failUrl: "http://localhost:3000/camp/list/1",
      onCancelUrl: "http://localhost:3000/camp/list/1",
    });
  };

  const checkPay = (e, value) => {
    e.preventDefault();

    setcampPay({
      campPayment: value,
      campPayAmt: totalPrice,
    });
  };

  useEffect(() => {
    console.log(campPay);
  }, [campPay]);

  return (
    <>
      <div className='view_order_container'>
        <h2 className='view_order_top'>예약 정보</h2>
        <div style={{ borderBottom: "1px solid black" }}></div>

        <div className='view_order_box'>
          <div className='view_img'>
            <img src={state.campImg} />
		</div>


            <div className="view_order_libox">
            <p className="campRervDate">
              {state.startDate}&nbsp;&nbsp;-&nbsp;&nbsp;{state.endDate}
            </p>
            <span>
              {dateCout}박 {dateCout + 1}일
            </span>
              <p>{state.campName}</p>

 		<div className="view_order_drop">
              <p>선택 옵션 : {state.campOption}</p>
            
                 <table>
                <tr>
                  <th>
                    <p>객실 수량</p>
                  </th>
                  <td>
                    <Dropdown>
                      <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {numOfRoom}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => handleRoom(1)}>
                          1
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleRoom(2)}>
                          2
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleRoom(3)}>
                          3
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
                <tr>
                  <th>
                    {" "}
                    <p>인원 수 </p>
                  </th>
                  <td>
                    {" "}
                    <Dropdown>
                      <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {numOfPeople}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        {state.campOption === "2인용 텐트" ? (
                          <>
                            <Dropdown.Item onClick={() => handlePeople(1)}>
                              1
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => handlePeople(2)}>
                              2
                            </Dropdown.Item>
                          </>
                        ) : state.campOption === "3인용 텐트" ? (
                          <>
                            <Dropdown.Item onClick={() => handlePeople(1)}>
                              1
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => handlePeople(2)}>
                              2
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => handlePeople(3)}>
                              3
                            </Dropdown.Item>
                          </>
                        ) : state.campOption === "4인용 텐트" ? (
                          <>
                            <Dropdown.Item onClick={() => handlePeople(1)}>
                              1
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => handlePeople(2)}>
                              2
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => handlePeople(3)}>
                              3
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => handlePeople(4)}>
                              4
                            </Dropdown.Item>
                          </>
                        ) : null}
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              </table>
            </div>
          </div>


         <div className="campReservInfo">
            <div className="res_price_con">
              <h4>예약자 정보</h4>
              <hr />
              <div className="res_detail">
                <table className="reservInfo">
                  <tr>
                    <th>예약자 이름</th>
                    <td>{localStorage.getItem("userName")}</td>
                  </tr>
                  <tr>
                    <th>예약자 연락처</th>
                    <td>{localStorage.getItem("userPhone")}</td>
                  </tr>
                </table>
                {/* <div className="info_1">
                  <p style={{ marginLeft: "100px" }}>예약자 이름</p>
                  <p style={{ marginLeft: "100px" }}>예약자 연락처</p>
                </div>
                <div className="info_2">
                  <p>{localStorage.getItem("userName")}</p>
                  <p>{localStorage.getItem("userPhone")}</p>
                </div> */}
              </div>
            </div>



             <div className="res_price_con">
              <h4>지불 금액</h4>
              <hr />
              <div className="res_price">
                <table>
                  <tr>
                    <td></td>
                    <td className="priceCal">
                      {state.campOption} x 객실 {numOfRoom} 개 x {dateCout} 박
                    </td>
                  </tr>
                  <tr>
                    <td className="totalText">총 결제 금액</td>
                    <td
                      className="priceCal"
                      style={{ fontSize: "30px", fontWeight: "600" }}
                    >
                      {totalPrice} 원
                    </td>
                  </tr>
                </table>
              </div>
            </div>


           <div className="res_tool_con">
              <h4>결제 수단</h4>
              <hr />
              <div className="res_tool">
                <div className="form-check">
                  <ul className="res_tool-list">
                    {/* 카카오페이 */}
                    <li className="res_tool_li">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault1"
                      />

                      <Iamport
                        identificationCode="imp25662257"
                        params={{
                          pg: "kakaopay",
                          pay_method: "card",
                          merchant_uid: "merchant_" + new Date().getTime(),
                          name: "주문명:결제테스트",
                          amount: totalPrice,
                          buyer_email: "buyer@email.com",
                          buyer_name: "누굴까요",
                          buyer_tel: "010-1234-5678",
                          buyer_addr: "서울특별시 강남구 삼성동",
                          buyer_postcode: "123-456",
                          m_redirect_url: "/camp/view/orderfin", // 변경된 부분
                        }}
                        onFailed={(err) => console.log(err)}
                        onSuccess={() => {
                          // 콜백함수
                          navigator("/camp/view/orderfin");
                        }}
                        render={(renderProps) => {
                          return (
                            <>
                              <div>
                                <img
                                  className="payment-ci css-d2p1rj e157o9se6"
                                  src="https://image6.yanolja.com/payment/d2SEGQmSDLJNXBwA"
                                  alt="카카오페이 아이콘"
                                  style={{ width: "80px", height: "60px" }}
                                ></img>
                                <label
                                  className="form-check-label"
                                  for="flexRadioDefault1"
                                ></label>
                                <button
                                  type="button"
                                  className="btn btn-primary"
                                  onClick={(e) => {
                                    renderProps.onClick();
                                    checkPay(e, "카카오");
                                  }}
                                  value="카카오"
                                >
                                  카카오페이 결제하기
                                </button>
                              </div>
                            </>
                          );
                        }}
                      />
                    </li>
                    <li className="res_tool_li">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault1"
                      />

                      <img
                        className="payment-ci css-d2p1rj e157o9se6"
                        src="https://image6.yanolja.com/payment/ypiMEBqUbbiHA3xz"
                        alt="토스페이 아이콘"
                        style={{ width: "80px", height: "60px" }}
                      ></img>

                      <label
                        className="form-check-label"
                        for="flexRadioDefault1"
                      >
                        {/* 토스페이 / 카드 */}
                      </label>

                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={(e) => {
                          tossPay(e);
                          checkPay(e, "토스");
                        }}
                        value="토스"
                      >
                        토스페이먼츠 결제하기
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CampViewOrder;
