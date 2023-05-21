import axios from "axios";
import { baseUrl } from "../../apiurl";
import { campSiteReducers } from "../reducers/camp_reducer";
import qs from "qs";

//캠핑장 리스트 + 리스트 내 검색 + 메인페이지 검색
// if ((searchWord != null, campDo != null)) path = `${path}/${searchWord}/${campDo}`;
function getCampList(currentPage, params) {
  const queryParams = qs.stringify(params, { arrayFormat: "brackets" });
  return async (dispatch) => {
    // axios.get()으로 서버에서 데이터를 받으면 data라는 변수에 넣기
    const data = await axios
      .get(`${baseUrl}/camp/list/${currentPage}?${queryParams}`, params)
      .then((response) => response.data);
    dispatch(campSiteReducers.getCampList({ data }));
    console.log(data);
  };
}

//캠핑장 상세정보
function getCampDetail(num, userID, formData, config) {
  return async (dispatch) => {
    const data = await axios
      .get(
        `${baseUrl}/camp/view/${num}`,
        { params: { userID: userID } },
        formData,
        config
      )
      .then((response) => response.data);
    dispatch(campSiteReducers.getCampDetail({ data }));
  };
}

//캠핑장 상세정보
function getCampDetailW(num) {
  return async (dispatch) => {
    const data = await axios
      .get(`${baseUrl}/camp/view/Welcome/${num}`)
      .then((response) => response.data);
    dispatch(campSiteReducers.getCampDetail({ data }));
    console.log("사진!!!!!!!!!!!!!!!!", data);
  };
}

//캠핑장 예약정보 저장
function postCampreserv(formData) {
  return async (dispatch) => {
    const data = await axios
      .post(`${baseUrl}/camp/view/orderfin`, formData)
      .then((response) => response.data);
    dispatch(campSiteReducers.getCampReservNum({ data }));
    console.log("예약정보 : " + data);
    return data;
  };
}

//캠핑장 결제정보 저장
function postCampPay(payData) {
  return async () => {
    await axios.post(`${baseUrl}/camp/view/orderfin/fin`, payData);
  };
}

//캠핑장 태그 검색
function getTagSearch(currentPage, tags) {
  return async (dispatch) => {
    const data = await axios
      .get(`${baseUrl}/camp/list/${currentPage}/${tags}`, tags)
      .then((response) => response.data);
    dispatch(campSiteReducers.getCampList({ data }));
    console.log(data);
  };
}

//캠핑장 후기 가져오기
function getCampReview(currentPage, num) {
  console.log(" dddd" + currentPage);
  return async (dispatch) => {
    const data = await axios
      .get(`${baseUrl}/camp/view/${num}/${currentPage}`, num, currentPage)
      .then((response) => response.data);
    dispatch(campSiteReducers.getCampReviewList({ data }));
  };
}

// 추천장소(큐레이팅) +메인페이지 상품정보
function getRecommandList(userKeyNum) {
  return async (dispatch) => {
    const data = await axios
      .get(`${baseUrl}/camprecommendation/${userKeyNum}`)
      .then((response) => response.data);
    console.log("가져오세요?", data);
    dispatch(campSiteReducers.getRecommandList({ data }));

    const prod = await axios
      .get(`${baseUrl}/camprecommendation/prod`)
      .then((response) => response.data);
    dispatch(campSiteReducers.getRecentProdList({ prod }));
  };
}

export const campActions = {
  getCampList,
  getCampDetail,
  postCampreserv,
  postCampPay,
  getTagSearch,
  getCampReview,
  getRecommandList,
  getCampDetailW,
};
