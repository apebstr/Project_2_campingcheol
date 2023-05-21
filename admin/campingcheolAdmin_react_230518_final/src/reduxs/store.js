import { configureStore } from "@reduxjs/toolkit";
import userReducers from "./reducers/user_reducer";
import prodReducers from "./reducers/prod_reducer";
import orderReducers from "./reducers/order_reducer";
import reviewReducers from "./reducers/review_reducer";
import NoticeReducers from "./reducers/notice_reducer";

const store = configureStore({
  reducer: {
    user: userReducers,
    prod: prodReducers,
    order: orderReducers,
    review: reviewReducers,
    notice: NoticeReducers,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  // 기본 값이 true지만 배포할때 코드를 숨기기 위해서 false로 변환하기 쉽게 설정에 넣어놨다.
});

export default store;
