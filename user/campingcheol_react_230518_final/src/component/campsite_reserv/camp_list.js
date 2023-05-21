import "../../css/camp_list.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { campActions } from "../../reduxs/actions/camp_action";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import PageNavigation from "./page_nav";
import PageNavigationTag from "./page_nav_tag";
import Carousel from "react-bootstrap/Carousel";

import toTop from "../../image/toTop.png";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import EjectIcon from "@material-ui/icons/Eject";
import ArrowDropUpSharpIcon from "@material-ui/icons/ArrowDropUpSharp";

import banner1 from "../../image/poster/3.jpg";
import banner2 from "../../image/poster/6.jpg";
import banner3 from "../../image/poster/9.jpg";

const CampList = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigator = useNavigate();

  //스크롤 TOP 시작
  const [scrollY, setScrollY] = useState(0);
  const [BtnStatus, setBtnStatus] = useState(false); //버튼 상태

  const handleFollow = () => {
    setScrollY(window.pageYOffset);
    if (scrollY > 100) {
      //100이상이면 버튼 보이게
      setBtnStatus(true);
    } else {
      //100이하면 버튼 사라지게
      setBtnStatus(false);
    }
  };

  //클릭하면 스크롤이 위로 올라가는 함수
  const handleTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setScrollY(0); //scrollY의 값을 초기화
    setBtnStatus(false); //BtnStatus의 값을 false로 바꿈 => 버튼 숨김
  };

  useEffect(() => {
    const watch = () => {
      window.addEventListener("scroll", handleFollow);
    };
    watch();
    return () => {
      window.addEventListener("scroll", handleFollow);
    };
  });
  //스크롤 TOP 끝

  //검색어처리
  const [search, setSearch] = useState("");
  const [campDo, setCampDo] = useState("");
  const tags = location.state;
  const [tagDatas, setTagDatas] = useState(tags);

  console.log("tagstags " + tagDatas);
  const campList = useSelector((state) => state.campSite.campSiteList);

  const pv = useSelector((state) =>
    state.campSite.pv ? state.campSite.pv : { currentPage: 1 }
  );

  const { currentPage } = useParams();

  const getCampList = (currentPage, params) => {
    const tag2 = tagDatas;
    if (tag2 != null) {
      getTagSearch(currentPage, tag2);
      return;
    }

    dispatch(campActions.getCampList(currentPage, params));
    if (params.searchWord != null && params.campDo != null) {
      navigator(
        `/camp/list/${currentPage}?searchWord=${params.searchWord}&campDo=${params.campDo}`
      );
    } else if (params.searchWord) {
      navigator(
        `/camp/list/${currentPage}?searchWord=${params.searchWord}&campDo=`
      );
    } else if (params.campDo) {
      navigator(
        `/camp/list/${currentPage}?searchWord=&campDo=${params.campDo}`
      );
    } else {
      navigator(`/camp/list/${currentPage}`);
    }
  };

  const searchChange = (e) => {
    setSearch(e.target.value);
    setCampDo("");
  };

  //태그 검색
  const getTagSearch = (currentPage, tags) => {
    dispatch(campActions.getTagSearch(currentPage, tags));
    navigator(`/camp/list/${currentPage}/${tags}`);
    return;
  };

  // 검색버튼
  const searchbtn = async (e) => {
    e.preventDefault();

    const params = {
      campDo: campDo,
      searchWord: search,
    };

    getCampList(currentPage, params);
    if (params.searchWord != null && params.campDo != null) {
      window.location.replace(
        `/camp/list/${currentPage}?searchWord=${params.searchWord}&campDo=${params.campDo}`
      );
    } else if (params.searchWord) {
      window.location.replace(
        `/camp/list/${currentPage}?searchWord=${params.searchWord}&campDo=`
      );
    } else if (params.campDo) {
      window.location.replace(
        `/camp/list/${currentPage}?searchWord=&campDo=${params.campDo}`
      );
    } else {
      window.location.replace(`/camp/list/${currentPage}`);
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const word = searchParams.get("searchWord");
    const word2 = searchParams.get("campDo");

    // const tags2 = tags;

    // console.log("tags2 klkkjkkljlkj"+ tags2)
    // if(tags2){
    //   // console.log("들어오니")

    //   // (async () => {
    //   //  await getTagSearch(currentPage, tags2);

    //   // })();
    //   // setTagDatas(tags2);
    // }else{

    // async/await 구문으로 비동기 처리
    (async () => {
      await getCampList(currentPage, { searchWord: word, campDo: word2 });
    })();

    setSearch(word);
    setCampDo(word2);
  }, []);

  return (
    <>
      <div className='camp-list-container'>
        {/* 캠핑장 배너 */}
        <div className='camp-ban'>
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

        {/* 캠핑장 카테고리 */}
        <div className='camp-category'>
          <table>
            <tbody>
              <tr>
                <th>
                  <button
                    onClick={() => {
                      window.location.replace(
                        `/camp/list/1?searchWord=&campDo=인천시`
                      );
                    }}
                  >
                    인천
                  </button>
                </th>
                <th>
                  <button
                    onClick={() => {
                      window.location.replace(
                        `/camp/list/1?searchWord=&campDo=경기도`
                      );
                    }}
                  >
                    경기
                  </button>
                </th>
                <th>
                  <button
                    onClick={() => {
                      window.location.replace(
                        `/camp/list/1?searchWord=&campDo=서울시`
                      );
                    }}
                  >
                    서울
                  </button>
                </th>
              </tr>
              <tr>
                <th>
                  <button
                    onClick={() => {
                      window.location.replace(
                        `/camp/list/1?searchWord=&campDo=경상도`
                      );
                    }}
                  >
                    경상
                  </button>
                </th>
                <th>
                  <button
                    onClick={() => {
                      window.location.replace(
                        `/camp/list/1?searchWord=&campDo=충청도`
                      );
                    }}
                  >
                    충청
                  </button>
                </th>
                <th>
                  <button
                    onClick={() => {
                      window.location.replace(
                        `/camp/list/1?searchWord=&campDo=강원도`
                      );
                    }}
                  >
                    강원
                  </button>
                </th>
              </tr>
              <tr>
                <th>
                  <button
                    onClick={() => {
                      window.location.replace(
                        `/camp/list/1?searchWord=&campDo=제주도`
                      );
                    }}
                  >
                    제주
                  </button>
                </th>
                <th>
                  <button
                    onClick={() => {
                      window.location.replace(
                        `/camp/list/1?searchWord=&campDo=전라도`
                      );
                    }}
                  >
                    전라
                  </button>
                </th>
                <th>
                  <button
                    onClick={() => {
                      window.location.replace(
                        `/camp/list/1?searchWord=&campDo=부산시`
                      );
                    }}
                  >
                    부산/울산
                  </button>
                </th>
              </tr>
            </tbody>
          </table>
        </div>
        {/* 캠핑장 검색 */}
        <div className='camplist-search'>
          <div className='input-group mb-3'>
            <input
              type='text'
              className='form-control'
              placeholder='캠핑장을 검색해보세요'
              value={search}
              onChange={searchChange}
            />

            <button
              className='btn btn-outline-secondary'
              type='button'
              id='button-addon2'
              onClick={searchbtn}
            >
              검색
            </button>
          </div>
          <div className='campList_NoResult'>
            {!pv.totalCount ? <p>검색결과가 없습니다.</p> : ""}
          </div>
        </div>
        {/* 캠핑장 리스트 */}

        {/* TOP 스크롤 버튼 */}
        <div className='scrollTop'>
          <button
            className={BtnStatus ? "topBtn active" : "topBtn"} //버튼 노출 여부
            onClick={handleTop} //버튼 클릭시 함수 호출
          >
            <ArrowDropUpSharpIcon style={{ fontSize: 40, color: "white" }} />
          </button>
        </div>

        <div className='camp-list'>
          <ul>
            {campList &&
              campList.map((campSite) => {
                return (
                  <li>
                    <div className='camp-list-con'>
                      <div>
                        <Link to={`/camp/view/${campSite.campKeyNum}`}>
                          <img src={campSite.campImg} />
                        </Link>

                        <div className='camp_cont'>
                          <Link to={`/camp/view/${campSite.campKeyNum}`}>
                            <h2 className='camp_tt'>{campSite.campName}</h2>
                          </Link>
                          <div className='camp_stt'>
                            {campSite.campLineIntro}
                          </div>
                          <div className='camp_addr'>{campSite.campAddr}</div>
                          <p className='campList_rating'>
                            {campSite.avgRating
                              ? `평점: ${campSite.avgRating} / 5`
                              : "평점: 0.0"}
                          </p>
                        </div>

                        <p className='camp_price'>1박 50,000원 ~ </p>
                      </div>
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>

        <div className='view-paging'>
          {tags == null ? (
            <PageNavigation
              getCampList={getCampList}
              search={search}
              campDo={campDo}
              pv={pv}
            />
          ) : (
            <PageNavigationTag getTagSearch={getTagSearch} tags={tagDatas} />
          )}
        </div>
      </div>
    </>
  );
};

export default CampList;
