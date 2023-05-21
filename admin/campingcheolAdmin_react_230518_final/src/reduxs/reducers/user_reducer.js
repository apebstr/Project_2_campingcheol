import { createSlice } from "@reduxjs/toolkit";

//여기에 초기값 설정
let initialState = {
  userList: [],
  dropList: [],
  pv: { currentPage: 1 },
};

const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    getUserList(state, action) {
      console.log(action);
      state.userList = action.payload.data.userList;
      state.pv = action.payload.data.pv;
    },

    getUserDropList(state, action) {
      console.log(action);
      state.dropList = action.payload.data.userDropList;
      state.pv = action.payload.data.pv;
    },
  },
});

export const userReducers = userSlice.actions; //getBoardList이걸 호출하는거래
export default userSlice.reducer;
