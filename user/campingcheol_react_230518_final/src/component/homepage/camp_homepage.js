import Calendar from "react-calendar";
import { useState } from "react";
import "react-calendar/dist/Calendar.css";
import campsite from "../../image/campsite.jpg";
import product from "../../image/camping.png";
import style from "../../css/mainPage.module.css";
import leftArrow from "../../image/leftArrow.png";
import rightArrow from "../../image/rightArrow.png";
import { useEffect } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { prodActions } from "../../reduxs/actions/prodAction";
import { campActions } from "../../reduxs/actions/camp_action";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

// 추가 import
import mainBanner from "../../image/mainBanner4.png";
import { makeStyles } from "@material-ui/core/styles";

import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import NativeSelect from "@material-ui/core/NativeSelect";
import nextBtn from "../../image/nextbtn.png";

//추가 component
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const CampHomePage = () => {
  // 추가
  const classes = useStyles();
  const [state, setState] = useState({
    age: "",
    name: "hai",
  });

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };
  ////////////

  const [value, onChange] = useState(new Date());
  const [slideIndex, setSlideIndex] = useState(0);
  const navigator = useNavigate();

  //추천 캠핑 사이트 목록 가져오기
  const campSiteList = useSelector((state) => state.campSite.campSiteList);
  const prodList = useSelector((state) => state.campSite.prodList);
  //마지막 예약 캠핑장 있는지 체크 (1없음, 2있음)
  const recommendCheck = useSelector((state) => state.campSite.recommendCheck);

  const getRecommandList = () => {
    dispatch(campActions.getRecommandList(localStorage.getItem("userKeynum")));
  };

  // 캠핑장 이미지관련
  const imgs = useRef();
  const [imgCount, setImgCount] = useState(0);

  //캠핑용품 이미지관련
  const stuffimg = useRef();
  const [stuffimgCount, seTtuffimgCount] = useState(0);

  // 태그 관련
  const tagList = useSelector((state) => state.prod.tagList);
  const dispatch = useDispatch();

  const getTagList = () => {
    dispatch(prodActions.getTagList());
  };

  //태그 검색
  const [tags, setTags] = useState([]);

  //캠핑장 이전버튼
  const handlePrevClick = () => {
    const firstImg = imgs.current.firstElementChild.cloneNode(true);

    imgs.current.addEventListener(
      "transitionend",
      () => {
        imgs.current.removeChild(imgs.current.firstElementChild);
        imgs.current.style.transition = "none";
        imgs.current.style.marginLeft = "0px";
      },
      { once: true }
    );

    setSlideIndex(slideIndex - 1 < 0 ? imgCount - 1 : slideIndex - 1);
    imgs.current.style.transition = "margin-left 0.3s ease-in-out";
    imgs.current.style.marginLeft = "-500px";
    imgs.current.appendChild(firstImg);
  };

  // 캠핑장다음 버튼
  const handleNextClick = () => {
    const lastImg = imgs.current.lastElementChild.cloneNode(true);
    imgs.current.insertBefore(lastImg, imgs.current.firstElementChild);

    setSlideIndex(slideIndex + 1 > imgCount - 1 ? 0 : slideIndex + 1);
    imgs.current.style.transition = "none";
    imgs.current.style.marginLeft = "-500px";

    setTimeout(() => {
      imgs.current.removeChild(imgs.current.lastElementChild);
      imgs.current.style.transition = "margin-left 0.3s ease-in-out";
      imgs.current.style.marginLeft = "0px";
    }, 0);
  };

  // 캠핑용품 이전버튼
  const stuffPrevClick = () => {
    const firstImg = stuffimg.current.firstElementChild.cloneNode(true);

    stuffimg.current.addEventListener(
      "transitionend",
      () => {
        stuffimg.current.removeChild(stuffimg.current.firstElementChild);
        stuffimg.current.style.transition = "none";
        stuffimg.current.style.marginLeft = "0px";
      },
      { once: true }
    );

    setSlideIndex(slideIndex - 1 < 0 ? stuffimgCount - 1 : slideIndex - 1);
    stuffimg.current.style.transition = "margin-left 0.2s ease-in-out";
    stuffimg.current.style.marginLeft = "-300px";
    stuffimg.current.appendChild(firstImg);
  };

  // 캠핑용품 이후버튼
  const stuffNextClick = () => {
    const lastImg = stuffimg.current.lastElementChild.cloneNode(true);
    stuffimg.current.insertBefore(lastImg, stuffimg.current.firstElementChild);

    setSlideIndex(slideIndex + 1 > stuffimgCount - 1 ? 0 : slideIndex + 1);
    stuffimg.current.style.transition = "none";
    stuffimg.current.style.marginLeft = "-300px";

    setTimeout(() => {
      stuffimg.current.removeChild(stuffimg.current.lastElementChild);
      stuffimg.current.style.transition = "margin-left 0.2s ease-in-out";
      stuffimg.current.style.marginLeft = "0px";
    }, 0);
  };

  // 태그 자바스크립트
  // 태그 누르면 배열에 들어가게, 태그 다시 누르면 배열에서 삭제되게
  const toggleTag = (e, tagKeynum) => {
    let tagsumList = [...tags];

    if (tagsumList.includes(tagKeynum)) {
      tagsumList = tagsumList.filter((item) => item !== tagKeynum);
    } else {
      tagsumList.push(tagKeynum);
    }

    setTags(tagsumList);
    console.log(tagsumList);

    e.target.style.backgroundColor = tagsumList.includes(tagKeynum)
      ? "rgb(252 187 21)"
      : "white";
  };
  const getTag = (currentPage, params) => {
    dispatch(campActions.getTagSearch(currentPage, tags));
    console.log(tags);
    navigator(`/camp/list/${currentPage}/${tags}`, { state: [...tags] });
  };
  //태그 검색버튼
  const searchbtn = async (e) => {
    e.preventDefault();
    dispatch(campActions.getTagSearch(currentPage, tags));

    console.log(tags);
    navigator(`/camp/list/${currentPage}/${tags}`, { state: [...tags] });
  };

  useEffect(() => {
    setImgCount(Array.from(imgs.current.children).length);
    seTtuffimgCount(Array.from(stuffimg.current.children).length);
    getTagList();
    console.log("tagList", tagList);
  }, [imgs]);

  //코드 추가(--김성령)

  //검색어처리
  const [searchWord, setSearchWord] = useState(null);
  const [campDo, setCampDo] = useState(null);

  const params = {
    campDo: campDo,
    searchWord: searchWord,
  };

  const currentPage = 1;

  // 캠핑장 검색
  const getCampList = (currentPage, params) => {
    dispatch(campActions.getCampList(currentPage, params));

    console.log(currentPage, params);

    //검색조건 설정
    if (searchWord != null && campDo != null) {
      navigator(
        `/camp/list/${currentPage}?searchWord=${params.searchWord}&campDo=${params.campDo}`
      );
    } else if (searchWord) {
      navigator(
        `/camp/list/${currentPage}?searchWord=${params.searchWord}&campDo=`
      );
    } else if (campDo) {
      navigator(
        `/camp/list/${currentPage}?searchWord=&campDo=${params.campDo}`
      );
    } else {
      navigator(`/camp/list/1`);
    }
  };

  //검색창에 입력한 검색어나 캠핑장 지역 정보를 상태로 저장하기 위한 함수
  //검색어를 입력할 때마다 searchChange 함수가 호출됨
  //e.target.value 를 통해 입력된 검색어를 setSearchWord 함수를 통해 searchWord상태에 저장
  //(e)는 이벤트 객체를 나타내는 파라미터(DOM 요소에서 발생한 이벤트 정보 담고 있음)
  const searchChange = (e) => {
    setSearchWord(e.target.value);
  };

  const searchChangetwo = (e) => {
    const selectedValue = e.target.value;
    setCampDo(selectedValue);
  };

  useEffect(() => {
    getRecommandList();
  }, []);

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

  return (
    <>
      <div className={style.recomandarrow}>
        <img
          style={{ cursor: "pointer", transform: "scaleX(-1)" }}
          className={style.arrowImg}
          src={nextBtn}
          onClick={handleNextClick}
        />
        <div className={style.nothing}></div>
        <img
          src={nextBtn}
          onClick={handlePrevClick}
          style={{ cursor: "pointer" }}
        />
      </div>

      <div className={style.newStuffarrow}>
        <img
          style={{ cursor: "pointer", transform: "scaleX(-1)" }}
          className={style.arrowImg}
          src={nextBtn}
          onClick={stuffNextClick}
        />
        <div className={style.nothing}></div>
        <img
          style={{ cursor: "pointer" }}
          src={nextBtn}
          onClick={stuffPrevClick}
        />
      </div>
      <div className={style.mainPage}>
        <div>
          <img src={mainBanner} />
        </div>
        <div className={style.searchcontent}>
          <select onChange={searchChangetwo}>
            <option value=''>지역을 선택하세요</option>
            <option value='서울시'>서울</option>
            <option value='경기도'>경기</option>
            <option value='인천시'>인천</option>
            <option value='강원도'>강원</option>
            <option value='충청도'>충청</option>
            <option value='경상도'>경상</option>
            <option value='부산시'>부산/울산</option>
            <option value='전라도'>전라</option>
            <option value='제주도'>제주</option>
          </select>
          {/* <input
            type="text"
            placeholder="지역을 선택하세요"
            value={campDo}
            onChange={searchChangetwo}
          /> */}

          {/* <FormControl className={classes.formControl}>
            <NativeSelect
              className={classes.selectEmpty}
              value={state.age}
              name="age"
              onChange={handleChange}
              inputProps={{ "aria-label": "age" }}
            >
              <option value="" disabled>
                Placeholder
              </option>
              <option value={10}>Ten</option>
              <option value={20}>Twenty</option>
              <option value={30}>Thirty</option>
            </NativeSelect>
          </FormControl> */}
          <input
            type='text'
            placeholder='키워드를 입력하세요'
            value={searchWord}
            onChange={searchChange}
          />

          <button
            class={style.mainPageSearch}
            onClick={() => getCampList(currentPage, params)}
          >
            검색하기
          </button>
        </div>
      </div>
      <div className={style.second_main}>
        <div>
          {localStorage.getItem("userNick") && recommendCheck === 2 ? (
            <>
              <p className={style.recommandText}>
                {localStorage.getItem("userNick")} 님의 추천 캠핑장
              </p>
              <p style={{ color: "gray" }}>
                마지막으로 이용한 캠핑장과 유사한 캠핑장 입니다
              </p>
            </>
          ) : (
            <>
              <p className={style.recommandText}> 인기 캠핑장</p>
              <p style={{ color: "gray" }}>
                이용자들의 평점이 높은 캠핑장입니다.
              </p>
            </>
          )}

          <hr />
        </div>
        <div ref={imgs} className={style.campsiteRecommand}>
          {campSiteList &&
            campSiteList.map((campSite) => {
              return (
                <div className={style.campSite}>
                  <Link
                    to={"/camp/view/" + campSite.campKeyNum}
                    style={{ textDecoration: "none" }}
                  >
                    <div>
                      <img src={campSite.campImg} />
                      <p>{campSite.campName}</p>
                      <p>{campSite.campAddr}</p>
                      <p>
                        {campSite.campType &&
                          campSite.campType.split(",").map((element) => {
                            return <span>{element}</span>;
                          })}
                        {campSite.campEnv &&
                          campSite.campEnv.split(",").map((element) => {
                            return <span>{element}</span>;
                          })}
                      </p>
                    </div>
                  </Link>
                </div>
              );
            })}
        </div>

        <div>
          <p className={style.recommandText}>이달의 신상 캠핑용품</p>
          <hr />
        </div>
        <div className={style.newStuffs} ref={stuffimg}>
          {prodList &&
            prodList.map((prod) => {
              return (
                <Link
                  to={"/prod/view/" + prod.prodKeyNum}
                  style={{ textDecoration: "none" }}
                >
                  <div className={style.newstuff}>
                    <div>
                      <img src={imageUrls[prod.prodKeyNum]} />
                      <p>
                        <Box
                          component='fieldset'
                          mb={3}
                          borderColor='transparent'
                        >
                          <span className={style.mainreviewCount}>
                            ({prod.reviewCount})
                          </span>
                          <Rating
                            name='read-only'
                            value={prod.avgRating}
                            readOnly
                            style={{ float: "right" }}
                          />
                        </Box>
                      </p>

                      <p>{prod.prodTitle}</p>
                      <p>{Number(prod.prodPrice).toLocaleString("kp-KR")}원</p>
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
        <div className={style.campTag}>
          <p className={style.recommandText}>캠핑장 태그 검색</p>
          <hr />
          <form>
            <div className={style.tags}>
              {tagList &&
                tagList.map((tag, index) => {
                  return (
                    <>
                      <input
                        type='checkbox'
                        name='tag'
                        id={tag.tagKeynum}
                        key={tag.tagKeynum}
                      />
                      <label
                        key={index}
                        for={tag.tagKeynum}
                        onClick={(e) => toggleTag(e, tag.tagKeynum)}
                        style={{ backgroundColor: "white" }}
                      >
                        #{tag.tagName}
                      </label>
                    </>
                  );
                })}
            </div>
            <div className={style.btns}>
              <button class={style.tagSubmitBtn} onClick={searchbtn}>
                검색하기
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CampHomePage;
