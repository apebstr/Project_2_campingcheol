import UserMenu from "./user_menu";
import "../../css/userpage.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MyActions } from "../../reduxs/actions/my_action";
import style from "../../css/userpage.module.css";

const MyCampCart = () => {
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const { currentPage } = useParams();

  const userID = localStorage.getItem("userID");
  const myList = useSelector((state) => state.my.myList);
  const pv = useSelector((state) =>
    state.my.pv ? state.my.pv : { currentPage: 1 }
  );

  const pageNumbers = [];
  for (let i = pv.startPage; i <= pv.endPage; i++) {
    pageNumbers.push(i);
  }

  const config = {
    headers: {
      Authorization: localStorage.getItem("Authorization"),
    },
  };

  const getMyList = (currentPage, userID, config) => {
    dispatch(MyActions.getMyList(currentPage, userID, config));
    console.log(myList);
  };

  useEffect(() => {
    getMyList(pv.currentPage, userID, config);
    console.log(myList);
  }, []);

  const deleteCart = (campKeyNum, e) => {
    e.preventDefault();
    dispatch(MyActions.letLikeDelete(campKeyNum, config));
    console.log(campKeyNum);
    //dispatch(MyActions.getMyList(currentPage, userID, config));

    getMyList(pv.currentPage, userID, config);
    //window.location.replace(`/my/camp/cart`);
  };

  return (
    <>
      <div className='user'>
        <UserMenu />
        <div className='campCart'>
          <h1 style={{ marginLeft: "-320px" }}>캠핑장 찜목록</h1>
          <table>
            <thead>
              <tr
                style={{
                  display: "flex",
                  width: "80%",

                  height: "70px",
                  fontSize: "20px",
                  borderBottom: "2.5px solid gray",
                }}
              >
                <th
                  style={{
                    display: "flex",
                    marginLeft: "130px",
                    marginTop: "20px",
                    width: "33%",
                  }}
                >
                  캠핑장
                </th>
                <th
                  style={{
                    display: "flex",
                    marginLeft: "100px",
                    marginTop: "20px",
                    width: "70%",
                  }}
                >
                  캠핑장 정보
                </th>
              </tr>
            </thead>

            <tbody>
              {myList && myList.length > 0 ? (
                myList.map((my) => {
                  return (
                    <th
                      key={my.campKeyNum}
                      className='cCartlist'
                      id='cCartlist'
                    >
                      <tr>
                        <img src={my.campImg} alt='campImage' />
                      </tr>
                      <tr>
                        <td>
                          <strong>{my.campName}</strong>
                        </td>

                        <td
                          id='addr'
                          style={{ fontSize: "12pt", color: "gray" }}
                        >
                          {my.campAddr}
                        </td>
                        <td>
                          <button
                            type='submit'
                            className='campCartLink'
                            id='detail'
                          >
                            <Link
                              to={`/camp/view/${my.campKeyNum}`}
                              style={{ textDecoration: "none", color: "white" }}
                            >
                              상세페이지
                            </Link>
                          </button>

                          <button
                            type='submit'
                            // className="btn btn-delete"
                            id='delete'
                            onClick={(e) => deleteCart(my.campKeyNum, e)}
                          >
                            찜 삭제
                          </button>
                        </td>
                      </tr>

                      <hr />
                    </th>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan='3'
                    style={
                      {
                        // borderBottom: "solid lightgray 2px",
                      }
                    }
                  >
                    <strong>
                      <p
                        style={{
                          textAlign: "center",
                          marginLeft: "-320px",
                          color: "rgb(39, 157, 230)",
                          fontSize: "45px",
                          padding: "40px 10px",
                        }}
                      >
                        찜한 캠핑장이 없습니다.
                      </p>
                    </strong>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className={style.orderdPaging}>
        {pv ? (
          <nav arial-label='...'>
            <ul className='pagination'>
              <li
                className={
                  pv.startPage <= 1 ? "page-item disabled" : "page-item"
                }
              >
                <span
                  className='page-link'
                  onClick={() =>
                    getMyList(pv.startPage - pv.blockPage, userID, config)
                  }
                >
                  &laquo;
                </span>
              </li>

              {pageNumbers.map((pnum) => (
                <li
                  className={
                    pv.currentPage === pnum ? "page-item active" : null
                  }
                  aria-current={pv.currentPage === pnum ? "page" : null}
                  key={pnum}
                >
                  <span
                    className='page-link'
                    onClick={() => getMyList(pnum, userID, config)}
                  >
                    {pnum}
                  </span>
                </li>
              ))}

              <li
                className={
                  pv.endPage >= pv.totalPage
                    ? "page-item disabled"
                    : "page-item"
                }
              >
                <span
                  className='page-link'
                  onClick={() =>
                    getMyList(pv.startPage + pv.blockPage, userID, config)
                  }
                >
                  &raquo;
                </span>
              </li>
            </ul>
          </nav>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default MyCampCart;
