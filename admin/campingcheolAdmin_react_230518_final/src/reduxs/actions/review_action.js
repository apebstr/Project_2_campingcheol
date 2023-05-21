import axios from "axios";
import { reviewReducers } from "../reducers/review_reducer";
import { baseUrl } from "../../apiurl";
import qs from "qs";

function getReviewList(currentPage, params, config) {
  console.log(params);
  const queryParams = qs.stringify(params, { arrayFormat: "brackets" });

  return async (dispatch) => {
    // axios.get()으로 서버에서 데이터를 받으면 data라는 변수에 넣기
    const data = await axios
      .get(
        `${baseUrl}/admin/review/reviewlist/${currentPage}?${queryParams}`,
        params,
        config
      )
      .then((response) => response.data);
    console.log(data);
    dispatch(reviewReducers.getReviewList({ data }));
  };
}

function getReviewDelete(prodReviewNum, config) {
  return async (dispatch) => {
    await axios
      .delete(`${baseUrl}/admin/review/delete/${prodReviewNum}`, config)
      .then((response) => response.data);
  };
}

function getCampReviewList(currentPage, params, config) {
  console.log(params);
  const queryParams = qs.stringify(params, { arrayFormat: "brackets" });

  return async (dispatch) => {
    // axios.get()으로 서버에서 데이터를 받으면 data라는 변수에 넣기
    const data = await axios
      .get(
        `${baseUrl}/admin/review/reviewcamplist/${currentPage}?${queryParams}`,
        params,
        config
      )
      .then((response) => response.data);
    console.log(data);
    dispatch(reviewReducers.getCampReviewList({ data }));
  };
}

function CampReviewDelete(campRewNum, config) {
  return async (dispatch) => {
    await axios
      .delete(`${baseUrl}/admin/review/campdelete/${campRewNum}`, config)
      .then((response) => response.data);
  };
}

export const reviewActions = {
  getReviewList,
  getReviewDelete,
  getCampReviewList,
  CampReviewDelete,
};
