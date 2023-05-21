import { createSlice } from "@reduxjs/toolkit";

//여기에 초기값 설정
let initialState = {
  reviewList: [],
  campreviewList: [],
  pv: { currentPage: 1 },
  campPv: { currentPage: 1 },
};

const reviewSlice = createSlice({
  name: "review",
  initialState,

  reducers: {
    getReviewList(state, action) {
      console.log(action);
      state.reviewList = action.payload.data.reviewList;
      state.pv = action.payload.data.pv;
    },

    getCampReviewList(state, action) {
      console.log(action);
      state.campreviewList = action.payload.data.reviewList;
      state.campPv = action.payload.data.pv;
    },
  },
});

export const reviewReducers = reviewSlice.actions;
export default reviewSlice.reducer;
