import { NavLink, Route, Routes } from "react-router-dom";
import "./App.css";
import AdminLayout from "./components/baseLayout";
import AdminLogin from "./components/adminLogin";
import UserManagement from "./components/user/userManagement";
import ProdProdManagement from "./components/prod/prodManagement";
import ProdSiteManagement from "./components/prod/campsiteManagement";
import OrderProdManagement from "./components/order/orderManagement";
import OrderSiteManagement from "./components/order/reservManagement";
import ReviewManagement from "./components/review/reviewManagement";
import CampReviewManagement from "./components/review/campreviewManagement";
import NoticeWrite from "./components/notice/noticeWrite";
import NoticeManagement from "./components/notice/noticeManagement";
import NoticeView from "./components/notice/notice_view";
import NoticeUpdate from "./components/notice/notice_update";
import style from "./css/new_layout.module.css";
import logo from "./image/logo.png";
import Sample from "./components/test";

import AdminLogout from "./components/adminLogout";

function App() {
  return (
    <>
      <div className={style.layout}>
        <div className={style.layoutTop}>
          <div className={style.logo}>
            <img src={logo} />
          </div>
        </div>
        <hr />
      </div>

      <Routes>
        <Route path='/' element={<AdminLogin />} />
        <Route path='/logout' element={<AdminLogout />} />
        <Route path='/admin' element={<AdminLayout />}>
          <Route path='/admin/user' element={<UserManagement />} />
          <Route path='/admin/manage/prod' element={<ProdProdManagement />} />
          <Route path='/admin/manage/site' element={<ProdSiteManagement />} />
          <Route path='/admin/orders/prod' element={<OrderProdManagement />} />
          <Route path='/admin/orders/site' element={<OrderSiteManagement />} />
          <Route path='/admin/review/prod' element={<ReviewManagement />} />
          <Route path='/admin/review/site' element={<CampReviewManagement />} />
          <Route path='/admin/notice' element={<NoticeManagement />} />

          <Route
            path='/admin/notice/view/:noticeNum'
            element={<NoticeView />}
          />
          <Route path='/admin/notice/write' element={<NoticeWrite />} />
          <Route
            path='/admin/notice/update/:noticeNum'
            element={<NoticeUpdate />}
          />

          <Route path='/admin/test' element={<Sample />} />
        </Route>
      </Routes>
      <div className={style.bottom}>
        <div className={style.bottomText}>
          <p>
            <a href='#'>개인정보처리방침</a>
          </p>
          <p>
            <a href='#'>전자우편무단수집거부</a>
          </p>
          <p>
            <a href='#'>캠핑장등록안내</a>
          </p>
          <p>
            <a href='#'>미등록야영장불법영업신고</a>
          </p>
        </div>
      </div>
    </>
  );
}

export default App;
