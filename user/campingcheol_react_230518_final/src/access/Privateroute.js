import { Navigate } from "react-router-dom";

const PrivateRoute = ({ isAuth, RouteComponent, cartCal, cartPagCal }) => {
  const isLogin = localStorage.getItem("isLogin");
  console.log(isAuth, isLogin);
  // 인증이 반드시 필요한 페이지이고 인증이 된 페이지
  if (isAuth && isLogin) {
    return <RouteComponent cartCal={cartCal} cartPagCal={cartPagCal} />;
  }

  // 인증이 반드시 필요한 페이지이고 인증이 안된 페이지
  else if (isAuth && !isLogin) {
    return <Navigate to='/login' />;
  }

  //인증이 필요하지 않은 페이지
  else {
    return <RouteComponent cartCal={cartCal} cartPagCal={cartPagCal} />;
  }

  // return <Navigate to='/' />;
};

export default PrivateRoute;
