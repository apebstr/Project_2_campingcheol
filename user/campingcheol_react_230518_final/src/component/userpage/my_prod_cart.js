import { useEffect } from "react";
import { useState } from "react";
import UserMenu from "./user_menu";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import style from "../../css/userpage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { prodActions } from "../../reduxs/actions/prodAction";
import axios from "axios";
import { baseUrl } from "../../apiurl";
import { Link, useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const MyProdCart = ({ cartPagCal }) => {
  const dispatch = useDispatch();
  const navigator = useNavigate();

  //장바구니 리스트 가져오기
  const prodCart = useSelector((state) => state.prod.cartList);

  const userKeynum = localStorage.getItem("userKeynum");

  //총 금액 출력
  const [totalPrice, setTotalPrice] = useState(0);

  //prodCartNum 담는 리스트
  const [cartNumList, setCartNumList] = useState([]);

  const [isChecked, setIsChecked] = useState();

  //전체 선택
  const selectALL = async () => {
    await axios.put(`${baseUrl}/prod/selectAll/${userKeynum}`, null, {
      headers: {
        Authorization: localStorage.getItem("Authorization"),
      },
    });
    dispatch(
      prodActions.getProdCartList(userKeynum, {
        headers: {
          Authorization: localStorage.getItem("Authorization"),
        },
      })
    );
  };

  //전체 선택 해제
  const deSelectAll = async () => {
    await axios.put(`${baseUrl}/prod/deselectAll/${userKeynum}`, null, {
      headers: {
        Authorization: localStorage.getItem("Authorization"),
      },
    });
    dispatch(
      prodActions.getProdCartList(userKeynum, {
        headers: {
          Authorization: localStorage.getItem("Authorization"),
        },
      })
    );
  };

  const toggleSelect = async () => {
    setIsChecked(!isChecked);
    if (isChecked) {
      await deSelectAll();
    } else {
      await selectALL();
    }
  };

  // 부분삭제 ()
  const deletecart = async () => {
    cartNumList.map(async (prodCartNum) => {
      await axios.delete(`${baseUrl}/prod/deleteCart/${prodCartNum}`, {
        headers: {
          Authorization: localStorage.getItem("Authorization"),
        },
      });
      dispatch(
        prodActions.getProdCartList(userKeynum, {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        })
      );
      cartPagCal(localStorage.getItem("userKeynum"));
    });

    // const prodCartNum = e.target.value;
  };

  // 전체삭제
  const deleteAllCart = async (e) => {
    await axios.delete(`${baseUrl}/prod/deleteAllCart/${userKeynum}`, {
      headers: {
        Authorization: localStorage.getItem("Authorization"),
      },
    });
    dispatch(
      prodActions.getProdCartList(userKeynum, {
        headers: {
          Authorization: localStorage.getItem("Authorization"),
        },
      })
    );
    cartPagCal(localStorage.getItem("userKeynum"));
  };

  // 체크여부 변경하기
  const reverseCheck = async (e) => {
    console.log("체크여부 변경", localStorage.getItem("Authorization"));
    const prodCartNum = e.target.value;
    await axios.put(`${baseUrl}/prod/reverseCart/${prodCartNum}`, null, {
      headers: {
        Authorization: localStorage.getItem("Authorization"),
      },
    });

    dispatch(
      prodActions.getProdCartList(userKeynum, {
        headers: {
          Authorization: localStorage.getItem("Authorization"),
        },
      })
    );
  };

  // const productList = useSelector((state) => state.prod.productList);

  const increaseQuantity = async (e, product) => {
    console.log("product", product);
    if (product.prodState == "1" || product.prodStock <= 0) {
      return;
    }
    if (product.prodCartCount >= product.prodStock) {
      return;
    }

    await axios.put(
      `${baseUrl}/prod/cartIncrease/${product.prodCartNum}`,
      null,
      {
        headers: {
          Authorization: localStorage.getItem("Authorization"),
        },
      }
    );
    setTotalPrice(
      (prevTotalPrice) =>
        prevTotalPrice +
        Number(
          prodCart.find((prod) => prod.prodCartNum === product.prodCartNum)
            .prodPrice
        )
    );
    setCartNumList((prevCartNumList) => [
      ...prevCartNumList,
      product.prodCartNum,
    ]);
  };

  const decreaseQuantity = async (product) => {
    if (
      product.prodCartCount <= 1 ||
      product.prodState == "1" ||
      product.prodStock <= 0
    ) {
      return;
    }
    await axios.put(
      `${baseUrl}/prod/cartDecrease/${product.prodCartNum}`,
      null,
      {
        headers: {
          Authorization: localStorage.getItem("Authorization"),
        },
      }
    );
    setTotalPrice(
      (prevTotalPrice) =>
        prevTotalPrice -
        Number(
          prodCart.find((prod) => prod.prodCartNum === product.prodCartNum)
            .prodPrice
        )
    );
    setCartNumList((prevCartNumList) =>
      prevCartNumList.filter((cartNum) => cartNum !== product.prodCartNum)
    );
  };
  useEffect(() => {
    dispatch(
      prodActions.getProdCartList(userKeynum, {
        headers: {
          Authorization: localStorage.getItem("Authorization"),
        },
      })
    );
  }, [totalPrice]);

  // useEffect(() => {
  //   dispatch(prodActions.getProdCartList(userKeynum));
  // }, [isChecked, reverseCheck]);

  useEffect(() => {
    const { totalPrice, cartNumList } = calculateTotalPrice();
    setTotalPrice(totalPrice);
    setCartNumList(cartNumList);
  }, [prodCart]);

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    let cartNumList = [];
    prodCart.forEach((prod) => {
      if (prod.prodState == "0" && prod.prodStock >= 1) {
        const price = Number(prod.prodPrice);
        if (prod.prodCartCheck === "true") {
          totalPrice += price * prod.prodCartCount;
          cartNumList.push(prod.prodCartNum);
        }
      }
    });
    return { totalPrice, cartNumList };
  };

  const gotoOrder = () => {
    if (totalPrice <= 0) {
      setShow(true);
      return;
    }
    navigator("/prod/cartorder");
  };

  ///////////////////
  function isHttpUrl(url) {
    return url.startsWith("https://");
  }
  const [imageUrls, setImageUrls] = useState({});

  const getImage = async (prod) => {
    try {
      const imageFile = await dispatch(prodActions.getImage(prod.prodImage));
      const url = window.URL.createObjectURL(imageFile);
      setImageUrls((prevState) => ({
        ...prevState,
        [prod.prodKeyNum]: url,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (prodCart) {
      prodCart.forEach((prod) => {
        if (prod.prodImage) {
          if (isHttpUrl(prod.prodImage)) {
            setImageUrls((prevState) => ({
              ...prevState,
              [prod.prodKeyNum]: prod.prodImage,
            }));
          } else {
            getImage(prod);
          }
        }
      });
    }
  }, [prodCart]);

  //모달 관련
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  return (
    <>
      <div>
        <Modal
          show={show}
          onHide={handleClose}
          backdropClassName={style.cartAlert}
          style={{ marginTop: "400px" }}
        >
          <Modal.Header closeButton>
            {/* <Modal.Title>Modal heading</Modal.Title> */}
          </Modal.Header>
          <Modal.Body style={{ margin: "auto" }}>
            상품을 선택해주세요
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleClose}>
              닫기
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

      <div className={style.user}>
        <UserMenu />
        <div className={style.prodCart}>
          <h1>캠핑용품 장바구니</h1>
          <button
            type='submit'
            className={style.deleteBtn}
            onClick={deletecart}
          >
            선택 삭제
          </button>

          <button
            type='submit'
            className={style.deleteBtn}
            onClick={deleteAllCart}
          >
            전체 삭제
          </button>
          <hr />

          <table
            className={style.pCartlist}
            style={{ marginTop: 20, width: "1120px" }}
          >
            <colgroup>
              <col width='10%' />
              <col width='40%' />
              <col width='20%' />
              <col width='50%' />
            </colgroup>

            <thead>
              <tr>
                <th className={style.allcheck}>
                  <input
                    type='checkbox'
                    checked={isChecked}
                    onChange={toggleSelect}
                    className={style.allSelect}
                  />
                </th>
                <th>상품명</th>
                <th>수량</th>
                <th>가격</th>
              </tr>
            </thead>

            <tbody>
              {prodCart && prodCart.length > 0 ? (
                prodCart.map((product) => (
                  <tr key={product.prodTitle}>
                    <td className={style.prodTitle}>
                      <div className={style.checkBox}>
                        <input
                          type='checkbox'
                          value={product.prodCartNum}
                          checked={
                            product.prodCartCheck === "true" &&
                            product.prodStock > 0 &&
                            product.prodState === "0"
                          }
                          onClick={reverseCheck}
                          disabled={
                            product.prodStock <= 0 || product.prodState === "1"
                          }
                          // disabled
                        />
                      </div>
                    </td>
                    <td>
                      <div className={style.prodInfo}>
                        <Link to={"/prod/view/" + product.prodKeyNum}>
                          <img
                            src={imageUrls[product.prodKeyNum]}
                            alt='prodImage'
                          />
                        </Link>
                        <div>
                          &nbsp;&nbsp;{product.prodTitle}{" "}
                          {product.prodState == "1" ? (
                            <>
                              <p style={{ color: "red", marginTop: "15px" }}>
                                판매가 중지된 상품입니다.
                              </p>
                            </>
                          ) : (
                            ""
                          )}
                          {product.prodStock <= 0 ? (
                            <p style={{ color: "red", marginTop: "15px" }}>
                              품절입니다
                            </p>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className={style.indeQuantity}>
                        <button
                          value={product.prodCartNum}
                          onClick={() => decreaseQuantity(product)}
                          className={style.countBtn}
                        >
                          <ExpandMoreIcon />
                        </button>
                        <span
                          style={{
                            display: "inline-block",
                            width: "30px",
                            textAlign: "center",
                          }}
                        >
                          &nbsp;{product.prodCartCount}&nbsp;
                        </span>
                        <button
                          value={product.prodCartNum}
                          onClick={(e) => increaseQuantity(e, product)}
                          className={style.countBtn}
                        >
                          <ExpandLessIcon />
                        </button>
                        {!(
                          product.prodStock <= 0 || product.prodState === "1"
                        ) && product.prodStock - product.prodCartCount <= 4 ? (
                          <p
                            style={{
                              position: "absolute",
                              marginLeft: "60px",
                              marginTop: "20px",
                              color: "red",
                            }}
                          >
                            ⚠️재고 : {product.prodStock}개
                          </p>
                        ) : (
                          ""
                        )}
                      </div>
                    </td>
                    <td>
                      {Number(product.prodPrice).toLocaleString("kp-KR")}원
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <th colSpan='4'>
                    <span className={style.cartNoneTetx}>
                      <strong>장바구니에 담긴 상품이 없습니다.</strong>
                    </span>
                  </th>
                </tr>
              )}
            </tbody>
          </table>

          <div className={style.cartinfo}>
            <div className={style.leftinfo}>
              <p>상품가격</p>
              <p>배송비</p>
              <p>
                <strong>총 금액</strong>
              </p>
            </div>
            <div className={style.rightinfo}>
              <p>{totalPrice.toLocaleString("kp-KR")}원</p>
              <p>0원</p>
              <p>{totalPrice.toLocaleString("kp-KR")}원</p>
            </div>
          </div>

          <button type='button' class='btn btn-primary' onClick={gotoOrder}>
            {/* <Link
              to="/prod/cartorder"
              style={{ color: "white", textDecoration: "none" }}
            >
              구매하기
            </Link> */}
            구매하기
          </button>
        </div>
      </div>
    </>
  );
};

export default MyProdCart;
