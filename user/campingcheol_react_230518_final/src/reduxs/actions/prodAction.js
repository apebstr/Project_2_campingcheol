import axios from "axios";
import { baseUrl } from "../../apiurl";
import { prodReducers } from "../reducers/prodReducer";

//전체 상품리스트 가져오기
function getProdList(currentPage) {
  return async (dispatch) => {
    const data = await axios
      .get(`${baseUrl}/prod/list/${currentPage}`)
      .then((response) => response.data);

    dispatch(prodReducers.getProdList({ data }));
  };
}

//카테고리별 상품리스트 가져오기
function getCategoryList(currentPage, category) {
  return async (dispatch) => {
    const data = await axios
      .get(`${baseUrl}/prod/list/${currentPage}/${category}`)
      .then((response) => response.data);

    dispatch(prodReducers.getProdList({ data }));
  };
}

//상품 상세정보가져오기
function getProdDetail(prodKeyNum) {
  return async (dispatch) => {
    // console.log(prodKeyNum);
    const data = await axios
      .get(`${baseUrl}/prod/view/${prodKeyNum}`)
      .then((response) => response.data);
    // console.log(prodKeyNum);
    dispatch(prodReducers.getProdDetail({ data }));
  };
}
// 상품에 따른 후기 리스트 가져오기 + 평균 별점
function getProdReviewList(currentPage, prodKeyNum, config) {
  return async (dispatch) => {
    const data = await axios
      .get(`${baseUrl}/prod/getReviewList/${currentPage}/${prodKeyNum}`, config)
      .then((response) => response.data);
    dispatch(prodReducers.getProdReviewList({ data }));
  };
}

//검색결과 상품리스트 가져오기
function getProdSearch(currentPage, search) {
  return async (dispatch) => {
    const data = await axios
      .get(`${baseUrl}/prod/list/search/${currentPage}/${search}`)
      .then((response) => response.data);

    dispatch(prodReducers.getProdList({ data }));
  };
}

// 장바구니 insert하기 -> 나중에 수정필요
function insertCart(formData, config) {
  return async (dispatch) => {
    await axios
      .post(`${baseUrl}/prod/list`, formData, config)
      .then((response) => response.data);
  };
}

// 유저정보가져오기(결제창에서 정보를 가져오가 위함)
function getUserInfo(userKeynum, config) {
  return async (dispatch) => {
    const data = await axios
      .get(`${baseUrl}/prod/getUserInfo/${userKeynum}`, config)
      .then((response) => response.data);

    dispatch(prodReducers.getUserInfo({ data }));
  };
}

//태그 리스트 가져오기
function getTagList() {
  return async (dispatch) => {
    const data = await axios
      .get(`${baseUrl}/tag/list`)
      .then((response) => response.data);

    dispatch(prodReducers.getTagList({ data }));
  };
}

//결제정보 insert하기
function insertorderInfo(formData, config) {
  return async (dispatch) => {
    const data = await axios
      .post(`${baseUrl}/prod/orderInsert`, formData, config)
      .then((response) => response.data);

    console.log("data", data);
    dispatch(prodReducers.getProdOrderNum({ data }));
    return data;
  };
}

//상세결제정보 insert하기
function insertDetail(formData, config) {
  return async (dispatch) => {
    await axios.post(`${baseUrl}/prod/insertIrderDetail`, formData, config);
  };
}

//장바구니 목록 가져오기
function getProdCartList(userKeynum, config) {
  // console.log("ㅎ;;");
  return async (dispatch) => {
    const data = await axios
      .get(`${baseUrl}/prod/cartList/${userKeynum}`, config)
      .then((response) => response.data);

    dispatch(prodReducers.getProdCartList({ data }));
  };
}

// 장바구니에서 체크한 상품목록만 가져오기
function getCartOrderList(userKeynum, config) {
  return async (dispatch) => {
    const data = await axios
      .get(`${baseUrl}/prod/cartOrderList/${userKeynum}`, config)
      .then((response) => response.data);

    dispatch(prodReducers.getOrderCartList({ data }));
  };
}

// 결제내역가져오기
function getOrderedList(currentPage, userKeynum) {
  return async (dispatch) => {
    const data = await axios
      .get(`${baseUrl}/prod/orderedList/${currentPage}/${userKeynum}`)
      .then((response) => response.data);

    dispatch(prodReducers.getOrderedList({ data }));
  };
}

//상품이미지
function getImage(upload, config) {
  return async (dispatch) => {
    const data = await axios
      .get(`${baseUrl}/prod/getimage/${upload}`, {
        responseType: "blob",
        config,
      })
      .then((response) => response.data);
    //dispatch(boardActions.getBoardDownload(data));

    return data;
  };
}

export const prodActions = {
  getProdList,
  getCategoryList,
  getProdDetail,
  getProdSearch,
  insertCart,
  getUserInfo,
  getTagList,
  insertorderInfo,
  getProdCartList,
  getCartOrderList,
  insertDetail,
  getOrderedList,
  getProdReviewList,
  getImage,
};
