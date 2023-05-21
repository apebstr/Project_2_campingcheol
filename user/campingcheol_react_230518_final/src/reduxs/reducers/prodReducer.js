import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  prodList: [],
  pv: { currentPage: 1 },
  prodDetail: {},
  memberDatil: {},
  tagList: [],
  cartList: [],
  orderCartList: [],
  orderedList: [],
  prodReviewList: [],
  avgRating: 0, //상품 평균 별점
  prodOrdernum: 0,
  imageFile: null,
};

const ProdSlice = createSlice({
  name: "prod",
  initialState,

  reducers: {
    getProdList(state, action) {
      state.prodList = action.payload.data.prodList;
      state.pv = action.payload.data.pv;
    },

    getProdDetail(state, action) {
      state.prodDetail = action.payload.data;
    },

    getUserInfo(state, action) {
      state.memberDatil = action.payload.data;
    },

    getTagList(state, action) {
      state.tagList = action.payload.data;
    },

    getProdCartList(state, action) {
      state.cartList = action.payload.data;
    },

    getOrderCartList(state, action) {
      state.orderCartList = action.payload.data;
      // console.log(state.orderCartList);
    },

    getOrderedList(state, action) {
      state.orderedList = action.payload.data.orderedList;
      state.pv = action.payload.data.pv;
    },

    getProdReviewList(state, action) {
      state.prodReviewList = action.payload.data.reviewList;
      state.pv = action.payload.data.pv;
      state.avgRating = action.payload.data.avgRating;
    },

    getProdOrderNum(state, action) {
      state.prodOrdernum = action.payload.data;
      console.log("reducer", state.prodOrdernum);
    },

    getImage(state, action) {
      state.imageFile = action.payload.data;
    },
  },
});

export const prodReducers = ProdSlice.actions;
export default ProdSlice.reducer;
