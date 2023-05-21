import { useEffect, useState } from "react";
import { baseUrl } from "../../apiurl";
import style from "../../css/userpage.module.css";
import { NavLink } from "react-router-dom";
import axios from "axios";

const UserMenu = () => {
  const [userInfo, setUserInfo] = useState({
    userKeynum: "",
    userID: "",
    userName: "",
  });

  const { userKeynum, userID, userName } = userInfo;

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("Authorization"),
    },
  };

  // const info = async () => {
  //   return await axios
  //     .get(`${baseUrl}/my/my/${localStorage.userKeynum}`, config)
  //     .then((response) => {
  //       setUserInfo({ ...response.data, userPass: "" });
  //     });
  // };

  // useEffect(() => {
  //   info();
  // }, []);

  return (
    <div className={style.userMenu_teel}>
      <h4>{localStorage.userName}</h4>

      <p>ID: {localStorage.userID}</p>
      <hr />

      <table className={style.userMenu_table}>
        {/* <hr /> */}
        <tr>
          <td>
            <NavLink to="/my/my" className={style.navlink}>
              내 프로필
            </NavLink>
          </td>
        </tr>

        {/* <hr /> */}

        <tr>
          <td>
            <NavLink to="/my/camp/cart" className={style.navlink}>
              캠핑장찜목록
            </NavLink>
          </td>
        </tr>

        {/* <hr /> */}

        <tr>
          <td>
            <NavLink to="/my/camp/payment" className={style.navlink}>
              캠핑장 이용내역
            </NavLink>
          </td>
        </tr>

        {/* <hr /> */}

        <tr>
          <td>
            <NavLink to="/my/prod/cart" className={style.navlink}>
              캠핑용품장바구니
            </NavLink>
          </td>
        </tr>

        {/* <hr /> */}

        <tr>
          <td>
            <NavLink to="/my/prod/payment" className={style.navlink}>
              캠핑용품 결제내역
            </NavLink>
          </td>
        </tr>

        {/* <hr /> */}

        <tr>
          <td>
            <NavLink to="/my/review" className={style.navlink}>
              내가 쓴 후기 관리
            </NavLink>
          </td>
        </tr>

        {/* <hr /> */}
      </table>
    </div>
  );
};

export default UserMenu;
