import axios from "axios";
import { baseUrl } from "../../apiurl";
import { reviewReducers } from "../reducers/review_reducer";

const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("Authorization"),
  },
};

function getCreviewList(currentPage, userKeyNum, config) {
  return async (dispatch) => {
    const data = await axios
      .get(`${baseUrl}/my/review/camp/${currentPage}/${userKeyNum}`, config)
      .then((response) => response.data);
    console.log(data);
    dispatch(reviewReducers.getCreviewList({ data }));
  };
}

function getCKNList(campRewNum, config) {
  return async (dispatch) => {
    const data = await axios
      .get(`${baseUrl}/my/review/camp/modal/${campRewNum}`, config)
      .then((response) => response.data);
    console.log(data);
    dispatch(reviewReducers.getCKNList({ data }));
  };
}

function getPreviewList(currentPage, userKeynum, config) {
  return async (dispatch) => {
    const data = await axios
      .get(`${baseUrl}/my/review/prod/${currentPage}/${userKeynum}`, config)
      .then((response) => response.data);
    console.log(data);
    dispatch(reviewReducers.getPreviewList({ data }));
  };
}

function getPRNList(prodReviewNum, config) {
  return async (dispatch) => {
    const data = await axios
      .get(`${baseUrl}/my/review/prod/modal/${prodReviewNum}`, config)
      .then((response) => response.data);
    console.log(data);
    dispatch(reviewReducers.getPRNList({ data }));
  };
}

function getPreviewDelete(prodReviewNum, config) {
  return async (dispatch) => {
    const data = await axios
      .delete(`${baseUrl}/my/review/prod/delete/${prodReviewNum}`, config)
      .then((response) => response.data);
  };
}

function getCreviewDelete(campRewNum, config) {
  return async (dispatch) => {
    const data = await axios
      .delete(`${baseUrl}/my/review/camp/delete/${campRewNum}`, config)
      .then((response) => response.data);
  };
}

function saveCreview(campKeyNum, campReviewDTO, config) {
  console.log(campReviewDTO);
  return async (dispatch) => {
    const data = await axios
      .post(
        `${baseUrl}/my/review/camp/write/${campKeyNum}`,
        campReviewDTO,
        config
      )
      .then((response) => response.data);
    console.log(data);
    dispatch(reviewReducers.saveCreview({ data }));
  };
}

function updateCreview(campRewNum, campReviewDTO, config) {
  return async (dispatch) => {
    const data = await axios
      .put(
        `${baseUrl}/my/review/camp/update/${campRewNum}`,
        campReviewDTO,
        config
      )
      .then((response) => response.data);
    console.log(data);
    dispatch(reviewReducers.updateCreview({ data }));
  };
}

function updatePReview(ProdReviewDTO, config) {
  return async (dispatch) => {
    const data = await axios
      .put(`${baseUrl}/my/review/prod/update`, ProdReviewDTO, config)
      .then((response) => response.data);
    console.log(data);
    dispatch(reviewReducers.updatePReview({ data }));
  };
}

export const ReviewActions = {
  getCreviewList,
  getCKNList,
  getPreviewList,
  getPRNList,
  getPreviewDelete,
  getCreviewDelete,
  saveCreview,
  updateCreview,
  updatePReview,
};
