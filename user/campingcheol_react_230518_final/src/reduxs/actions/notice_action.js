import axios from "axios";
import { baseUrl } from "../../apiurl";
import notice_reducer, { NoticeReducers } from "../reducers/notice_reducer";
import qs from "qs";

function getNoticeList(currentPage) {
  return async (dispatch) => {
    // axios.get()으로 서버에서 데이터를 받으면 data라는 변수에 넣기
    const data = await axios
      .get(`${baseUrl}/notice/list/${currentPage}`)
      .then((response) => response.data);
    console.log(data);
    dispatch(NoticeReducers.getNoticeList({ data }));
  };
}

function getNoticeDetail(noticeNum) {
  return async (dispatch) => {
    const data = await axios
      .get(`${baseUrl}/notice/view/${noticeNum}`)
      .then((response) => response.data);
    dispatch(NoticeReducers.getNoticeDetail({ data }));

    console.log("디테일가져오기", data);

    const file = await axios
      .get(`${baseUrl}/notice/contentdownload/${noticeNum}`, {
        responseType: "blob",
      })
      .then((response) => response.data);

    dispatch(NoticeReducers.getBoardDownload({ file }));

    console.log(file);
  };
}

function getNoticeDelete(noticeNum) {
  return async (dispatch) => {
    await axios
      .delete(`${baseUrl}/notice/delete/${noticeNum}`)
      .then((response) => response.data);
  };
}

function getNoticeWrite(formData, config) {
  return async (dispatch) => {
    await axios
      .post(`${baseUrl}/notice/write`, formData, config)
      .then((response) => response.data);
  };
}

function getNoticeUpdate(formData, config) {
  return async (dispatch) => {
    await axios
      .put(`${baseUrl}/notice/update`, formData, config)
      .then((response) => response.data);
  };
}
function searchNoticeList(currentPage, params, config) {
  console.log("파파파파", params);
  const form = new FormData();
  form.append("table", params.table);
  form.append("searchKey", params.searchKey);
  form.append("searchWord", params.searchWord);
  return async (dispatch) => {
    const data = await axios
      .post(
        `${baseUrl}/notice/list/search/${currentPage}`,
        form,

        config
      )
      .then((response) => response.data);
    console.log("값을 쳐 가지고오세요?");
    dispatch(NoticeReducers.searchNoticeList({ data }));
  };
}

function getBoardDownload(noticeNum) {
  // console.log(noticeNum);
  return async (dispatch) => {
    const data = await axios
      .get(`${baseUrl}/notice/contentdownload/${noticeNum}`, {
        responseType: "blob",
      })
      .then((response) => response.data);

    dispatch(NoticeReducers.getBoardDownload({ data }));
  };
}

export const noticeActions = {
  getNoticeList,
  getNoticeDetail,
  getNoticeDelete,
  getNoticeWrite,
  getNoticeUpdate,
  searchNoticeList,
  getBoardDownload,
};
