import { useEffect, useState } from "react";
import "../../css/camp_view_orderfin.css";
import CampMapList from "./camp_maplist.js";
import { campActions } from "../../reduxs/actions/camp_action";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const CampViewOrderFin = () => {
  const dispatch = useDispatch();
  const finalData = JSON.parse(localStorage.getItem("finalInfo"));

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("finalInfo"));

    const formData = new FormData();
    formData.append("campKeyNum", data.campingNum);
    formData.append("userKeyNum", localStorage.getItem("userKeynum"));
    formData.append("campRoom", data.campingInfo);
    formData.append("campRoomCount", data.campingRoomNum);
    formData.append("campReservStart", data.checkIn);
    formData.append("campReservEnd", data.checkOut);
    formData.append("campReservPerson", data.campingPeople);
    formData.append("campReservDate", data.regDate);
    formData.append("campReservCheck", "결제완료");
    dispatch(campActions.postCampreserv(formData)).then((res) => {
      console.log("susususu : ", res);
      localStorage.removeItem("finalInfo");

      const payData = new FormData();
      payData.append("campKeyNum", data.campingNum);
      payData.append("userKeyNum", localStorage.getItem("userKeynum"));
      payData.append("campPayment", data.campPayment);
      payData.append("campPayCheck", "결제완료");
      payData.append("campPayAmt", data.campPayAmt);
      payData.append("campReservNum", res);
      console.log("campReservNum:", res);

      dispatch(campActions.postCampPay(payData, res));
    });
  }, []);

  return (
    <>
      <div className='view_fin_container'>
        <div className='view_fin_container2'>
          <div className='view_fin_top'>예약 완료</div>
          <div style={{ borderBottom: "1px solid black" }}></div>

          <div className='view_fin_box'>
            <div className='view_fin_img'>
              <img src={finalData.campingImg}></img>
            </div>

            <div className='view_fin_de_top'>
              <p className='view_fin_1'>
                <span style={{ fontSize: "larger" }}>
                  {localStorage.userName}
                </span>{" "}
                님 예약완료!
              </p>
              <p className='view_fin_2'>{finalData.campingName}</p>
              <p className='view_fin_3'>예약일자 : {finalData.regDate}</p>
            </div>

            <div className='reservBtn'>
              <Link to='/my/camp/payment'>
                <button className='btn btn-success'> 내 이용내역 보기 </button>
              </Link>
              <Link to='/'>
                <button className='btn btn-success'>홈으로</button>
              </Link>
            </div>
            <div className='view_fin_table_con'>
              <p className='reservFinText'>예약정보</p>
              <hr />
              <table className='view_fin_table'>
                <tbody>
                  <tr>
                    <td>체크인 날짜</td>
                    <td>{finalData.checkIn}</td>
                  </tr>
                  <tr>
                    <td>체크아웃 날짜</td>
                    <td>{finalData.checkOut}</td>
                  </tr>
                  <tr>
                    <td>객실정보</td>
                    <td>{finalData.campingInfo}</td>
                  </tr>
                  <tr>
                    <td>객실 수 </td>
                    <td>{finalData.campingRoomNum} 개</td>
                  </tr>
                  <tr>
                    <td>인원 </td>
                    <td>{finalData.campingPeople} 명</td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* <div style={{ padding: "50px" }}></div> */}
            <div className='view_fin_info'>
              <div className='fin_info'>
                <p className='reservFinText'>숙소 정보</p>
                <hr />
                {/* <div
                  style={{
                    borderBottom: "1px solid black",
                    width: "40%",
                    display: "inline-block",
                  }}
                /> */}
                <div className='fin_info_tail'>
                  <table>
                    <tr>
                      <td>숙소명</td>
                      <td>{finalData.campingName}</td>
                    </tr>
                    <tr>
                      <td>주소</td>
                      <td>{finalData.campingAddr}</td>
                    </tr>
                    <tr>
                      <td>연락처</td>
                      <td>{finalData.campingPhone}</td>
                    </tr>
                    {finalData.campingFcity ? (
                      <tr>
                        <td>부대시설</td>
                        <td>{finalData.campingFcity}</td>
                      </tr>
                    ) : (
                      ""
                    )}

                    {finalData.campingAvailable ? (
                      <tr>
                        <td>주변 이용가능 시설</td>
                        <td>{finalData.campingAvailable}</td>
                      </tr>
                    ) : (
                      ""
                    )}
                  </table>
                </div>
              </div>
            </div>
            <div style={{ padding: "50px" }}></div>
            <p
              style={{
                margin: "auto",
                textAlign: "center",
                padding: "20px",
                fontWeight: "bold",
              }}
            ></p>
            <div>
              <CampMapList />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CampViewOrderFin;
