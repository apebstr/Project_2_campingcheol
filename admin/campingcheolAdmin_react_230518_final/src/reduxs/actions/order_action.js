import axios from "axios";
import { orderReducers } from "../reducers/order_reducer";
import { baseUrl } from "../../apiurl";
import qs from "qs";

function getOrderList(currentPage, params, config) {
  console.log(params);
  const queryParams = qs.stringify(params, { arrayFormat: "brackets" });

  return async (dispatch) => {
    // axios.get()으로 서버에서 데이터를 받으면 data라는 변수에 넣기
    const data = await axios
      .get(
        `${baseUrl}/admin/orders/orderlist/${currentPage}?${queryParams}`,
        params,
        config
      )
      .then((response) => response.data);
    console.log(data);
    dispatch(orderReducers.getOrderList({ data }));
  };
}

function getOrderDetail(prodOrderNum, config) {
  return async (dispatch) => {
    // axios.get()으로 서버에서 데이터를 받으면 data라는 변수에 넣기
    const data = await axios
      .get(`${baseUrl}/admin/orders/detail/${prodOrderNum}`, config)
      .then((response) => response.data);
    console.log(data);
    dispatch(orderReducers.getOrderDetail({ data }));
  };
}

function getReservList(currentPage, params, config) {
  console.log(params);
  const queryParams = qs.stringify(params, { arrayFormat: "brackets" });

  return async (dispatch) => {
    // axios.get()으로 서버에서 데이터를 받으면 data라는 변수에 넣기
    const data = await axios
      .get(
        `${baseUrl}/admin/orders/reservlist/${currentPage}?${queryParams}`,
        params,
        config
      )
      .then((response) => response.data);
    console.log(data);
    dispatch(orderReducers.getReservList({ data }));
  };
}

function updateOrderCheck(prodOrderNum, config) {
  return async () => {
    await axios
      .put(`${baseUrl}/admin/orders/updateordercheck/${prodOrderNum}`, config)
      .then((response) => response.data);
  };
}

export const orderActions = {
  getOrderList,
  getOrderDetail,
  getReservList,
  updateOrderCheck,
};
