import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  creviewList: [],
  CKNList: {},
  previewList: [],
  PRNList: {},
  campPv: { currentPage: 1 },
  prodPv: { currentPage: 1 },
};

const reviewSlice = createSlice({
  name: "review",
  initialState,

  reducers: {
    getCreviewList(state, action) {
      console.log(action);
      state.creviewList = action.payload.data.selectCamp;
      state.campPv = action.payload.data.pv;
    },

    getCKNList(state, action) {
      console.log(action);
      state.CKNList = action.payload.data;
    },

    getPreviewList(state, action) {
      console.log(action);
      state.previewList = action.payload.data.selectProd;
      state.prodPv = action.payload.data.pv;
    },

    getPRNList(state, action) {
      console.log(action);
      state.PRNList = action.payload.data;
    },

    getPreviewDelete(state, action) {
      console.log(action);
      state.previewList = action.payload.data;
    },
    getCreviewDelete(state, action) {
      console.log(action);
      state.creviewList = action.payload.data;
    },
    saveCreview(state, action) {
      console.log(action);
      state.creviewList = action.payload.data;
    },
    updateCreview(state, action) {
      console.log(action);
      state.creviewList = action.payload.data;
    },
    updatePReview(state, action) {
      console.log(action);
      state.previewList = action.payload.data;
    },
  },
});

export const reviewReducers = reviewSlice.actions;
export default reviewSlice.reducer;
