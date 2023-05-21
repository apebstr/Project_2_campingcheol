import axios from "axios";
import { userReducers } from "../reducers/user_reducer";
import { baseUrl } from "../../apiurl";
import qs from "qs";

function getUserList(currentPage, params, config) {
  console.log(params);
  const queryParams = qs.stringify(params, { arrayFormat: "brackets" });

  return async (dispatch) => {
    const data = await axios
      .get(
        `${baseUrl}/admin/user/userlist/${currentPage}?${queryParams}`,
        params,
        config
      )
      .then((response) => response.data);
    console.log(data);
    dispatch(userReducers.getUserList({ data }));
  };
}

function getUserDropList(currentPage, config) {
  return async (dispatch) => {
    // axios.get()으로 서버에서 데이터를 받으면 data라는 변수에 넣기
    const data = await axios
      .get(`${baseUrl}/admin/user/userdroplist/${currentPage}`, config)
      .then((response) => response.data);
    console.log(data);
    dispatch(userReducers.getUserDropList({ data }));
  };
}

function updateDropUser(userKeynum, config) {
  return async () => {
    await axios
      .put(`${baseUrl}/admin/user/updatedropuser/${userKeynum}`, config)
      .then((response) => response.data);
  };
}

export const userActions = {
  getUserList,
  getUserDropList,
  updateDropUser,
};
