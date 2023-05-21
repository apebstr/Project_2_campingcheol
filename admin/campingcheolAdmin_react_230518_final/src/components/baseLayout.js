import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import style from "../css/baseLayout.module.css";
import boobono from "../image/bonobono.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const AdminLayout = () => {
  const navigatior = useNavigate();

  const gotoMemMan = () => {
    navigatior("/admin/user");
  };

  const gotoProdMan = () => {
    navigatior("/admin/manage/prod");
  };

  const gotoProdSiteMan = () => {
    navigatior("/admin/manage/site");
  };

  const gotoOrderProdMan = () => {
    navigatior("/admin/orders/prod");
  };
  const gotoOrderSiteMan = () => {
    navigatior("/admin/orders/site");
  };
  const gotoReviewMan = () => {
    navigatior("/admin/review/prod");
  };

  const gotoReviewSiteMan = () => {
    navigatior("/admin/review/site");
  };
  const gotoNoticeMan = () => {
    navigatior("/admin/notice");
  };

  return (
    <div className={style.adminContainer}>
      <div className={style.leftSide}>
        <div className={style.profileContainer}>
          <img src={boobono} />
          <div>
            <p className={style.managerName}>
              {/* {localStorage.getItem('adminName')} */}
              관리자
            </p>
            <Link to='/logout'>
              <p>
                <FontAwesomeIcon icon={faRightFromBracket} />
              </p>
            </Link>
          </div>
        </div>
        <div className={style.menubarContainer}>
          <div className={style.menubar}>
            <table>
              {/* 링크로 연결해주기  */}
              <thead></thead>
              <tbody>
                <tr>
                  <th className={style.prod} onClick={gotoMemMan}>
                    회원 관리
                  </th>
                </tr>
                <tr>
                  <th className={style.category} onClick={gotoNoticeMan}>
                    공지사항 관리
                  </th>
                </tr>

                <tr>
                  <th className={style.prod} onClick={gotoProdSiteMan}>
                    캠핑장 관리
                  </th>
                </tr>
                <tr>
                  <th className={style.prod} onClick={gotoOrderSiteMan}>
                    캠핑장 예약 관리
                  </th>
                </tr>
                <tr>
                  <th className={style.prod} onClick={gotoReviewSiteMan}>
                    캠핑장 후기 관리
                  </th>
                </tr>
                {/* <tr>
                  <th className={style.category}>캠핑용품 관리</th>
                </tr> */}
                <tr>
                  <th className={style.category} onClick={gotoProdMan}>
                    캠핑용품 관리
                  </th>
                </tr>

                <tr>
                  <th className={style.category} onClick={gotoOrderProdMan}>
                    캠핑용품 주문 관리
                  </th>
                </tr>

                <tr>
                  <th className={style.category} onClick={gotoReviewMan}>
                    캠핑용품 후기 관리
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className={style.rightSide}>
        <div className={style.contentContainer}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
