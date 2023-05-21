import { useEffect, useState } from "react";
import check from "../../image/check.png";
import list from "../../image/list.png";
import style from "../../css/prodManagement.module.css";
import DatePicker from "react-datepicker";
import PageNavigation from "./page_nav";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { prodActions } from "../../reduxs/actions/prod_action";

import { useNavigate } from "react-router-dom";

const ProdProdManagement = () => {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(new Date());

  const [selectedState, setSelectedState] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSearchKey, setSelectedSearchKey] = useState("void");
  const [selectedSearchWord, setSelectedSearchWord] = useState("");

  const [params, setParams] = useState({
    state: selectedState,
    category: selectedCategory,
    searchKey: selectedSearchKey,
    searchWord: selectedSearchWord,
  });
  console.log(params);

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

  const getProdList = (currentPage, params) => {
    dispatch(prodActions.getProdList(currentPage, params, config));
    console.log("check", params);
  };

  //////////////////////////////////////

  // 체크된 아이템을 담을 배열
  const [checkItems, setCheckItems] = useState([]);

  // 체크박스 단일 선택
  const handleSingleCheck = (checked, id) => {
    console.log(checked, id);
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
      state: selectedState,
      category: selectedCategory,
      searchKey: selectedSearchKey,
      searchWord: selectedSearchWord,
    };
    console.log(params);

    if (selectedSearchKey === "void" && selectedSearchWord != "") {
      alert("검색옵션을 선택해주세요");
      return false;
    } else if (selectedSearchKey != "void" && selectedSearchWord === "") {
      alert("검색어를 입력해주세요");
    }

    getProdList(pv.currentPage, params);
  };

  ///////////////////////////

  useEffect(() => {
    getProdList(1, params);
  }, []);

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
                    <td>
                      <DatePicker
                        className={style.calendar}
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                      />
                    </td>
                    <td>
                      <DatePicker
                        className={style.calendar}
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                      />
                    </td>
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
                          취사용품
                        </option>
                        <option name='category' value='e'>
                          캠핑매트
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
                        <option name='searchKey' value='prodTitle'>
                          상품명
                        </option>
                        <option name='searchKey' value='prodKeyNum'>
                          상품코드
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
                  선택 : {checkItems.length}개 / 검색결과 :{" "}
                  {totalCount ? totalCount : 0} 개
                </p>
                <p className={style.controllBtn}>
                  <button type='button' className='btn btn-outline-primary'>
                    판매 상태 변경
                  </button>
                  <button type='button' className='btn btn-outline-primary'>
                    상품이미지 변경
                  </button>
                  <button type='button' className='btn btn-outline-primary'>
                    저장
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
                            checkItems.length === prodList.length ? true : false
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
                    </tr>
                  </thead>
                  <tbody>
                    {prodList &&
                      prodList.length !== 0 &&
                      prodList.map((prod) => {
                        return (
                          <tr>
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
                              <img
                                src={prod.prodImage}
                                width='100'
                                height='100'
                              />

                              <label
                                className={style.fileLabel}
                                for='imgChange'
                              >
                                변경
                              </label>
                              <input
                                type='file'
                                id='imgChange'
                                name='imgChange'
                                className={style.imgChange}
                              />
                            </td>
                            <td>{prod.prodTitle}</td>

                            <td>{prod.prodPrice}</td>
                            <td>{prod.prodCategory}</td>
                            <td>{prod.prodStock}</td>
                            <td>
                              {prod.prodState === "0" ? "판매중" : "판매중지"}
                            </td>
                            <td>{prod.prodReadCount}</td>
                            <td>{prod.prodRegdate}</td>
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
