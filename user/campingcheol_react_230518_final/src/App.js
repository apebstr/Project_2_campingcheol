import "./App.css";
import { NavLink, Outlet, Route, Routes } from "react-router-dom";
import Layout from "./component/camp_layout";
import CampHomePage from "./component/homepage/camp_homepage";
import CampLogin from "./component/homepage/camp_login";
import CampLogout from "./component/homepage/camp_logout";
import CampSignin from "./component/homepage/camp_signin";
import CampList from "./component/campsite_reserv/camp_list";
import CampMapList from "./component/campsite_reserv/camp_maplist";
import CampPopular from "./component/campsite_reserv/camp_popular";
import CampView from "./component/campsite_reserv/camp_view";
import CampViewOrder from "./component/campsite_reserv/camp_view_order";
import CampViewOrderFin from "./component/campsite_reserv/camp_view_orderfin";
import NoticeList from "./component/notice/notice_list";
import NoticeView from "./component/notice/notice_view";

import MyMy from "./component/userpage/my_my";
import MyCampCart from "./component/userpage/my_camp_cart";
import MyCampPayment from "./component/userpage/my_camp_payment";
import MyProdCart from "./component/userpage/my_prod_cart";
import MyProdPayment from "./component/userpage/my_prod_payment";
import MyReview from "./component/userpage/my_review";
import ProdList from "./component/campstuff_shopping/prod_list";
import ProdOrder from "./component/campstuff_shopping/prod_order";
import ProdView from "./component/campstuff_shopping/prod_view";
import ProdOrderFin from "./component/campstuff_shopping/prod_orderfin";
import CartProdOrder from "./component/campstuff_shopping/prod_cartOrder";
import ProdCategory from "./component/campstuff_shopping/prod_categoryList";
import ProdSearch from "./component/campstuff_shopping/prod_searchList";
import "./css/new_layout.css";

import logo from "./image/logo.png";

import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Badge from "@material-ui/core/Badge";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "./apiurl";
import Test from "./component/homepage/test";
import Weather from "./weather";
import { render } from "react-dom";
import PrivateRoute from "./access/Privateroute";

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}))(Badge);

function App() {
  const [cartCount, setCartCount] = useState(0);

  const countProcess = () => {
    if (localStorage.getItem("userKeynum")) {
      const userKeynum = localStorage.getItem("userKeynum");
      const getCartCount = async (userKeynum) => {
        const data = await axios.get(
          `${baseUrl}/home/cartCount/${userKeynum}`,

          {
            headers: {
              Authorization: localStorage.getItem("Authorization"),
            },
          }
        );
        setCartCount(data.data);
        console.log(cartCount);
        console.log("실행됨");
      };
      getCartCount(userKeynum);
    }
  };

  const cartCal = async (userKeynum) => {
    if (userKeynum) {
      await axios
        .get(`${baseUrl}/home/cartCount/${userKeynum}`, {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        })
        .then((response) => {
          setCartCount(response.data);
        });
      // setCartCount(data.data);
    }
  };

  const cartPagCal = async (userKeynum) => {
    if (userKeynum) {
      await axios
        .get(`${baseUrl}/home/cartCount/${userKeynum}`, {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        })
        .then((response) => {
          console.log("아까 됬자나..", response.data);
          setCartCount(response.data);
        });
      // setCartCount(data.data);
    }
  };
  // const countProcess = async () => {
  //   if (localStorage.getItem("userKeynum")) {
  //     const userKeynum = localStorage.getItem("userKeynum");

  //     const data = await axios.get(`${baseUrl}/home/cartCount/${userKeynum}`);

  //     console.log(data);
  //     // setCartCount(data.data);
  //   }
  // };

  useEffect(() => {
    countProcess();
    cartPagCal();
  }, []);

  useEffect(() => {
    cartCal();
  }, [cartCount]);

  return (
    <>
      <Weather />
      <div className='layout'>
        <div className='layoutTop'>
          <div className='logo'>
            <NavLink to='/'>
              <img src={logo} />
            </NavLink>
          </div>
        </div>
        <div className='toolbar'>
          <div className='toolbarTextdiv'>
            <div className='minibutton'>
              {localStorage.getItem("userName") != null ? (
                <>
                  <p className='welcome'>
                    {localStorage.getItem("userNick") + "님, 환영합니다"}
                  </p>
                  <div className='cart_weather'>
                    <NavLink to='/my/prod/cart'>
                      <IconButton aria-label='cart'>
                        <StyledBadge
                          badgeContent={
                            localStorage.getItem("userKeynum") ? cartCount : 0
                          }
                          color='secondary'
                        >
                          <ShoppingCartIcon />
                        </StyledBadge>
                      </IconButton>
                    </NavLink>
                  </div>
                  <div className='btns'>
                    <NavLink to='/logout'>
                      <Button variant='contained' color='secondary'>
                        로그아웃
                      </Button>
                    </NavLink>
                  </div>
                </>
              ) : (
                <>
                  <div className='btns'>
                    <NavLink to='/login'>
                      <Button variant='contained' color='secondary'>
                        로그인
                      </Button>
                    </NavLink>
                    <NavLink to='/signup'>
                      <Button variant='contained' color='secondary'>
                        회원가입
                      </Button>
                    </NavLink>
                  </div>
                </>
              )}
            </div>
            <p className='toolbarText'>
              <a href='/camp/list/1'>캠핑장</a>
            </p>
            <p className='toolbarText'>
              <a href='/prod/list/1'>캠핑용품</a>
            </p>
            <p className='toolbarText'>
              <a href='/notice/list/1'>공지사항</a>
            </p>
            <p className='toolbarText'>
              <a href='/my/my'>마이페이지</a>
            </p>
          </div>
        </div>
      </div>

      {/* <hr /> */}
      <Routes>
        {/* 홈페이지/로그인/회원가입 */}
        <Route path='/' element={<Layout />}>
          <Route index element={<CampHomePage />} />
          <Route
            path='login'
            element={<PrivateRoute isAuth={false} RouteComponent={CampLogin} />}
          />
          <Route
            path='signup'
            element={
              <PrivateRoute isAuth={false} RouteComponent={CampSignin} />
            }
          />
          <Route
            path='logout'
            element={
              <PrivateRoute isAuth={false} RouteComponent={CampLogout} />
            }
          />

          {/* 캠핑장관련  */}
          <Route
            path='camp/list/:currentPage'
            element={<PrivateRoute isAuth={false} RouteComponent={CampList} />}
          />
          <Route
            path='camp/list/:currentPage/:searchWord'
            element={<PrivateRoute isAuth={false} RouteComponent={CampList} />}
          />
          <Route
            path='camp/maplist'
            element={
              <PrivateRoute isAuth={false} RouteComponent={CampMapList} />
            }
          />
          <Route
            path='camp/popular'
            element={
              <PrivateRoute isAuth={false} RouteComponent={CampPopular} />
            }
          />
          <Route
            path='camp/view/:num'
            element={<PrivateRoute isAuth={false} RouteComponent={CampView} />}
          />
          <Route
            path='camp/view/order'
            element={
              <PrivateRoute isAuth={true} RouteComponent={CampViewOrder} />
            }
          />
          <Route
            path='camp/view/orderfin'
            element={
              <PrivateRoute isAuth={true} RouteComponent={CampViewOrderFin} />
            }
          />
          {/* 캠핑용품관련 */}
          <Route
            path='/prod/list/:currentPage'
            element={
              <PrivateRoute
                isAuth={false}
                cartCal={cartCal}
                RouteComponent={ProdList}
              />
            }
          />

          <Route
            path='prod/list/category/:currentPage/:category'
            element={
              <PrivateRoute
                isAuth={false}
                cartCal={cartCal}
                RouteComponent={ProdCategory}
              />
            }
          />

          <Route
            path='prod/list/category/:currentPage/:category'
            element={
              <PrivateRoute
                isAuth={false}
                cartCal={cartCal}
                RouteComponent={ProdCategory}
              />
            }
          />

          <Route
            path='prod/list/search/:currentPage/:search'
            element={
              <PrivateRoute
                isAuth={false}
                cartCal={cartCal}
                RouteComponent={ProdSearch}
              />
            }
          />
          <Route
            path='prod/view/:prodKeyNum'
            element={
              <PrivateRoute
                isAuth={false}
                cartCal={cartCal}
                RouteComponent={ProdView}
              />
            }
          />
          {/* 단품구매 */}
          <Route
            path='prod/order'
            element={<PrivateRoute isAuth={true} RouteComponent={ProdOrder} />}
          />
          {/* 장바구니에서 여러개 구매 */}
          <Route
            path='prod/cartOrder'
            element={
              <PrivateRoute isAuth={true} RouteComponent={CartProdOrder} />
            }
          />
          <Route
            path='prod/orderfin'
            element={
              <PrivateRoute
                isAuth={true}
                cartPagCal={cartPagCal}
                RouteComponent={ProdOrderFin}
              />
            }
          />
          {/* 공지사항 관련 */}
          <Route
            path='notice/list/:currentPage'
            element={
              <PrivateRoute isAuth={false} RouteComponent={NoticeList} />
            }
          />
          <Route
            path='notice/view/:noticeNum'
            element={
              <PrivateRoute isAuth={false} RouteComponent={NoticeView} />
            }
          />
          <Route
            path='/notice/list/:currentPage/:selectedtable/:searchKey/:searchWord'
            element={
              <PrivateRoute isAuth={false} RouteComponent={NoticeList} />
            }
          />
          {/* 마이페이지 관련 */}
          <Route
            path='my/my'
            element={<PrivateRoute isAuth={true} RouteComponent={MyMy} />}
          />
          <Route
            path='my/camp/cart'
            element={<PrivateRoute isAuth={true} RouteComponent={MyCampCart} />}
          />
          <Route
            path='my/camp/payment'
            element={
              <PrivateRoute isAuth={true} RouteComponent={MyCampPayment} />
            }
          />
          <Route
            path='my/prod/cart'
            element={
              <PrivateRoute
                isAuth={true}
                cartPagCal={cartPagCal}
                RouteComponent={MyProdCart}
              />
            }
          />
          <Route
            path='my/prod/payment'
            element={
              <PrivateRoute isAuth={true} RouteComponent={MyProdPayment} />
            }
          />
          <Route
            path='my/review'
            element={<PrivateRoute isAuth={true} RouteComponent={MyReview} />}
          />
        </Route>
      </Routes>

      {/* <hr /> */}
      <div className='bottom'>
        <div className='bottomText'>
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
