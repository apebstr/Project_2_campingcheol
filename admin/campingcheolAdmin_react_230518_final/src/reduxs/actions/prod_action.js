import axios from "axios";
import { prodReducers } from "../reducers/prod_reducer";
import { baseUrl } from "../../apiurl";
import qs from "qs";

function getProdList(currentPage, params, config) {
  console.log(params);
  const queryParams = qs.stringify(params, { arrayFormat: "brackets" });

  return async (dispatch) => {
    // axios.get()으로 서버에서 데이터를 받으면 data라는 변수에 넣기
    const data = await axios
      .get(
        `${baseUrl}/admin/prod/prodlist/${currentPage}?${queryParams}`,
        params,
        config
      )
      .then((response) => response.data);
    console.log(data);
    dispatch(prodReducers.getProdList({ data }));
  };
}

function getProdDetail(prodKeyNum, config) {
  return async (dispatch) => {
    const data = await axios
      .get(`${baseUrl}/admin/prod/detail/${prodKeyNum}`, config)
      .then((response) => response.data);
    console.log(data);
    dispatch(prodReducers.getProdDetail({ data }));
  };
}

function getProdInsert(formData, config) {
  return async () => {
    await axios
      .post(`${baseUrl}/admin/prod/insert`, formData, config)
      .then((response) => response.data);
  };
}

function getProdUpdate(formData, config) {
  return async () => {
    await axios
      .put(`${baseUrl}/admin/prod/update`, formData, config)
      .then((response) => response.data);
  };
}

function getProdDelete(prodKeyNum, config) {
  return async (dispatch) => {
    await axios
      .delete(`${baseUrl}/admin/prod/delete/${prodKeyNum}`, config)
      .then((response) => response.data);
  };
}

function getSiteList(currentPage, params, config) {
  console.log(params);
  const queryParams = qs.stringify(params, { arrayFormat: "brackets" });

  return async (dispatch) => {
    // axios.get()으로 서버에서 데이터를 받으면 data라는 변수에 넣기
    const data = await axios
      .get(
        `${baseUrl}/admin/prod/sitelist/${currentPage}?${queryParams}`,
        params,
        config
      )
      .then((response) => response.data);
    console.log(data);
    dispatch(prodReducers.getSiteList({ data }));
  };
}

function CampSiteDelete(campKeyNum, config) {
  return async (dispatch) => {
    await axios
      .delete(`${baseUrl}/admin/prod/campdelete/${campKeyNum}`, config)
      .then((response) => response.data);
  };
}

export const prodActions = {
  getProdList,
  getProdDetail,
  getProdInsert,
  getProdUpdate,
  getProdDelete,
  getSiteList,
  CampSiteDelete,
};
