import style from "../../css/prodlist.module.css";
import prodlistLogo from "../../image/campingBanner.jpg";
import prodbanner_sec from "../../image/banner2.jpg";
import prodbanner_third from "../../image/banner3.jpg";
import prodProduct from "../../image/camping.png";

import barbeque from "../../image/icon/barbeque.png";
import campChair from "../../image/icon/campingChair.png";
import campLantern from "../../image/icon/campingLantern.png";
import campingMat from "../../image/icon/campingMat.png";
import campingSite from "../../image/icon/campingSite.png";
import campingTent from "../../image/icon/campingTent.png";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { prodActions } from "../../reduxs/actions/prodAction";
import { useEffect, useState } from "react";
import PageNavigation from "./prodPaging";
import Carousel from "react-bootstrap/Carousel";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import banner1 from "../../image/poster/4.jpg";
import banner2 from "../../image/poster/7.jpg";
import banner3 from "../../image/poster/2.jpg";

const ProdSearch = ({ cartCal }) => {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const [leftStock, setLeftStock] = useState(0);
  const prodList = useSelector((state) => state.prod.prodList);

  const pv = useSelector((state) =>
    state.prod.pv ? state.prod.pv : { currentPage: 1 }
  );

  const pageNumbers = [];
  for (let i = pv.startPage; i <= pv.endPage; i++) {
    pageNumbers.push(i);
  }

  const { currentPage, search } = useParams();

  const getProdList = (currentPage, search) => {
    dispatch(prodActions.getProdSearch(currentPage, search));
    navigator(`/prod/list/search/${currentPage}/${search}`);
  };

  //검색어처리
  const [searchWord, setSearchWord] = useState("");

  const searchChange = (e) => {
    setSearchWord(e.target.value);
  };

  //검색함수
  const searchResult = () => {
    if (searchWord === "") {
      setSearchShow(true);
      return;
    }
    navigator(`/prod/list/search/1/${searchWord}`);
  };
  //장바구니 팝업
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  // 장바구니 재료 부족 팝업
  const [leftShow, setLeftShow] = useState(false);

  const leftHandleClose = () => setLeftShow(false);

  //검색관련 모달
  const [searchShow, setSearchShow] = useState(false);
  const searchHandleClose = () => setSearchShow(false);

  const goToCart = () => {
    navigator("/my/prod/cart");
  };

  // 장바구니 처리
  const insertToCart = async (e, prod) => {
    e.preventDefault();
    if (!localStorage.getItem("userKeynum")) {
      setLoginShow(true);
      return;
    }
    if (e.target.elements.cartCount.value > prod.prodStock) {
      setLeftStock(prod.prodStock);
      setLeftShow(true);
      return;
    }

    const formData = new FormData();
    formData.append("prodKeyNum", prod.prodKeyNum);
    // 아래거로 써줘야합니다 ~~
    // formData.append("userKeynum", localStorage.userKeynum);
    formData.append("userKeynum", localStorage.getItem("userKeynum"));
    formData.append("prodCartCount", e.target.elements.cartCount.value);

    console.log(e.target.elements.cartCount.value);

    await dispatch(prodActions.insertCart(formData));

    setShow(true);
  };

  useEffect(() => {
    // console.log(useParams());
    getProdList(currentPage, search);
  }, [currentPage, search]);
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
    if (prodList) {
      prodList.forEach((prod) => {
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
  }, [prodList]);

  const [loginShow, setLoginShow] = useState(false);
  const loginHandleClose = () => setLoginShow(false);

  return (
    <>
      <div>
        <Modal
          show={loginShow}
          onHide={loginHandleClose}
          backdropClassName={style.cartAlert}
          style={{ marginTop: "400px" }}
        >
          <Modal.Header closeButton>
            {/* <Modal.Title>Modal heading</Modal.Title> */}
          </Modal.Header>
          <Modal.Body style={{ margin: "auto" }}>
            먼저 로그인을 해주세요
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={loginHandleClose}>
              닫기
            </Button>
          </Modal.Footer>
        </Modal>
        {/* 재고관련 모달 */}
        {/* 검색 관련 모달  */}
        <Modal
          show={searchShow}
          onHide={searchHandleClose}
          backdropClassName={style.cartAlert}
          style={{ marginTop: "400px" }}
        >
          <Modal.Header closeButton>
            {/* <Modal.Title>Modal heading</Modal.Title> */}
          </Modal.Header>
          <Modal.Body style={{ margin: "auto" }}>
            검색어를 입력해주세요
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={searchHandleClose}>
              닫기
            </Button>
          </Modal.Footer>
        </Modal>
        {/* 재고관련 모달 */}
        <Modal
          show={leftShow}
          onHide={leftHandleClose}
          backdropClassName={style.cartAlert}
          style={{ marginTop: "400px" }}
        >
          <Modal.Header closeButton>
            {/* <Modal.Title>Modal heading</Modal.Title> */}
          </Modal.Header>
          <Modal.Body style={{ margin: "auto" }}>
            현재 상품의 재고는 {leftStock}개 입니다. 수량을 조절해주세요.
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={leftHandleClose}>
              닫기
            </Button>
          </Modal.Footer>
        </Modal>
        {/* 장바구니 추가 완료 모달 */}
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
            장바구니 추가 완료 !
          </Modal.Body>
          <Modal.Footer>
            <Button variant='warning' onClick={goToCart}>
              장바구니 가기
            </Button>
            <Button variant='secondary' onClick={handleClose}>
              닫기
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <div className={style.prodList}>
        <div className={style.proBanner}>
          <Carousel fade>
            <Carousel.Item>
              <img className='d-block w-100' src={banner1} alt='First slide' />
            </Carousel.Item>
            <Carousel.Item>
              <img className='d-block w-100' src={banner2} alt='Second slide' />
            </Carousel.Item>
            <Carousel.Item>
              <img className='d-block w-100' src={banner3} alt='Third slide' />
            </Carousel.Item>
          </Carousel>
        </div>
        <div className={style.search}>
          <form className={style.searchFrm} action='#' method='get'>
            <div className={style.searchArea}>
              <div className='input-group mb-3'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='검색하세요'
                  aria-label="Recipient's username"
                  aria-describedby='button-addon2'
                  value={searchWord}
                  onChange={searchChange}
                />
                {/* <a href={`/prod/list/search/1/${search}`}> */}
                <button
                  class='btn btn-outline-secondary'
                  type='button'
                  id='button-addon2'
                  onClick={searchResult}
                >
                  검색
                </button>
                {/* </a> */}
              </div>
            </div>
          </form>
        </div>
        <div className={style.category}>
          <table>
            <tr>
              <th>
                <a href={`/prod/list/category/1/텐트`}>
                  <button>
                    <img src={campingTent} />
                    <br />
                    텐트
                  </button>
                </a>
              </th>
              <th>
                <a href={`/prod/list/category/1/캠핑가구`}>
                  <button>
                    <img src={campChair} />
                    <br />
                    캠핑가구
                  </button>
                </a>
              </th>
              <th>
                <a href={`/prod/list/category/1/랜턴`}>
                  <button>
                    <img src={campLantern} /> <br />
                    랜턴
                  </button>
                </a>
              </th>
            </tr>
            <tr>
              <th>
                <a href={`/prod/list/category/1/캠핑매트`}>
                  <button>
                    <img src={campingMat} />
                    <br />
                    캠핑매트
                  </button>
                </a>
              </th>
              <th>
                <a href={`/prod/list/category/1/취사용품`}>
                  <button>
                    <img src={barbeque} />
                    <br /> 취사용품
                  </button>
                </a>
              </th>
              <th>
                <a href={`/prod/list/category/1/기타캠핑용품`}>
                  <button>
                    <img src={campingSite} />
                    <br />
                    기타캠핑용품
                  </button>
                </a>
              </th>
            </tr>
          </table>
        </div>
        {pv.totalCount ? (
          <div className={style.categoryListCount}>
            검색어 "{search}" : {pv.totalCount}개
          </div>
        ) : (
          <div className={style.categoryListCount}>
            "{search}" 검색결과가 없습니다.
          </div>
        )}

        <div class={style.products}>
          {prodList &&
            prodList.map((prod) => {
              return (
                <>
                  <div key={prod.prodKeyNum} className={style.product}>
                    {prod.prodStock == 0 ? (
                      <div className={style.stocknone}>
                        <p>품절</p>
                      </div>
                    ) : null}
                    <div className={style.productPic}>
                      <img src={imageUrls[prod.prodKeyNum]} />
                    </div>
                    <div className={style.productExpain}>
                      <p className={style.prodName}>
                        <Link to={`/prod/view/${prod.prodKeyNum}`}>
                          <a>{prod.prodTitle}</a>
                        </Link>
                      </p>
                      <p className={style.proPrice}>{prod.prodPrice} 원</p>
                      <form onSubmit={(e) => insertToCart(e, prod)}>
                        <p className={style.prodcart}>
                          <button
                            type='submit'
                            class='btn btn-success'
                            onClick={() =>
                              cartCal(localStorage.getItem("userKeynum"))
                            }
                          >
                            장바구니담기
                          </button>
                          <select
                            class='form-select'
                            name='cartCount'
                            defaultValue='1'
                          >
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                            <option value='4'>4</option>
                            <option value='5'>5</option>
                          </select>
                        </p>
                      </form>
                    </div>
                  </div>
                </>
              );
            })}
        </div>
        {pv.totalCount ? (
          <div className={style.paging}>
            {pv ? <PageNavigation getProdList={getProdList} /> : ""}
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default ProdSearch;
