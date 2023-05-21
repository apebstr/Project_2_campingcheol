import style from "../../css/prodpay.module.css";

import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { prodActions } from "../../reduxs/actions/prodAction";
import Iamport from "react-iamport";
import { loadTossPayments } from "@tosspayments/payment-sdk";

import kakaoImg from "../../image/kakaoImg.png";
import TossImg from "../../image/tossimg.png";

import DaumPostcode from "react-daum-postcode";
import Modal from "./modal";

// 오더 시작
const ProdOrder = () => {
  const [addrDetail, setAddrDetail] = useState({
    zipAddr: "",
    addr: "",
    addDet: "",
  });

  //모달
  const [modalOpen, setModalOpen] = useState(false);

  const handleValueChangeAddr = (e) => {
    setAddrDetail({
      ...addrDetail,
      addDet: e.target.value,
    });
  };

  //추가버튼 모달 open
  const openModal = () => {
    setModalOpen(true); // 모달 창 열기
  };

  //추가모달 close
  const closeModal = () => {
    setModalOpen(false);
  };

  //주소
  const handleComplete = (data) => {
    let zonecode = data.zonecode; //우편번호
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    setAddrDetail({
      ...addrDetail,
      addr: fullAddress,
      zipAddr: zonecode,
      addDet: "",
    });
    setInputs({
      ...inputs,
      deliveryAddr:
        addrDetail.zipAddr + "/" + addrDetail.addr + "/" + addrDetail.addDet,
    });
    setModalOpen(false);
  };

  ///////////////////배송지 관련 끝

  // navigatior에서 넘긴 값 받아오기 (prodDatail)
  const location = useLocation();
  const navigator = useNavigate();

  const productCount = location.state.productCount;
  let prodDetail = location.state.prodDetail;
  prodDetail.prodCartCount = productCount;
  const price = parseInt(prodDetail.prodPrice.replace(/,/g, "")) * productCount; //  숫자 가격(곱셈을 위함)
  const totalPrice = price.toLocaleString("kp-KR");
  // 쉼표를 포함한 문자열 가격

  //  유저 정보에 따른 배송정보를 가져오기 위해
  const dispatch = useDispatch();
  const memberDatil = useSelector((state) => state.prod.memberDatil);

  //배송정보 수정
  const [inputs, setInputs] = useState({
    reciever: memberDatil.userName,
    phoneNumber: memberDatil.userPhone,
    deliveryAddr: memberDatil.userAddr,
    deliveryMemo: "",
  });

  const InfoChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  useEffect(() => {
    dispatch(
      prodActions.getUserInfo(localStorage.getItem("userKeynum"), {
        headers: {
          Authorization: localStorage.getItem("Authorization"),
        },
      })
    );
  }, []);

  // // 테이블에 저장하기
  // useEffect(() => {
  //   dispatch(prodActions.getUserInfo(localStorage.getItem("userKeynum")));
  //   console.log(prodDetail);

  //   setInputs({
  //     reciever: memberDatil.userName,
  //     phoneNumber: memberDatil.userPhone,
  //     deliveryAddr: memberDatil.userAddr,
  //   });
  // }, [setInputs]);
  useEffect(() => {
    console.log("확인", memberDatil);
    if (memberDatil !== null) {
      setInputs({
        reciever: memberDatil.userName,
        phoneNumber: memberDatil.userPhone,
        deliveryAddr: memberDatil.userAddr,
        deliveryMemo: "",
      });
    }
  }, [memberDatil]);

  useEffect(() => {
    if (inputs.deliveryAddr) {
      const addrArr = inputs.deliveryAddr.split("/");
      setAddrDetail({
        zipAddr: addrArr[0],
        addr: addrArr[1],
        addDet: addrArr[2],
      });
    }
  }, [inputs.deliveryAddr]);
  // useEffect(() => {
  //   if (memberDatil !== null) {
  //     setInputs({
  //       reciever: memberDatil.userName,
  //       phoneNumber: memberDatil.userPhone,
  //       deliveryAddr: memberDatil.userAddr,
  //       deliveryMemo: "",
  //     });
  //   }
  // }, [memberDatil]);

  const [method, setMethod] = useState();
  const storemethod = (e) => {
    setMethod(e.target.value);
  };

  useEffect(
    (e) => {
      localStorage.removeItem("orderInfo");
      // 토스 관련

      const data = {
        userKeynum: localStorage.getItem("userKeynum"),
        pOrderRecName: inputs.reciever,
        pOrderRecAddr:
          addrDetail.zipAddr + "/" + addrDetail.addr + "/" + addrDetail.addDet,
        pOrderContact: inputs.phoneNumber,
        pOrderMessage: inputs.deliveryMemo,
        // prodCount: productCount,
        prodpayAmt: price,
        prodOrderMethod: method,
        buyList: [prodDetail],
      };

      // const addrArr = memberDatil.userAddr.split("/");
      // setAddrDetail({
      //   zipAddr: addrArr[0],
      //   addr: addrArr[1],
      //   addDet: addrArr[2],
      // });
      localStorage.setItem("orderInfo", JSON.stringify(data));
    },
    // []
    [setInputs, storemethod, memberDatil]
  );

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
      successUrl: "http://localhost:3000/prod/orderfin",
      failUrl: "http://localhost:3000/prod/list/1",
      onCancelUrl: "http://localhost:3000/prod/list/1",
    });
  };

  return (
    <form>
      <div className={style.prodPay}>
        <p>주문서 작성</p>
        <div className={style.payList}>
          <p className={style.middelText}>주문목록</p>
          <hr />

          <table className={style.payListTable}>
            <thead>
              <tr>
                <th>상품명</th>
                <th>수량</th>
                <th>총 가격</th>
              </tr>
            </thead>
            <tbody>
              {prodDetail ? (
                <tr>
                  <td>{prodDetail.prodTitle}</td>
                  <td>{productCount}</td>
                  <td>{totalPrice}</td>
                </tr>
              ) : (
                ""
              )}
            </tbody>
            <tfoot className={style.prodPayTotal}>
              <tr>
                <td>배송비 0원</td>
                <td colspan='2'>총 결제금액 {totalPrice}원</td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div className={style.deliveryInfo}>
          <p className={style.middelText}>배송 정보</p>
          <hr />
          <table className={style.deliveryInfoTable}>
            <tr>
              <th>수령인</th>
              <td>
                <input
                  name='reciever'
                  className={style.short_deliveryInput}
                  type='text'
                  value={inputs.reciever}
                  onChange={InfoChange}
                />
              </td>
              <th>연락처</th>
              <td>
                <input
                  name='phoneNumber'
                  className={style.short_deliveryInput}
                  type='text'
                  value={inputs.phoneNumber}
                  onChange={InfoChange}
                />
              </td>
            </tr>
            <tr>
              <th style={{ border: "none" }}>배송지</th>
              {/* <td>우편번호</td> */}
              <td colSpan='2' style={{ border: "none" }}>
                <input
                  id='member_post'
                  className='input'
                  type='text'
                  name='userAddr1'
                  // placeholder="우편번호"
                  value={addrDetail.zipAddr}
                  onChange={handleValueChangeAddr}
                  readOnly
                />
              </td>
              <td style={{ border: "none" }}>
                <button
                  className='btn btn-primary'
                  type='button'
                  onClick={openModal}
                >
                  주소찾기
                </button>
                <Modal open={modalOpen} close={closeModal} header='주소검색'>
                  <DaumPostcode onComplete={handleComplete} />
                </Modal>
              </td>
            </tr>
            <tr>
              <th style={{ border: "none" }}></th>
              {/* <td>주소</td> */}
              <td colSpan='3' style={{ border: "none", padding: "0px 20px" }}>
                <input
                  id='member_addr'
                  className='input'
                  type='text'
                  name='userAddr2'
                  placeholder='주소'
                  value={addrDetail.addr}
                  onChange={handleValueChangeAddr}
                  readOnly
                />
              </td>
            </tr>
            <tr>
              <th></th>
              {/* <td>상세주소</td> */}
              <td colSpan='3'>
                <input
                  type='text'
                  className={style.addDetailinput}
                  style={{ width: "335px" }}
                  id='extra'
                  name='userAddr3'
                  placeholder='상세 주소를 입력하세요.'
                  value={addrDetail.addDet}
                  onChange={handleValueChangeAddr}
                />
              </td>
            </tr>
            <tr>
              <th>배송메세지</th>
              <td colspan='3'>
                <input
                  name='deliveryMemo'
                  className={style.long_deliveryInput}
                  type='text'
                  placeholder='배송메세지'
                  value={inputs.deliveryMemo}
                  onChange={InfoChange}
                />
              </td>
            </tr>
          </table>
        </div>
        <div className={style.payInfo}>
          <p className={style.middelText}>결제정보</p>
          <hr />
        </div>
        <Iamport
          identificationCode='imp25662257'
          params={{
            pg: "kakaopay",
            pay_method: "card",
            merchant_uid: "merchant_" + new Date().getTime(),
            name: "주문명:결제테스트",
            amount: 100,
            buyer_email: "buyer@email.com",
            buyer_name: "누굴까요",
            buyer_tel: "010-1234-5678",
            buyer_addr: "서울특별시 강남구 삼성동",
            buyer_postcode: "123-456",
            m_redirect_url: "/prod/orderfin", // 변경된 부분
          }}
          onFailed={(err) => {
            console.log(err);
            // navigator("/prod/orderfin");
          }}
          onSuccess={(res) => {
            // 콜백함수
            navigator("/prod/orderfin");
          }}
          render={(renderProps) => (
            <>
              <div className={style.payMethod}>
                <img src={kakaoImg} />
                <button
                  id={style.prodPayBtn}
                  type='button'
                  className='btn btn-primary'
                  // onClick={(() => renderProps.onClick, storemethod)}
                  onClick={(e) => {
                    storemethod(e);
                    renderProps.onClick();
                  }}
                  value='kakao'
                >
                  카카오페이 결제하기
                </button>
              </div>
              <div className={style.payMethod}>
                <img src={TossImg} />
                <button
                  id={style.prodPayBtn}
                  type='button'
                  className='btn btn-primary'
                  onClick={(e) => {
                    storemethod(e);
                    tossPay(e);
                  }}
                  value='toss'
                >
                  토스페이먼츠 결제하기
                </button>
              </div>
            </>
          )}
        />
      </div>
    </form>
  );
};

export default ProdOrder;
