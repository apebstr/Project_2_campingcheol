import axios from "axios";
import { baseUrl } from "../../apiurl";
import { NoticeReducers } from "../reducers/notice_reducer";
import qs from "qs";

function getNoticeList(currentPage) {
  return async (dispatch) => {
    // axios.get()으로 서버에서 데이터를 받으면 data라는 변수에 넣기
    const data = await axios
      .get(`${baseUrl}/admin/notice/list/${currentPage}`)
      .then((response) => response.data);
    console.log(data);
    dispatch(NoticeReducers.getNoticeList({ data }));
  };
}

function getNoticeDetail(noticeNum) {
  return async (dispatch) => {
    const data = await axios
      .get(`${baseUrl}/admin/notice/view/${noticeNum}`)
      .then((response) => response.data);
    dispatch(NoticeReducers.getNoticeDetail({ data }));
  };
}

function getNoticeDelete(noticeNum) {
  return async (dispatch) => {
    await axios
      .delete(`${baseUrl}/admin/notice/delete/${noticeNum}`)
      .then((response) => response.data);
  };
}

function getNoticeWrite(formData, config) {
  return async (dispatch) => {
    await axios
      .post(`${baseUrl}/admin/notice/write`, formData, config)
      .then((response) => response.data);
  };
}

function getNoticeUpdate(formData, config) {
  console.log(formData);
  return async (dispatch) => {
    await axios
      .put(`${baseUrl}/admin/notice/update/`, formData, config)
      .then((response) => response.data);
  };
}

function searchNoticeList(currentPage, params, config) {
  console.log(params);
  const queryParams = qs.stringify(params, { arrayFormat: "brackets" });
  return async (dispatch) => {
    const data = await axios
      .get(
        `${baseUrl}/admin/notice/list/search/${currentPage}?${queryParams}`,
        params,
        config
      )
      .then((response) => response.data);
    console.log(data);
    dispatch(NoticeReducers.searchNoticeList({ data }));
  };
}

function getFile(noticeNum) {
  return async (dispatch) => {
    const data = await axios
      .get(`${baseUrl}/admin/notice/contentdownload/${noticeNum}`)
      .then((response) => response.data);
    console.log(data);
    dispatch(NoticeReducers.getNoticeFile({ data }));
  };
}

export const noticeActions = {
  getNoticeList,
  getNoticeDetail,
  getNoticeDelete,
  getNoticeWrite,
  getNoticeUpdate,
  searchNoticeList,
  getFile,
};
