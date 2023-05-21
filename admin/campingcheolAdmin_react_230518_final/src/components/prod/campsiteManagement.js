import { useEffect, useState } from "react";
import check from "../../image/check.png";
import list from "../../image/list.png";
import style from "../../css/prodManagement.module.css";

import PageNavigationSite from "./page_nav_sitesearch";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { prodActions } from "../../reduxs/actions/prod_action";

import { useNavigate } from "react-router-dom";

const ProdSiteManagement = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch();

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSearchKey, setSelectedSearchKey] = useState("void");
  const [selectedSearchWord, setSelectedSearchWord] = useState("");

  const prodList = useSelector((state) => state.prod.campList);
  const pv = useSelector((state) =>
    state.prod.campPv ? state.prod.campPv : { currentPage: 1 }
  );
  const totalCount = pv.totalCount;

  const [params, setParams] = useState({
    category: selectedCategory,
    searchKey: selectedSearchKey,
    searchWord: selectedSearchWord,
  });

  const config = {
    headers: {
      Authorization: localStorage.getItem("Authorization"),
    },
  };

  const getSiteList = (currentPage, params) => {
    dispatch(prodActions.getSiteList(currentPage, params, config));
  };

  const CampSiteDelete = (campKeyNum) => {
    dispatch(prodActions.CampSiteDelete(campKeyNum, config));
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
      category: selectedCategory,
      searchKey: selectedSearchKey,
      searchWord: selectedSearchWord,
    };
    console.log(params);

    if (params.searchKey === "campKeyNum") {
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

    getSiteList(pv.currentPage, params);
  };

  /////////////////////////

  const handleDelete = async (e) => {
    e.preventDefault();

    // 모든 삭제가 완료될 때까지 기다립니다.
    await checkItems.map((item) => CampSiteDelete(item));

    window.location.replace(`/admin/manage/site`);
  };

  useEffect(() => {
    getSiteList(1, params);
  }, []);

  return (
    <div>
      <div className={style.managmentCommon}>
        <div className={style.commonTop}>
          <div className={style.commonRight}>
            <p className={style.topbar}>캠핑장 관리</p>
          </div>
        </div>
        <div className={style.commonUnder}>
          <div className={style.managmentContent}>
            {/* 관리자페이지갈아끼워야하는부분 시작 */}
            <div className={style.managmentContentTop}>
              <div>
                <p className={style.membetText}>
                  <img src={check} />
                  캠핑장을 검색하세요
                </p>
              </div>
              <div className={style.membersearch}>
                <table>
                  <tr>
                    <td>지역</td>
                    <td colSpan='2'>
                      <select
                        className={style.memberStatus}
                        onChange={handleChageSelectCategory}
                        value={selectedCategory}
                      >
                        <option value='all'>전체</option>
                        <option value='a'>인천</option>
                        <option value='b'>서울</option>
                        <option value='c'>경기</option>
                        <option value='d'>경상</option>
                        <option value='e'>충청</option>
                        <option value='f'>강원</option>
                        <option value='g'>제주</option>
                        <option value='h'>전라</option>
                        <option value='i'>부산/울산</option>
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
                        <option name='searchKey' value='campKeyNum'>
                          캠핑장코드
                        </option>
                        <option name='searchKey' value='campName'>
                          캠핑장명
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
                  캠핑장 목록
                </p>
                <p className={style.memberSubText}>
                  선택 : {checkItems.length}개 / 검색결과 :{" "}
                  {pv.totalCount ? pv.totalCount : 0} 개
                </p>
                <p className={style.controllBtn}>
                  <button
                    type='button'
                    className='btn btn-outline-primary'
                    onClick={handleDelete}
                  >
                    삭제
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
                          checked={checkItems.length === 5 ? true : false}
                        />
                      </th>
                      <th>번호</th>
                      <th>캠핑장명</th>
                      <th>주소</th>
                      <th>전화번호</th>
                    </tr>
                  </thead>
                  <tbody>
                    {prodList && prodList.length !== 0 ? (
                      prodList.map((prod) => {
                        return (
                          <tr key={prod.campKeyNum}>
                            <td>
                              <input
                                type='checkbox'
                                name={`select-${prod.campKeyNum}`}
                                onChange={(e) =>
                                  handleSingleCheck(
                                    e.target.checked,
                                    prod.campKeyNum
                                  )
                                }
                                // 체크된 아이템 배열에 해당 아이템이 있을 경우 선택 활성화, 아닐 시 해제
                                checked={
                                  checkItems.includes(prod.campKeyNum)
                                    ? true
                                    : false
                                }
                              />
                            </td>
                            <td>{prod.campKeyNum}</td>
                            <td>{prod.campName}</td>
                            <td>{prod.campAddr}</td>
                            <td>{prod.campTel}</td>
                          </tr>
                        );
                      })
                    ) : (
                      <>
                        <tr>
                          <td colSpan='5'>검색결과가 없습니다.</td>
                        </tr>
                      </>
                    )}
                  </tbody>
                </table>
              </div>
              <div className='d-flex justify-content-center'>
                {totalCount && getSiteList ? (
                  <>
                    <PageNavigationSite
                      getSiteList={getSiteList}
                      selectedCategory={selectedCategory}
                      selectedSearchKey={selectedSearchKey}
                      selectedSearchWord={selectedSearchWord}
                    />
                  </>
                ) : (
                  <>{/* <PageNavigation getList={SearchProdList} /> */}</>
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

export default ProdSiteManagement;
