import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  myList: [],
  likeDelete: [],
  payList: [],
  pv: { currentPage: 1 },
  selectProd: [],
};

const mySlice = createSlice({
  name: "my",
  initialState,

  reducers: {
    // 캠핑장 찜목록 가져오기
    getMyList(state, action) {
      console.log(action);
      state.myList = action.payload.data.myList;
      state.pv = action.payload.data.pv;
    },

    // 캠핑장 찜목록 삭제
    getLikeDelete(state, action) {
      console.log(action);
      state.likeDelete = action.payload.data;
    },

    // 결제 내역 가져오기
    getPayList(state, action) {
      console.log(action);
      state.payList = action.payload.data.selectCamp;
      state.pv = action.payload.data.pv;
    },

    // 상품 결제
    getProdPay(state, action) {
      console.log(action);
      state.selectProd = action.payload.data.selectProd;
      console.log(state.selectProd);
      state.pv = action.payload.data.pv;
      console.log(state.pv);
    },
  },
});

export const myReducers = mySlice.actions;
export default mySlice.reducer;
