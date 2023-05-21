import campSiteReducers from "./reducers/camp_reducer";
import prodReducer from "./reducers/prodReducer";
import NoticeReducers from "./reducers/notice_reducer";
import myReducers from "./reducers/my_reducer";
import payReducers from "./reducers/my_reducer";
import reviewReducers from "./reducers/review_reducer";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    campSite: campSiteReducers,
    prod: prodReducer,
    notice: NoticeReducers,
    my: myReducers,
    pay: payReducers,
    review: reviewReducers,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
