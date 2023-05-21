import axios from "axios";
import { baseUrl } from "../../apiurl";
import { myReducers } from "../reducers/my_reducer";

//캠핑장 찜목록 가져오기

function getMyList(currentPage, userID, config) {
  return async (dispatch) => {
    const data = await axios
      .get(`${baseUrl}/my/camp/cart/${currentPage}/${userID}`, config)
      .then((response) => response.data);
    console.log(data);
    dispatch(myReducers.getMyList({ data }));
  };
}

//캠핑장 찜목록 삭제하기
function letLikeDelete(campKeyNum, config) {
  return async (dispatch) => {
    const data = await axios
      .delete(`${baseUrl}/my/camp/cart/delete/${campKeyNum}`, config)
      .then((response) => response.data);
    dispatch(myReducers.getLikeDelete({ data }));
  };
}

//캠핑장 이용내역 가져오기
function getPayList(currentPage, userKeynum, config) {
  return async (dispatch) => {
    const data = await axios
      .get(`${baseUrl}/my/camp/payment/${currentPage}/${userKeynum}`, config)
      .then((response) => response.data);
    console.log(data);
    dispatch(myReducers.getPayList({ data }));
  };
}

//캠핑용품 결제내역 가져오기
function getProdPay(currentPage, userKeynum, config) {
  return async (dispatch) => {
    const data = await axios
      .get(`${baseUrl}/my/prod/payment/${currentPage}/${userKeynum}`, config)
      .then((response) => response.data);
    console.log(data);
    dispatch(myReducers.getProdPay({ data }));
  };
}

export const MyActions = {
  getMyList,
  letLikeDelete,
  getPayList,
  getProdPay,
};
