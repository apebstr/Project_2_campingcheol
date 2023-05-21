import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  campSiteList: [],
  pv: { currentPage: 1 },
  campSiteDetail: [],
  campReviewList: [],
  campReservNum: 0,
  prodList: [],
  recommendCheck: 1,
};

const campSiteSlice = createSlice({
  name: "campSite",
  initialState,

  reducers: {
    getCampList(state, action) {
      state.campSiteList = action.payload.data.aList;
      state.pv = action.payload.data.pv;
      console.log(state.campSiteList);
      console.log(state.pv);
    },

    getCampDetail(state, action) {
      state.campSiteDetail = action.payload.data;
      // console.log(state.campSiteDetail);
    },

    getCampReviewList(state, action) {
      state.campReviewList = action.payload.data.aList;
      state.pv = action.payload.data.pv;
      console.log(state.campReviewList);
    },

    getCampReservNum(state, action) {
      state.campReservNum = action.payload.data;
      console.log("리저브넘 : " + state.campReservNum);
    },

    getRecommandList(state, action) {
      state.campSiteList = action.payload.data.recommendList;
      state.recommendCheck = action.payload.data.recommendCheck;
    },

    getRecentProdList(state, action) {
      state.prodList = action.payload.prod;
    },
  },
});

export const campSiteReducers = campSiteSlice.actions;
export default campSiteSlice.reducer;
