import { useEffect, useState } from "react";
import style from "../../css/prodpayFin.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { prodActions } from "../../reduxs/actions/prodAction";

const ProdOrderFin = ({ cartPagCal }) => {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const [insertedOrderNum, setInsertedOrderNum] = useState(null);

  const prodOrdernum = useSelector((state) => state.prod.prodOrdernum);

  const [deliveryInfo, setDeliveryInfo] = useState({
    pOrderRecAddr: "",
    pOrderRecName: "",
    prodOrderMethod: "",
    prodpayAmt: "",
    pOrderContact: "",
    dateString: "",
  });

  const deliResult = () => {
    let deliveryData = JSON.parse(localStorage.getItem("orderInfo"));

    const pOrderRecAddr = deliveryData.pOrderRecAddr;
    const pOrderRecName = deliveryData.pOrderRecName;
    const prodOrderMethod = deliveryData.prodOrderMethod;
    const prodpayAmt = Number(deliveryData.prodpayAmt).toLocaleString("kp-KR");
    const pOrderContact = deliveryData.pOrderContact;

    var today = new Date();

    var year = today.getFullYear();
    var month = ("0" + (today.getMonth() + 1)).slice(-2);
    var day = ("0" + today.getDate()).slice(-2);

    var dateString = year + "-" + month + "-" + day;

    const deliveryInfo = {
      pOrderRecAddr: pOrderRecAddr.replace(/\//g, "   "),
      pOrderRecName: pOrderRecName,
      prodpayAmt: prodpayAmt,
      prodOrderMethod: deliveryData.prodOrderMethod,
      pOrderContact: pOrderContact,
      dateString: dateString,
    };

    return deliveryInfo;
  };
  useEffect(() => {
    setDeliveryInfo(deliResult());
    let data = JSON.parse(localStorage.getItem("orderInfo"));
    const buyList = data.buyList;
    const userKeynum = data.userKeynum;

    // insert order info first
    const formData = new FormData();
    formData.append("userKeynum", data.userKeynum);
    formData.append("pOrderRecName", data.pOrderRecName);
    formData.append("pOrderRecAddr", data.pOrderRecAddr);
    formData.append("pOrderContact", data.pOrderContact);
    formData.append("pOrderMessage", data.pOrderMessage);
    formData.append("prodCount", data.prodCount);
    formData.append("prodpayAmt", data.prodpayAmt);
    formData.append("prodOrderMethod", data.prodOrderMethod);
    dispatch(
      prodActions.insertorderInfo(formData, {
        headers: {
          Authorization: localStorage.getItem("Authorization"),
        },
      })
    )
      .then((res) => {
        console.log("resdata", res);
        localStorage.removeItem("orderInfo");

        // insert order detail after order info is inserted
        const detailPromises = buyList.map((element) => {
          const buyListData = new FormData();
          buyListData.append("prodKeyNum", element.prodKeyNum);
          buyListData.append("prodOrderNum", res);
          buyListData.append("userKeynum", userKeynum);
          buyListData.append("prodCartCount", element.prodCartCount);
          buyListData.append("prodOrderMethod", data.prodOrderMethod);
          buyListData.append(
            "prodpayAmt",
            element.prodCartCount *
              parseInt(element.prodPrice.replace(/,/g, ""))
          );
          buyListData.append("prodDTO", element);
          return dispatch(
            prodActions.insertDetail(buyListData, {
              headers: {
                Authorization: localStorage.getItem("Authorization"),
              },
            })
          );
        });
        Promise.all(detailPromises).then(() => {
          cartPagCal(localStorage.getItem("userKeynum"));
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className={style.prodpayFin}>
      <p className={style.prodpayFinText}> 결제 완료 </p>

      <div className={style.payFinInfo}>
        <p className={style.payFinInfoText}>결제 정보</p>
        <hr />

        <table className={style.payFinInfoTable}>
          <tr>
            <th>수령인</th>
            <td>{deliveryInfo.pOrderRecName}</td>
            <th>연락처</th>
            <td>{deliveryInfo.pOrderContact}</td>
          </tr>
          <tr>
            <th>배송지</th>
            <td colspan='3'>{deliveryInfo.pOrderRecAddr}</td>
          </tr>
          <tr>
            <th>결제수단</th>
            <td>{deliveryInfo.prodOrderMethod}</td>
            <th>결제금액</th>
            <td>{deliveryInfo.prodpayAmt}</td>
          </tr>
          <tr>
            <th>결제여부</th>
            <td>완료</td>
            <th>결제일</th>
            <td>{deliveryInfo.dateString}</td>
          </tr>
        </table>
      </div>
      <div className={style.payfinBtn}>
        <button
          type='button'
          class='btn btn-primary'
          onClick={() => {
            navigator("/prod/list/1");
          }}
        >
          쇼핑 더하기
        </button>
        <button
          type='button'
          class='btn btn-primary'
          onClick={() => {
            navigator("/");
          }}
        >
          홈으로
        </button>
      </div>
    </div>
  );
};

export default ProdOrderFin;
