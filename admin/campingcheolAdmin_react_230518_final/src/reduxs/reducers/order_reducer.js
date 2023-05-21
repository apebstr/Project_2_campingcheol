import { createSlice } from "@reduxjs/toolkit";

//여기에 초기값 설정
let initialState = {
  orderList: [],
  pv: { currentPage: 1 },
  orderDetail: {},
  orderProdDetail: [],
  reservList: [],
  reservPv: { currentPage: 1 },
};

const orderSlice = createSlice({
  name: "order",
  initialState,

  reducers: {
    getOrderList(state, action) {
      console.log(action);
      state.orderList = action.payload.data.orderList;
      state.pv = action.payload.data.pv;
    },

    getOrderDetail(state, action) {
      state.orderDetail = action.payload.data.orderDetail;
      state.orderProdDetail = action.payload.data.orderProdDetail;
    },

    getReservList(state, action) {
      console.log(action);
      state.reservList = action.payload.data.orderList;
      state.reservPv = action.payload.data.pv;
    },
  },
});

export const orderReducers = orderSlice.actions; //getBoardList이걸 호출하는거래
export default orderSlice.reducer;
