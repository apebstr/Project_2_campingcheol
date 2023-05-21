import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  noticeList: [],
  pv: { currentPage: 1 },
  noticeDetail: {},
  noticeFile: null,
};

const NoticeSlice = createSlice({
  name: "prod",
  initialState,

  reducers: {
    getNoticeList(state, action) {
      state.noticeList = action.payload.data.noticeList;
      state.pv = action.payload.data.pv;
    },

    getNoticeDetail(state, action) {
      state.noticeDetail = action.payload.data;
    },

    searchNoticeList(state, action) {
      console.log(action);
      state.noticeList = action.payload.data.noticeList;
      state.pv = action.payload.data.pv;
    },

    getBoardDownload(state, action) {
      state.noticeFile = action.payload.file;
      console.log(state.noticeFile);
    },
  },
});

export const NoticeReducers = NoticeSlice.actions;
export default NoticeSlice.reducer;

// let initialState = {
//   noticeList: [], //db에서 가져온 보드 자료
//   pv: { currenPage: 1 }, //페이지값 저장
//   noticeDetail: {},
//   noticeFile: null,
// };

// const noticeSlice = createSlice({
//   name: "notice",
//   initialState,

//   reducers: {
//     getNoticeList(state, action) {
//       state.noticeList = action.payload.data.aList; //back의 Service에서 받아온 aList
//       state.pv = action.payload.data.pv; //back의 this.pdto로 받아온 pv
//     },
//   },
// });
// //Slice는 여러개 등록할 수 있다

// //함수명 자동완성을 할 수 있도록 해준다.
// export const noticeReducers = noticeSlice.actions;
// export default noticeSlice.reducer;
