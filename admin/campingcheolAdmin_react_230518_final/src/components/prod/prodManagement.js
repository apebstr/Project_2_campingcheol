import { useEffect, useState } from "react";
import check from "../../image/check.png";
import list from "../../image/list.png";
import style from "../../css/prodManagement.module.css";
import PageNavigation from "./page_nav_search";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { prodActions } from "../../reduxs/actions/prod_action";
import Modal from "./modal";
import ModalProdInsert from "./modal_prodInsert";
import ModalProdUpdate from "./modal_prodUpdate";
import { current } from "@reduxjs/toolkit";
import SearchDate from "../common/searchDatePicker";
import { prodReducers } from "../../reduxs/reducers/prod_reducer";

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
  // const [modalOpenUpdate, setModalOpenUpdate] = useState(false);
  const modalOpenUpdate = useSelector((state) => state.prod.modalOpenUpdate);

  // const [modalData, setModalData] = useState(null);
  // const [showIndex, setShowIndex] = useState(0);

  //추가버튼 모달 open
  const openModalInsert = () => {
    setModalOpenInsert(true); // 모달 창 열기
  };

  //추가모달 close
  const closeModalInsert = () => {
    getProdList(pv.currentPage, params);
    resetInputs();
    setModalOpenInsert(false);
  };

  const openModalUpdate = (id) => {
    dispatch(prodReducers.updateModalOpen({ id, isOpen: true }));
  };

  const closeModalUpdate = (id) => {
    dispatch(prodReducers.updateModalOpen({ id, isOpen: false }));
    getProdList(1, params);
  };
  //수정버튼 모달 open
  // const openModalUpdate = (prodKeyNum) => {
  //   setModalOpenUpdate(true); // 모달 창 열기
  //   setNum(prodKeyNum);
  // };

  //수정모달 close
  // const closeModalUpdate = () => {
  //   setNum("");
  //   // resetInputs();
  //   // setModalData("");
  //   setModalOpenUpdate(false);
  //   getProdList(1, params);
  // };

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

  return (
    <div>
      <div className={style.managmentCommon}>
        <div className={style.commonTop}>
          <div className={style.commonRight}>
            <p className={style.topbar}>캠핑용품 관리</p>
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
                  <ModalProdInsert
                    open={modalOpenInsert}
                    close={closeModalInsert}
                    header='상품 추가하기'
                  />
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
                    {prodList && prodList.length != 0 ? (
                      prodList.map((prod, index) => {
                        return (
                          <tr key={index}>
                            <td style={{ width: "50px" }}>
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
                            <td style={{ width: "80px" }}>{prod.prodKeyNum}</td>
                            <td style={{ width: "90px" }}>
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

                            <td style={{ width: "90px" }}>
                              {parseInt(prod.prodPrice).toLocaleString()}원
                            </td>
                            <td style={{ width: "90px" }}>
                              {prod.prodCategory}
                            </td>
                            <td
                              style={{
                                color: prod.prodStock === "0" ? "red" : "black",
                                width: "90px",
                              }}
                            >
                              {prod.prodStock === "0" ? "품절" : prod.prodStock}
                            </td>
                            <td
                              style={{
                                color: prod.prodState === "0" ? "black" : "red",
                                width: "90px",
                              }}
                            >
                              {prod.prodState === "0" ? "판매중" : "판매중지"}
                            </td>
                            <td style={{ width: "90px" }}>
                              {prod.prodReadCount}
                            </td>
                            <td style={{ width: "120px" }}>
                              {new Date(prod.prodRegdate).toLocaleDateString()}
                            </td>
                            <td style={{ width: "90px" }}>
                              <button
                                onClick={() => openModalUpdate(prod.prodKeyNum)}
                              >
                                수정
                              </button>
                              {modalOpenUpdate[prod.prodKeyNum] && (
                                <ModalProdUpdate
                                  open={modalOpenUpdate[prod.prodKeyNum]}
                                  close={() =>
                                    closeModalUpdate(prod.prodKeyNum)
                                  }
                                  num={prod.prodKeyNum}
                                  header='상품 상세내용 수정'
                                />
                              )}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <>
                        <tr>
                          <td colSpan='11'>검색결과가 없습니다.</td>
                        </tr>
                      </>
                    )}
                  </tbody>
                </table>
              </div>
              <div className='d-flex justify-content-center'>
                {totalCount && getProdList ? (
                  <>
                    <PageNavigation
                      getProdList={getProdList}
                      startDate={startDate}
                      endDate={endDate}
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
