import { createSlice } from "@reduxjs/toolkit";

//여기에 초기값 설정
let initialState = {
  prodList: [],
  pv: { currentPage: 1 },
  prodDetail: {},
  modalOpenUpdate: {},
  campList: [],
  campPv: { currentPage: 1 },
};

const prodSlice = createSlice({
  name: "prod",
  initialState,

  reducers: {
    getProdList(state, action) {
      console.log(action);
      state.prodList = action.payload.data.prodList;
      state.pv = action.payload.data.pv;
    },

    getProdDetail(state, action) {
      state.prodDetail = action.payload.data;
    },

    updateModalOpen(state, action) {
      const { id, isOpen } = action.payload;
      state.modalOpenUpdate[id] = isOpen;
    },

    getSiteList(state, action) {
      console.log(action);
      state.campList = action.payload.data.prodList;
      state.campPv = action.payload.data.pv;
    },
  },
});

export const prodReducers = prodSlice.actions; //getBoardList이걸 호출하는거래
export default prodSlice.reducer;
