import { useEffect, useState } from "react";
import check from "../../image/check.png";
import list from "../../image/list.png";
import style from "../../css/prodManagement.module.css";
import PageNavigation from "./page_nav_search";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { prodActions } from "../../reduxs/actions/prod_action";
import Modal from "./modal";
import { current } from "@reduxjs/toolkit";
import SearchDate from "../common/searchDatePicker";

// import Modal from 'react-bootstrap/Modal';
// import { useNavigate } from "react-router-dom";

const ProdProdManagement = () => {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState("a");
  const [endDate, setEndDate] = useState("a");

  const [selectedState, setSelectedState] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSearchKey, setSelectedSearchKey] = useState("void");
  const [selectedSearchWord, setSelectedSearchWord] = useState("");

  const [currentPage, setCurrentPage] = useState("");

  const [inputs, setInputs] = useState({
    prodKeyNum: "",
    prodTitle: "",
    prodPrice: "",
    prodCategory: "",
    prodStock: "",
    prodBrand: "",
    prodState: "",
    imgname: null,
  });

  const {
    prodKeyNum,
    prodTitle,
    prodPrice,
    prodCategory,
    prodStock,
    prodBrand,
    prodState,
    imgname,
  } = inputs;

  const [params, setParams] = useState({
    startDate: startDate,
    endDate: endDate,
    state: selectedState,
    category: selectedCategory,
    searchKey: selectedSearchKey,
    searchWord: selectedSearchWord,
  });

  const prodList = useSelector((state) => state.prod.prodList);
  const prodDetail = useSelector((state) => state.prod.prodDetail);

  const pv = useSelector((state) =>
    state.prod.pv ? state.prod.pv : { currentPage: 1 }
  );
  const totalCount = pv.totalCount;
  const config = {
    headers: {
      Authorization: localStorage.getItem("Authorization"),
    },
  };

  const resetInputs = () => {
    setInputs({
      prodKeyNum: "",
      prodTitle: "",
      prodPrice: "",
      prodCategory: "",
      prodStock: "",
      prodBrand: "",
      prodState: "",
      imgname: null,
    });
  };

  const getProdList = (currentPage, params) => {
    dispatch(prodActions.getProdList(currentPage, params, config));
    console.log("check", params);
  };

  const getProdDetail = (prodKeyNum) => {
    dispatch(prodActions.getProdDetail(prodKeyNum, config));
    console.log("prodKeyNum", prodKeyNum);
  };

  //////////////////////////////////////

  // 체크된 아이템을 담을 배열
  const [checkItems, setCheckItems] = useState([]);

  // 체크박스 단일 선택
  const handleSingleCheck = (checked, id) => {
    if (checked) {
      // 단일 선택 시 체크된 아이템을 배열에 추가
      setCheckItems((prev) => [...prev, id]);
      console.log(checkItems);
    } else {
      // 단일 선택 해제 시 체크된 아이템을 제외한 배열 (필터)
      setCheckItems(checkItems.filter((el) => el !== id));
    }
  };

  // 체크박스 전체 선택
  const handleAllCheck = (checked) => {
    console.log(checked);
    if (checked) {
      // 전체 선택 클릭 시 데이터의 모든 아이템(id)를 담은 배열로 checkItems 상태 업데이트
      const idArray = [];
      prodList.forEach((el) => idArray.push(el.prodKeyNum));

      setCheckItems(idArray);
    } else {
      // 전체 선택 해제 시 checkItems 를 빈 배열로 상태 업데이트
      setCheckItems([]);
    }
  };
  /////////////////////////

  //select state
  const handleChageSelectState = (e) => {
    setSelectedState(e.target.value);
    console.log("SelectState : " + e.target.value);
  };

  //select category
  const handleChageSelectCategory = (e) => {
    setSelectedCategory(e.target.value);
    console.log("SelectCategory : " + e.target.value);
  };

  //select searchkey
  const handleChageSelectSearchkey = (e) => {
    setSelectedSearchKey(e.target.value);
    console.log("SelectSearchkey : " + e.target.value);
  };

  //searchword
  const handleSearchWordChange = (e) => {
    setSelectedSearchWord(e.target.value);
  };

  // 검색버튼
  const searchbtn = async (e) => {
    e.preventDefault();

    const params = {
      startDate: startDate,
      endDate: endDate,
      state: selectedState,
      category: selectedCategory,
      searchKey: selectedSearchKey,
      searchWord: selectedSearchWord,
    };
    console.log(params);

    if (params.searchKey === "prodKeyNum") {
      if (/\D/.test(params.searchWord)) {
        alert("캠핑장코드 검색은 숫자만 입력가능합니다.");
        return false;
      }
    }

    if (selectedSearchKey === "void" && selectedSearchWord !== "") {
      alert("검색옵션을 선택해주세요");
      return false;
    } else if (selectedSearchKey !== "void" && selectedSearchWord === "") {
      alert("검색어를 입력해주세요");
      return false;
    }

    getProdList(pv.currentPage, params);
  };

  ///////////////////////////
  //모달창
  const [modalOpenInsert, setModalOpenInsert] = useState(false);
  const [modalOpenUpdate, setModalOpenUpdate] = useState(false);

  const [modalData, setModalData] = useState(null);
  // const [showIndex, setShowIndex] = useState(0);

  //추가버튼 모달 open
  const openModalInsert = () => {
    setModalOpenInsert(true); // 모달 창 열기
  };

  //추가모달 close
  const closeModalInsert = () => {
    resetInputs();
    setModalOpenInsert(false);
  };

  //수정버튼 모달 open
  const openModalUpdate = (prodKeyNum) => {
    console.log("keynum check", prodKeyNum);
    setCurrentPage(pv.currentPage);
    console.log(pv.currentPage);
    getProdDetail(prodKeyNum); // prodKeyNum 값을 이용해 해당 상품의 데이터를 가져오는 함수 호출
    setModalData(prodDetail);
    setInputs(prodDetail);
    setModalOpenUpdate(true); // 모달 창 열기
  };

  //수정모달 close
  const closeModalUpdate = () => {
    resetInputs();
    setModalData("");
    setModalOpenUpdate(false);
    getProdList(1, params);
  };

  const handleValueChange = (e) => {
    e.preventDefault();
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    setInputs((prev) => {
      return { ...prev, ...nextState };
    });
  };

  const handleSelectChange = (e) => {
    console.log(e.target.value);
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleImgChange = (e) => {
    e.preventDefault();
    setInputs({ ...inputs, [e.target.name]: e.target.files[0] });
  };

  //모달 내 추가버튼
  const onSubmit = async (e) => {
    e.preventDefault();

    if (prodCategory === "") {
      alert("카테고리를 선택해주세요");
      return false;
    } else if (prodState === "") {
      alert("판매상태를 선택해주세요");
      return false;
    } else if (imgname === "") {
      alert("상품사진을 넣어주세요");
      return false;
    }

    let korcategory = "";

    if (prodCategory === "a") {
      korcategory = "텐트";
    } else if (prodCategory === "b") {
      korcategory = "캠핑가구";
    } else if (prodCategory === "c") {
      korcategory = "랜턴";
    } else if (prodCategory === "d") {
      korcategory = "캠핑매트";
    } else if (prodCategory === "e") {
      korcategory = "취사용품";
    } else if (prodCategory === "f") {
      korcategory = "기타캠핑용품";
    }

    const formData = new FormData();
    formData.append("prodTitle", prodTitle);
    formData.append("prodPrice", prodPrice);
    formData.append("prodStock", prodStock);
    formData.append("prodState", prodState);
    formData.append("prodBrand", prodBrand);
    formData.append("prodCategory", korcategory);
    formData.append("currentPage", currentPage);
    formData.append("imgname", imgname);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: localStorage.getItem("Authorization"),
      },
    };
    await dispatch(prodActions.getProdInsert(formData, config));

    setInputs({
      prodKeyNum: "",
      prodTitle: "",
      prodPrice: "",
      prodCategory: "",
      prodStock: "",
      prodState: "",
      imgname: null,
    });

    setModalOpenInsert(false);

    getProdList(1, params);
  };

  // 모달 내 수정 버튼
  const handleUpdate = async (e) => {
    e.preventDefault();

    let korcategory = "";

    if (["a", "b", "c", "d", "e", "f"].includes(prodCategory)) {
      if (prodCategory === "a") {
        korcategory = "텐트";
      } else if (prodCategory === "b") {
        korcategory = "캠핑가구";
      } else if (prodCategory === "c") {
        korcategory = "랜턴";
      } else if (prodCategory === "d") {
        korcategory = "캠핑매트";
      } else if (prodCategory === "e") {
        korcategory = "취사용품";
      } else if (prodCategory === "f") {
        korcategory = "기타캠핑용품";
      }
    } else {
      korcategory = prodCategory;
    }

    const formData = new FormData();
    formData.append("prodKeyNum", prodKeyNum);
    formData.append("prodTitle", prodTitle);
    formData.append("prodPrice", prodPrice);
    formData.append("prodStock", prodStock);
    formData.append("prodState", prodState);
    formData.append("prodCategory", korcategory);
    formData.append("currentPage", currentPage);

    console.log("imgname", imgname);
    if (imgname != null) formData.append("imgname", imgname);

    console.log(prodKeyNum);
    console.log(prodTitle);
    console.log(prodPrice);
    console.log(prodStock);
    console.log(prodState);
    console.log(prodCategory);
    console.log(currentPage);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: localStorage.getItem("Authorization"),
      },
    };

    await dispatch(prodActions.getProdUpdate(formData, config));

    const params = {
      state: selectedState,
      category: selectedCategory,
      searchKey: selectedSearchKey,
      searchWord: selectedSearchWord,
    };
    console.log(params);

    resetInputs();
    setModalOpenUpdate(false);

    getProdList(currentPage, params);
    getProdDetail(prodKeyNum);
  };

  //삭제버튼
  const handleDelete = async (e) => {
    e.preventDefault();

    const deletePromises = checkItems.map((item) =>
      dispatch(
        prodActions.getProdDelete(item, {
          headers: { Authorization: localStorage.getItem("Authorization") },
        })
      )
    );

    await Promise.all(deletePromises);

    const params = {
      state: selectedState,
      category: selectedCategory,
      searchKey: selectedSearchKey,
      searchWord: selectedSearchWord,
    };

    getProdList(pv.currentPage, params);
  };

  function isHttpUrl(url) {
    return url.startsWith("https://");
  }
  //////////////////////////

  useEffect(() => {
    getProdList(1, params);
    console.log(params);
  }, []);

  useEffect(() => {
    if (modalOpenUpdate && prodDetail) {
      setInputs(prodDetail);
      setModalData(prodDetail);
    }
  }, [prodDetail]);

  return (
    <div>
      <div className={style.managmentCommon}>
        <div className={style.commonTop}>
          <div className={style.commonRight}>
            <p className={style.topbar}>상품관리</p>
          </div>
        </div>
        <div className={style.commonUnder}>
          <div className={style.managmentContent}>
            {/* 관리자페이지갈아끼워야하는부분 시작 */}
            <div className={style.managmentContentTop}>
              <div>
                <p className={style.membetText}>
                  <img src={check} />
                  상품을 검색하세요
                </p>
              </div>
              <div className={style.membersearch}>
                <table>
                  <tr>
                    <td>상품 등록기간</td>
                    <SearchDate setStart={setStartDate} setEnd={setEndDate} />
                  </tr>
                  <tr>
                    <td>판매 상태</td>
                    <td colSpan='2'>
                      <select
                        className={style.memberStatus}
                        onChange={handleChageSelectState}
                        value={selectedState}
                      >
                        <option name='state' value='all'>
                          전체
                        </option>
                        <option name='state' value='on'>
                          판매중
                        </option>
                        <option name='state' value='off'>
                          판매중지
                        </option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>카테고리</td>
                    <td colSpan='2'>
                      <select
                        className={style.memberStatus}
                        onChange={handleChageSelectCategory}
                        value={selectedCategory}
                      >
                        <option name='category' value='all'>
                          전체
                        </option>
                        <option name='category' value='a'>
                          텐트
                        </option>
                        <option name='category' value='b'>
                          캠핑가구
                        </option>
                        <option name='category' value='c'>
                          랜턴
                        </option>
                        <option name='category' value='d'>
                          캠핑매트
                        </option>
                        <option name='category' value='e'>
                          취사용품
                        </option>
                        <option name='category' value='f'>
                          기타캠핑용품
                        </option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>검색어</td>
                    <td>
                      <select
                        className={style.searchCategory}
                        onChange={handleChageSelectSearchkey}
                        value={selectedSearchKey}
                      >
                        <option name='searchKey' value='void'>
                          선택
                        </option>
                        <option name='searchKey' value='prodKeyNum'>
                          상품코드
                        </option>
                        <option name='searchKey' value='prodTitle'>
                          상품명
                        </option>
                      </select>
                    </td>
                    <td>
                      <input
                        type='text'
                        className={style.searchWord}
                        placeholder='검색어를 입력하세요'
                        onChange={handleSearchWordChange}
                      />
                      <button
                        type='button'
                        className='btn btn-primary'
                        onClick={searchbtn}
                      >
                        검색
                      </button>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
            <div className={style.managmentContentUnder}>
              <div className={style.memListTop}>
                <p className={style.membetText}>
                  <img src={list} />
                  상품 목록
                </p>
                <p className={style.memberSubText}>
                  선택 : {checkItems.length}개 / 검색결과 :
                  {totalCount ? totalCount : 0} 개
                </p>
                <p className={style.controllBtn}>
                  <button
                    type='button'
                    className='btn btn-outline-primary'
                    onClick={openModalInsert}
                  >
                    상품 추가
                  </button>
                  <Modal
                    open={modalOpenInsert}
                    close={closeModalInsert}
                    header='상품 추가하기'
                  >
                    <>
                      <div className='style.insert'>
                        <form name='frm' onSubmit={onSubmit}>
                          <table
                            className='style.insert_table'
                            id='style.insert_table'
                          >
                            <tr>
                              <th>상품카테고리</th>
                              <td>
                                <select
                                  name='prodCategory'
                                  onChange={handleSelectChange}
                                >
                                  <option name='prodCategory' value='void'>
                                    선택
                                  </option>
                                  <option name='prodCategory' value='a'>
                                    텐트
                                  </option>
                                  <option name='prodCategory' value='b'>
                                    캠핑가구
                                  </option>
                                  <option name='prodCategory' value='c'>
                                    랜턴
                                  </option>
                                  <option name='prodCategory' value='d'>
                                    캠핑매트
                                  </option>
                                  <option name='prodCategory' value='e'>
                                    취사용품
                                  </option>
                                  <option name='prodCategory' value='f'>
                                    기타캠핑용품
                                  </option>
                                </select>
                              </td>
                            </tr>
                            <tr>
                              <th>상품이름</th>
                              <td>
                                <input
                                  type='text'
                                  name='prodTitle'
                                  onChange={handleValueChange}
                                />
                              </td>
                            </tr>
                            <tr>
                              <th>상품브랜드</th>
                              <td>
                                <input
                                  type='text'
                                  name='prodBrand'
                                  onChange={handleValueChange}
                                />
                              </td>
                            </tr>
                            <tr>
                              <th>상품가격</th>
                              <td>
                                <input
                                  type='number'
                                  name='prodPrice'
                                  onChange={handleValueChange}
                                />
                              </td>
                            </tr>
                            <tr>
                              <th>상품재고</th>
                              <td>
                                <input
                                  type='number'
                                  name='prodStock'
                                  onChange={handleValueChange}
                                />
                              </td>
                            </tr>
                            <tr>
                              <th>판매상태</th>
                              <td>
                                <select
                                  name='prodState'
                                  onChange={handleSelectChange}
                                >
                                  <option value='void'>선택</option>
                                  <option value='0'>판매중</option>
                                  <option value='1'>판매중지</option>
                                </select>
                              </td>
                            </tr>

                            <tr>
                              <th rowSpan='2'>상품사진</th>
                              <td>
                                {/* <img
                                  src={
                                    modalData.prodImage &&
                                    modalData.prodImage.startsWith("https://")
                                      ? modalData.prodImage
                                      : "/images/" + modalData.prodImage
                                  }
                                  width='200'
                                  height='200'
                                />
                                <br />
                                <span>
                                  {modalData.prodImage
                                    ? modalData.prodImage.substring(
                                        modalData.prodImage.indexOf("_") + 1
                                      )
                                    : null}
                                </span> */}
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <input
                                  type='file'
                                  name='imgname'
                                  onChange={handleImgChange}
                                />
                                <span>
                                  파일이름
                                  {/* {board.upload
                                ? board.upload.substring(
                                    board.upload.indexOf('_') + 1
                                  )
                                : null} */}
                                </span>
                              </td>
                            </tr>
                          </table>
                          <div>
                            <input type='submit' id='update' value='추가' />
                            <input
                              type='button'
                              onClick={closeModalInsert}
                              value='취소'
                            />
                          </div>
                        </form>
                      </div>
                    </>
                  </Modal>
                  <button
                    type='button'
                    className='btn btn-outline-primary'
                    onClick={handleDelete}
                  >
                    상품 삭제
                  </button>
                </p>
              </div>
              <div className={style.memberList}>
                <table>
                  <thead>
                    <tr>
                      <th>
                        <input
                          type='checkbox'
                          name='select-all'
                          onChange={(e) => handleAllCheck(e.target.checked)}
                          //데이터 개수와 체크된 아이템의 개수가 다를 경우 선택 해제 (하나라도 해제 시 선택 해제)
                          checked={
                            prodList && checkItems.length === prodList.length
                              ? true
                              : false
                          }
                        />
                      </th>
                      <th>번호</th>
                      <th>상품이미지</th>
                      <th>상품명</th>
                      <th>가격</th>
                      <th>카테고리</th>
                      <th>수량(재고)</th>
                      <th>판매상태</th>
                      <th>상품조회수</th>
                      <th>등록일</th>
                      <th>수정</th>
                    </tr>
                  </thead>
                  <tbody>
                    {prodList &&
                      prodList.map((prod) => {
                        return (
                          <tr key={prod.prodKeyNum}>
                            <td>
                              <input
                                type='checkbox'
                                name={`select-${prod.prodKeyNum}`}
                                onChange={(e) =>
                                  handleSingleCheck(
                                    e.target.checked,
                                    prod.prodKeyNum
                                  )
                                }
                                // 체크된 아이템 배열에 해당 아이템이 있을 경우 선택 활성화, 아닐 시 해제
                                checked={
                                  checkItems.includes(prod.prodKeyNum)
                                    ? true
                                    : false
                                }
                              />
                            </td>
                            <td>{prod.prodKeyNum}</td>
                            <td>
                              {prod.prodImage && (
                                <img
                                  src={
                                    isHttpUrl(prod.prodImage)
                                      ? prod.prodImage
                                      : "/images/" + prod.prodImage
                                  }
                                  width='100'
                                  height='100'
                                />
                              )}
                            </td>
                            <td>{prod.prodTitle}</td>

                            <td>
                              {parseInt(prod.prodPrice).toLocaleString()}원
                            </td>
                            <td>{prod.prodCategory}</td>
                            <td
                              style={{
                                color: prod.prodStock === "0" ? "red" : "black",
                              }}
                            >
                              {prod.prodStock === "0" ? "품절" : prod.prodStock}
                            </td>
                            <td
                              style={{
                                color: prod.prodState === "0" ? "black" : "red",
                              }}
                            >
                              {prod.prodState === "0" ? "판매중" : "판매중지"}
                            </td>
                            <td>{prod.prodReadCount}</td>
                            <td>{prod.prodRegdate}</td>
                            <td>
                              <button
                                onClick={() => openModalUpdate(prod.prodKeyNum)}
                              >
                                수정
                              </button>
                              {/* 여기에 값전달하기위해서 ( input ) 값 넣고   */}
                              <Modal
                                open={modalOpenUpdate}
                                close={closeModalUpdate}
                                header='상품 상세내용 수정'
                              >
                                {modalData && (
                                  <>
                                    <div className='style.detail'>
                                      <form name='frm'>
                                        <table
                                          className='style.detail_table'
                                          id='style.detail_table'
                                          key={modalData.prodKeyNum}
                                        >
                                          <tr>
                                            <th>상품카테고리</th>
                                            <td>
                                              <select
                                                name='prodCategory'
                                                onChange={handleSelectChange}
                                                defaultValue={
                                                  modalData.prodCategory ===
                                                  "텐트"
                                                    ? "a"
                                                    : modalData.prodCategory ===
                                                      "캠핑가구"
                                                    ? "b"
                                                    : modalData.prodCategory ===
                                                      "랜턴"
                                                    ? "c"
                                                    : modalData.prodCategory ===
                                                      "캠핑매트"
                                                    ? "d"
                                                    : modalData.prodCategory ===
                                                      "취사용품"
                                                    ? "e"
                                                    : modalData.prodCategory ===
                                                      "기타캠핑용품"
                                                    ? "f"
                                                    : ""
                                                }
                                              >
                                                <option
                                                  name='prodCategory'
                                                  value='a'
                                                >
                                                  텐트
                                                </option>
                                                <option
                                                  name='prodCategory'
                                                  value='b'
                                                >
                                                  캠핑가구
                                                </option>
                                                <option
                                                  name='prodCategory'
                                                  value='c'
                                                >
                                                  랜턴
                                                </option>
                                                <option
                                                  name='prodCategory'
                                                  value='d'
                                                >
                                                  캠핑매트
                                                </option>
                                                <option
                                                  name='prodCategory'
                                                  value='e'
                                                >
                                                  취사용품
                                                </option>
                                                <option
                                                  name='prodCategory'
                                                  value='f'
                                                >
                                                  기타캠핑용품
                                                </option>
                                              </select>
                                            </td>
                                          </tr>
                                          <tr>
                                            <th>상품이름</th>
                                            <td>
                                              <input
                                                type='text'
                                                name='prodTitle'
                                                defaultValue={
                                                  modalData.prodTitle
                                                }
                                                onChange={handleValueChange}
                                              />
                                            </td>
                                          </tr>
                                          <tr>
                                            <th>상품가격</th>
                                            <td>
                                              <input
                                                type='number'
                                                name='prodPrice'
                                                onChange={handleValueChange}
                                                defaultValue={
                                                  modalData.prodPrice
                                                }
                                              />
                                            </td>
                                          </tr>
                                          <tr>
                                            <th>상품재고</th>
                                            <td>
                                              <input
                                                type='number'
                                                name='prodStock'
                                                onChange={handleValueChange}
                                                defaultValue={
                                                  modalData.prodStock
                                                }
                                              />
                                            </td>
                                          </tr>
                                          <tr>
                                            <th>판매상태</th>
                                            <td>
                                              <select
                                                name='prodState'
                                                defaultValue={
                                                  modalData.prodState
                                                }
                                                onChange={handleSelectChange}
                                              >
                                                <option value='0'>
                                                  판매중
                                                </option>
                                                <option value='1'>
                                                  판매중지
                                                </option>
                                              </select>
                                            </td>
                                          </tr>

                                          <tr>
                                            <th rowSpan='2'>상품사진</th>
                                            <td>
                                              <img
                                                src={
                                                  modalData.prodImage &&
                                                  modalData.prodImage.startsWith(
                                                    "https://"
                                                  )
                                                    ? modalData.prodImage
                                                    : "/images/" +
                                                      modalData.prodImage
                                                }
                                                width='200'
                                                height='200'
                                              />
                                              <br />
                                              <span>
                                                {modalData.prodImage
                                                  ? modalData.prodImage.substring(
                                                      modalData.prodImage.indexOf(
                                                        "_"
                                                      ) + 1
                                                    )
                                                  : null}
                                              </span>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>
                                              <input
                                                type='file'
                                                name='imgname'
                                                onChange={handleImgChange}
                                              />
                                              <span>
                                                파일이름
                                                {/* {board.upload
                                                  ? board.upload.substring(
                                                      board.upload.indexOf('_') + 1
                                                    )
                                                  : null} */}
                                              </span>
                                            </td>
                                          </tr>

                                          <tr>
                                            <th>등록일</th>
                                            <td>{modalData.prodRegdate}</td>
                                          </tr>
                                        </table>
                                        <div>
                                          <input
                                            type='hidden'
                                            name='prodKeyNum'
                                            value={modalData.prodKeyNum}
                                          />

                                          <input
                                            type='button'
                                            id='update'
                                            onClick={handleUpdate}
                                            value='수정'
                                          />
                                          <input
                                            type='button'
                                            onClick={closeModalUpdate}
                                            value='취소'
                                          />
                                        </div>
                                      </form>
                                    </div>
                                  </>
                                )}
                              </Modal>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
              <div className='d-flex justify-content-center'>
                {totalCount && getProdList ? (
                  <>
                    <PageNavigation
                      getProdList={getProdList}
                      selectedState={selectedState}
                      selectedCategory={selectedCategory}
                      selectedSearchKey={selectedSearchKey}
                      selectedSearchWord={selectedSearchWord}
                    />
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
            {/* 관리자페이지갈아끼워야하는부분 끝 */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProdProdManagement;

//이미지변경
{
  /* <label
className={style.fileLabel}
for='imgname'
// onClick={handleUpdateImg}
>
변경
</label>
<input
type='file'
id='imgname'
name='imgname'
className={style.imgChange}
onChange={handleImgChange}
/> */
}
