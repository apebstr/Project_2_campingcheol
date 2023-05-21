import { Link, NavLink, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      {/* <ul>
          <li><bold>❤️기본페이지</bold></li>
          <li><NavLink to="/">홈페이지</NavLink></li>
          <li><NavLink to="/login">로그인</NavLink></li>
          <li><NavLink to="/signup">회원가입</NavLink></li>


          <li><bold>❤️캠핑장관련</bold></li>
          <li><NavLink to="/camp/list">테마별캠핑장</NavLink></li>
          <li><NavLink to="/camp/maplist">위치별 캠핑장</NavLink></li>
          <li><NavLink to="/camp/popular">인기캠핑장</NavLink></li>
          <li><NavLink to="/camp/view">캠핑장상세페이지</NavLink></li>
          <li><NavLink to="/camp/view/order">캠핑장예약폼</NavLink></li>
          <li><NavLink to="/camp/view/orderfin">캠핑장예약완료페이지</NavLink></li>
          
          
          <li><bold>❤️캠핑용품관련</bold></li>
          <li><NavLink to="/prod/list">상품리스트</NavLink></li>
          <li><NavLink to="/prod/view">상세페이지</NavLink></li>
          <li><NavLink to="/prod/order">결제</NavLink></li>
          <li><NavLink to="/prod/orderfin">결제완료페이지</NavLink></li>
          
          <li><bold>❤️공지사항관련</bold></li>
          <li><NavLink to="/notice">공지사항</NavLink></li>
          <li><NavLink to="/notice/view">공지사항상세</NavLink></li>
          
          
          <li><bold>❤️회원정보관련</bold></li>
          <li><NavLink to="/my/my">회원정보관리</NavLink></li>
          <li><NavLink to="/my/camp/cart">캠핑장찜목록</NavLink></li>
          <li><NavLink to="/my/camp/payment">캠핑장 이용내역</NavLink></li>
          <li><NavLink to="/my/prod/cart">캠핑용품장바구니</NavLink></li>
          <li><NavLink to="/my/prod/payment">캠핑용품 결제내역</NavLink></li>
          <li><NavLink to="my/review">내가 쓴 후기 관리</NavLink></li>
        </ul> */}
      {/* <hr /> */}
      <Outlet />
    </>
  );
};

export default Layout;
